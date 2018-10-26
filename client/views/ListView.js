import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import {handleDelete} from '../formFunctions'

import {connect} from 'react-redux'
import {
  deleteList,
  deleteBook, 
  updateBook,
  addNote, 
  addQuote} from '../actions/listsActions'

import Modal from 'react-native-modal'
import ModalContent from '../components/ModalContent'
import Book from '../components/Book'
import IconBtn from '../components/IconBtn'

class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      modalData: null
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleModalTrigger = this.handleModalTrigger.bind(this)
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal, modalData: null})
  }

  handleModalTrigger(modalData) {
    this.setState({modalData, showModal: true})
  }

  getListFromStore(listId) {
    const listIndex = this.props.lists.findIndex((list) => list.id === listId)
    return this.props.lists[listIndex]
  }

  render() {
    const listId = this.props.navigation.getParam('listId')
    const list = this.getListFromStore(listId)
    if(list) {
      const books = list.books.map((book, i) => (
        <View key={i} style={styles.bookRow}>
          <Book 
            book={book} 
            modalTrigger={(data) => this.handleModalTrigger(data)}
            key={i} />
        </View>)
      )
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.listHeader}>
            <View style={styles.listOptionsWrapper}>
              <IconBtn 
                name="options"
                backgroundColor='#fff'
                iconColor="#444"
                iconSize={20}
                circleSize={{width: 40, height: 40, borderRadius: 20}}
                onPress={() => {
                  this.handleModalTrigger({type: 'list-options', list})
                }}
              />
            </View>

            <Text style={styles.listName} >{list.name}</Text>
          </View>

          {books}
          
          <Modal
            isVisible={this.state.showModal}
            onBackdropPress={this.toggleModal}>

            <ModalContent 
              data={this.state.modalData}
              toggleModal={() => {this.toggleModal()}}
            />
          </Modal>
        </ScrollView>
      )
    }
    else {
      return null
    }
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
  listOptionsWrapper: {
    position: 'absolute',
    left: 0,
    zIndex: 100
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
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15
  }
})

const mapStateToProps = (state) => ({
  lists: state.lists,
  user: state.authUser
})

const mapActionsToProps = {deleteList, deleteBook, updateBook, addNote, addQuote}

export default connect(mapStateToProps, mapActionsToProps)(ListView)