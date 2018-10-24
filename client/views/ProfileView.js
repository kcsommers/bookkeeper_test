import React from 'react'
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  Text,
  TouchableOpacity
 } from 'react-native'
 import axios from 'axios'
 import {connect} from 'react-redux'
 import {addList, addNote, addQuote} from '../actions/listsActions'
 import {setFormData} from '../formFunctions'
 import Icon from 'react-native-vector-icons/FontAwesome'

 import Modal from 'react-native-modal'
 import SearchBar from '../components/SearchBar'
 import List from '../components/List'
 import Book from '../components/Book'
 import AddForm from '../components/AddForm'

class ProfileView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listName: '',
      showModal: false,
      modalData: null
    }
    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.updateStore = this.updateStore.bind(this)
    this.triggerForm = this.triggerForm.bind(this)
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal})
  }

  handleChangeText(text) {
    this.setState({listName: text})
  }

  updateStore(newData, formData) {
    if(!newData.err) {
      const type = formData.type
      let listId
      console.log(type)
      switch(type) {
        case 'list':
          this.props.addList(newData.list)
          break
        case 'quote':
          listId = formData.listId
          this.props.addQuote(newData.quote, newData.quote.bookId, listId)
          break
        case 'note':
        listId = formData.listId
        this.props.addNote(newData.note, newData.note.bookId, listId)
          break
        case 'club-start':
          this.props.navigation.navigate('Club', {club: newData.club})
          break
      }
    }
    this.setState({modalData: null, showModal: false})
  }

  triggerForm(data) {
    let formData = setFormData(data.type, {book: data.book, user: this.props.user})
    formData.listId = data.listId
    formData.type = data.type
    this.setState({
      showModal: true,
      modalData: formData
    })
  }

  async handleSubmit() {
    const url = 'http://localhost:3000/lists'
    const list = {
      name: this.state.listName,
      userId: this.props.user.id
    }
    const results = await axios.post(url, list)
    if(!results.data.err) {
      this.props.addList(results.data.list)
    }
  }

  render() {
    const lists = this.props.lists.map((list, i) => <List list={list} key={i} />)
    const currentReads = []
    this.props.lists.forEach((list) => {
      list.books.forEach((book) => { if(book.current) {currentReads.push(book)} })
    })

    const currentsDisplay = (currentReads.length) ? 
    currentReads.map((book, i) => (
      <ScrollView key={i}>
        <Book 
          book={book} 
          key={i} 
          trigger={(data) => this.triggerForm(data)} />
      </ScrollView>
    ))
    :
    <Text>You are not currently reading anything!</Text>

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <SearchBar 
          type="full"
          endPoint="books/v1/volumes" />

        <View style={styles.profileWrapper}>
          <View style={styles.currentReadsContainer}>
            <Text style={[styles.header]}>Current Reads</Text>
            {currentsDisplay}
          </View>

          <View style={styles.listsContainer}>
            <Text style={[styles.header]}>My Lists</Text>
            {lists}
            <View style={styles.addListWrapper}>
              <TouchableOpacity style={styles.addListBtn} onPress={() => {
                this.triggerForm({type: 'list', book: null})
              }}>
                <Icon name="plus" size={25} color="#1b9ce2" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.clubsContainer}>
            <Text style={[styles.header]}>My Clubs</Text>
          </View>

          <Modal
            isVisible={this.state.showModal}
            onBackdropPress={this.toggleModal}>

            <AddForm 
              onSubmit={(data, formData) => {this.updateStore(data, formData)}}
              data={this.state.modalData} />
          </Modal>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  profileWrapper: {
  },
  currentReadsContainer: {
    padding: 15
  },
  header: {
    fontFamily: 'Merriweather',
    fontSize: 22,
    marginBottom: 10
  },
  listsContainer: {
    padding: 15
  },
  addListWrapper: {
    paddingTop: 15,
    paddingBottom: 15
  },
  addListBtn: {
    borderWidth: 1,
    borderColor: '#444',
    borderStyle: 'dashed',
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  clubsContainer: {
    padding: 15
  }
})

const mapStateToProps = state => ({
  user: state.authUser, 
  lists: state.lists,
  clubs: state.clubs
})
const mapActionsToProps = {addList, addNote, addQuote} 
export default connect(mapStateToProps, mapActionsToProps)(ProfileView)