import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text
} from 'react-native'

import {connect} from 'react-redux'
import {addQuote, addNote, deleteBook} from '../actions/listsActions'

import Modal from 'react-native-modal'
import ModalContent from '../components/ModalContent'
import Banner from '../components/Banner'
import IconBtn from '../components/IconBtn'
import Quote from '../components/Quote'
import Note from '../components/Note'
import Message from '../components/Message'

import missingBookCover from '../assets/images/missingBookCover.jpg'
import bg7 from '../assets/images/page_backgrounds/bg7.jpg'

class BookView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      modalData: null,
      message: null,
      showMessage: false
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.getBookFromStore = this.getBookFromStore.bind(this)
    this.setMessage = this.setMessage.bind(this)
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal, modalData: null})
  }

  setMessage(message) {
    this.setState({message, showMessage: !this.state.showMessage})
  }

  handleModalTrigger(modalData) {
    this.setState({modalData, showModal: true})
  }

  triggerEditForm(type, item) {
    this.setState((prevState) => ({
      showModal: true,
      modalData: {...prevState.modalData, type: 'edit', item, book: null}
    }))
  }

  getBookFromStore(bookId, listId) {
    const listIndex = this.props.lists.findIndex((list) => list.id === listId)
    const bookIndex = this.props.lists[listIndex].books.findIndex((book) => {
      return (book) ? book.id === bookId : null
    })
    
    return this.props.lists[listIndex].books[bookIndex]
  }

  render() {
    const modalData = this.state.modalData
    let listId = this.props.navigation.getParam('listId')
    let book = this.getBookFromStore(this.props.navigation.getParam('bookId'), listId)
    let title = (book) ? book.title : ''
    let authors = (book) ? book.authors : ''
    let description = (book) ? book.description : ''
    let imgSrc = (book && book.imgUrl) ? {uri: book.imgUrl} : missingBookCover

    let quotes = (book && book.quotes.length) ? 
    book.quotes.map((quote, i) => (
      <View key={i} style={{marginBottom: 15, alignSelf: 'stretch'}}>
        <Quote quote={quote} key={i} type="page" />
      </View>
    ))
    : 
    <Text>No quotes just yet</Text>

    let notes = (book && book.notes.length) ? 
    book.notes.map((note, i) => (
      <View key={i} style={{marginBottom: 15, alignSelf: 'stretch'}}>
        <Note 
          note={note} 
          key={i} 
          onPress={() => {this.triggerEditForm('note', note)}}
          type="page" />
      </View>
    ))
    : 
    <Text>No notes just yet</Text>

    const message = (this.state.showMessage) ? 
      <Message 
        message={this.state.message}
        clearMessage={() => {this.setMessage(null)}} /> : ''

    return (
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          <Banner image={book.banner} />
          
          <View style={styles.wrapper}>

            <View style={styles.bookOptionsWrapper}>
              <IconBtn 
                name="options"
                backgroundColor='#fff'
                iconColor="#444"
                iconSize={20}
                circleSize={{width: 40, height: 40, borderRadius: 20, marginTop: 10, marginBottom: 10}}
                onPress={() => {
                  this.handleModalTrigger({type: 'book-options', book, listId})
                }}
              />

              <IconBtn 
                name="backburger"
                backgroundColor='rgba(0,0,0,0)'
                iconColor="#1b9ce2" 
                iconSize={25}
                circleSize={{width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#1b9ce2'}}
                onPress={() => {
                  this.props.navigation.navigate('List', {listId})
                }}
              />
            </View>

            <View style={styles.bookDetails}>
              <Image source={imgSrc} style={styles.bookImg} />
              <Text style={[styles.title, styles.text]}>{title}</Text>
              <Text style={styles.authors}>{authors}</Text>
              <Text style={[styles.description, styles.text]}>{description}</Text>
            </View>

            <View style={styles.noteWrapper}>
              <Text style={styles.noteHeader}>Quotes</Text>
              {quotes}
            </View>

            <View style={styles.noteWrapper}>
              <Text style={styles.noteHeader}>Notes</Text>
              {notes}
            </View>
          </View>

          <Modal
            isVisible={this.state.showModal}
            onBackdropPress={this.toggleModal}>

            <ModalContent 
              data={modalData}
              toggleModal={() => {this.toggleModal()}}
              setMessage={(message) => {this.setMessage(message)}}
              />
          </Modal>
        </ScrollView>
        {message}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bookDetails: {
    alignItems: 'center'
  },  
  wrapper: {
    paddingLeft: 15,
    paddingRight: 15
  },
  text: {
    fontFamily: 'Merriweather',
    textAlign: 'center'
  },
  bookImg: {
    width: 130,
    height: 200,
    marginTop: -150,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
    color: '#1c4b44'
  },
  authors: {
    fontSize: 18,
    fontFamily: 'MerrItalic',
    textAlign: 'center',
    color: '#888888'
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    lineHeight: 25
  },
  noteWrapper: {
    alignItems: 'center'
  },
  noteHeader: {
    fontFamily: 'Merriweather',
    fontSize: 22,
    marginBottom: 15,
    marginTop: 20
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