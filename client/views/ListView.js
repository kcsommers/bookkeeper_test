import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import {setFormData, handleDelete} from '../formFunctions'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import {connect} from 'react-redux'
import {
  deleteList,
  deleteBook, 
  addNote, 
  addQuote} from '../actions/listsActions'

import Modal from 'react-native-modal'
import Book from '../components/Book'
import AddForm from '../components/AddForm'
import ModalOption from '../components/ModalOption'

class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      modalData: null,
      modalContent: ''
    }
    this.updateStore = this.updateStore.bind(this)
    this.triggerAddForm = this.triggerAddForm.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.handleTrigger = this.handleTrigger.bind(this)
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal})
  }

  updateStore(newData, formData) {
    const type = formData.type
    const listId = this.props.navigation.getParam('listId')

    switch(type) {
      case 'quote':
        this.props.addQuote(newData.quote, newData.quote.bookId, listId)
        break
      case 'note':
        this.props.addNote(newData.note, newData.note.bookId, listId)
        break
      case 'club-start':
        this.props.navigation.navigate('Club', {club: newData.club})
        break
      case 'delete-book':
        this.props.deleteBook(formData.id, listId)
        break
      case 'delete-list':
        this.props.deleteList(formData.id)
        this.props.navigation.navigate('Profile')
        break
    }
    this.toggleModal()
  }

  triggerAddForm(data) {
    let formData = setFormData(data.type, {book: data.book, user: this.props.user})
    formData.listId = data.listId
    formData.type = data.type
    this.setState({
      showModal: true,
      modalData: formData,
      modalContent: data.type
    })
  }

  handleTrigger(data) {
    if(data.type === 'options') {
      this.setState({
        modalData: data,
        modalContent: 'options', 
        showModal: true
      })
    }
    else {
      this.triggerAddForm(data)
    }
  }

  getListFromStore(listId) {
    const listIndex = this.props.lists.findIndex((list) => list.id === listId)
    return this.props.lists[listIndex]
  }

  render() {
    const listId = this.props.navigation.getParam('listId')
    const list = this.getListFromStore(listId)
    let modalData = this.state.modalData
    const books = list.books.map((book, i) => (
      <View key={i} style={styles.bookRow}>
        <Book 
          book={book} 
          trigger={(data) => {this.handleTrigger(data)}}
          key={i} />
      </View>)
    )
    const modalContent = (this.state.modalContent === 'options') ?
    <View style={styles.modalWrapper}>
      <ModalOption 
        text={(modalData.book.current) ? "Finished!" : "Set as Current Read"}
        onPress={() => {}}
      />

      <ModalOption 
        text="Add Note"
        onPress={() => {
          modalData.type = 'note'
          this.triggerAddForm(modalData)
        }}
      />

      <ModalOption 
        text="Add Quote"
        onPress={() => {
          modalData.type = 'quote'
          this.triggerAddForm(modalData)
        }}
      />

      <ModalOption 
        text={"Search Clubs"}
        onPress={() => {
          modalData.type = 'club-search'
          this.triggerAddForm(modalData)
        }} 
      />

      <ModalOption 
        text={"Start a Club"}
        onPress={() => {
          modalData.type = 'club-start'
          this.triggerAddForm(modalData)
        }} 
      />

      <ModalOption 
        text={"Remove from List"}
        onPress={() => {
          handleDelete({
            listId,
            type: 'delete-book',
            endpoint: 'books', 
            id: modalData.book.id,
          }, this.updateStore)
        }}
      />
    </View>
    :
    <View style={styles.modalWrapper}>
      <AddForm 
        onSubmit={(data, formData) => {this.updateStore(data, formData)}}
        data={this.state.modalData} />
    </View>

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.listHeader}>
          <View style={styles.iconsWrapper}>
            <TouchableOpacity 
              style={styles.listOption} 
              onPress={() => {

              }}>
              <MaterialIcon name="edit" size={25} color="#1b9ce2" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.listOption} 
              onPress={() => {
                handleDelete({
                  type: 'delete-list',
                  id: listId,
                  endpoint: 'lists'
                }, this.updateStore)
              }}>
              <MaterialIcon name="delete" size={25} color="#1b9ce2" />
            </TouchableOpacity>
          </View>

          <Text style={styles.listName} >{list.name}</Text>
        </View>

        {books}
        <Modal
          isVisible={this.state.showModal}
          onBackdropPress={this.toggleModal}>

          {modalContent}
        </Modal>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  },  
  listHeader: {
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15
  },
  iconsWrapper: {
    position: 'absolute',
    flexDirection: 'row',
    right: 0,
    zIndex: 100
  },
  listOption: {
    padding: 5
  },
  listName: {
    fontFamily: 'Merriweather',
    fontSize: 22,
    textAlign: 'center'
  },
  bookRow: {
    paddingTop: 15,
    paddingBottom: 15
  },
  modalWrapper: {
    backgroundColor: 'red'
  }
})

const mapStateToProps = (state) => ({
  lists: state.lists,
  user: state.authUser
})

const mapActionsToProps = {deleteList, deleteBook, addNote, addQuote}

export default connect(mapStateToProps, mapActionsToProps)(ListView)