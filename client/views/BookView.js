import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text
} from 'react-native'
import Modal from 'react-native-modal'

import {connect} from 'react-redux'
import {addQuote, addNote, deleteBook} from '../actions/listsActions'

import Banner from '../components/Banner'
import Button1 from '../components/Button1'
import DeleteBtn from '../components/DeleteBtn'
import Quote from '../components/Quote'
import Note from '../components/Note'
import AddForm from '../components/AddForm'

import missingBookCover from '../assets/images/missingBookCover.jpg'
import bg7 from '../assets/images/page_backgrounds/bg7.jpg'

import {setFormData} from '../formFunctions.js'

class BookView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      modalFormData: null,
      formType: '',
      book: null
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.setFormData = this.setFormData.bind(this)
    this.updateoStore = this.updateStore.bind(this)
    this.getBookFromStore = this.getBookFromStore.bind(this)
  }

  toggleModal() {
    if(this.state.showModal) {
      this.setState({showModal: false, formType: ''})
    }
    else {
      this.setState({showModal: true})
    }
  }

  updateStore(data) {
    console.log('UPDATE STORE DATA', data)
    const bookId = this.props.navigation.getParam('bookId')
    const listId = this.props.navigation.getParam('listId')  
    if(!data.err) {
      if(this.state.formType === 'quote') {
        this.props.addQuote(data.quote, bookId, listId)
        this.toggleModal()
      }
      else if(this.state.formType === 'note') {
        this.props.addNote(data.note, bookId, listId)
        this.toggleModal()
      }
      else {
        this.props.deleteBook(bookId, listId)
        this.props.navigation.navigate('Profile')
      }
    }
  }

  setFormData(type, book) {
    const data = {
      user: this.props.user,
      book: book
    }
    const formData = setFormData(type, data)
    this.setState({modalFormData: formData, showModal: true, formType: type})
  }

  getBookFromStore(bookId, listId) {
    const listIndex = this.props.lists.findIndex((list) => list.id === listId)
    const bookIndex = this.props.lists[listIndex].books.findIndex((book) => book.id === bookId)
    
    return this.props.lists[listIndex].books[bookIndex]
  }

  render() {
    let book = this.getBookFromStore(this.props.navigation.getParam('bookId'), this.props.navigation.getParam('listId'))
    let title = (book) ? book.title : ''
    let authors = (book) ? book.authors : ''
    let description = (book) ? book.description : ''
    let imgSrc = (book && book.imgUrl) ? {uri: book.imgUrl} : missingBookCover

    let quotes = (book && book.quotes.length) ? 
    book.quotes.map((quote, i) => <Quote quote={quote} key={i} />) 
    : 
    <Text>No quotes just yet</Text>

    let notes = (book && book.notes.length) ? 
    book.notes.map((note, i) => <Note note={note} key={i} />)
    : 
    <Text>No notes just yet</Text>

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Banner image={bg7} />

        <View style={styles.bookDetails}>
          <Image source={imgSrc} style={styles.bookImg} />
          <Text style={[styles.title, styles.text]}>{title}</Text>
          <Text style={[styles.authors, styles.text]}>{authors}</Text>
          <Text style={[styles.description, styles.text]}>{description}</Text>
        </View>

        <View style={styles.btnsWrapper}>
          <Button1 
            color='#71a7a9'
            textColor='#fff'
            text='Add Quote'
            onPress={() => {this.setFormData('quote', book)}} />
          
          <Button1 
            color='#71a7a9' 
            textColor='#fff'
            text='Add Note'
            onPress={() => {this.setFormData('note', book)}} />

          <DeleteBtn
            data={{id: (book) ? book.id : -1, endpoint: 'books', userId: this.props.user.id}} 
            type="button"
            onDelete={(data) => {this.updateStore(data)}} />
        </View>

        <View style={styles.notesWrapper}>
          {quotes}
          {notes}
        </View>

        <Modal 
          isVisible={this.state.showModal}
          onBackdropPress={this.toggleModal}>
          <View style={styles.modalWrapper}>
            <AddForm 
              data={this.state.modalFormData}
              onSubmit={(data) => {this.updateStore(data)}} />
          </View>
        </Modal>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  bookDetails: {
    alignItems: 'center'
  },  
  text: {
    fontFamily: 'Merriweather',
    textAlign: 'center'
  },
  bookImg: {
    width: 130,
    height: 200,
    marginTop: -150
  },
  btnsWrapper: {
    alignItems: 'center'
  },
  notesWrapper: {
    alignItems: 'center'
  },
  modalWrapper: {
    backgroundColor: '#f1f3ee',
    padding: 30,
    borderRadius: 5
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.authUser,
    lists: state.lists
  }
}

const mapActionsToProps = {addQuote, addNote, deleteBook}

export default connect(mapStateToProps, mapActionsToProps)(BookView)