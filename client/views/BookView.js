import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity
} from 'react-native'

import {connect} from 'react-redux'
import {addQuote, addNote, deleteBook} from '../actions/listsActions'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontIcon from 'react-native-vector-icons/FontAwesome'

import Modal from 'react-native-modal'
import ModalContent from '../components/ModalContent'
import Banner from '../components/Banner'
import Button1 from '../components/Button1'
import Quote from '../components/Quote'
import Note from '../components/Note'

import missingBookCover from '../assets/images/missingBookCover.jpg'
import bg7 from '../assets/images/page_backgrounds/bg7.jpg'

class BookView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      modalData: null
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.getBookFromStore = this.getBookFromStore.bind(this)
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal, modalData: null})
  }

  handleModalTrigger(modalData) {
    this.setState({modalData, showModal: true})
  }

  getBookFromStore(bookId, listId) {
    const listIndex = this.props.lists.findIndex((list) => list.id === listId)
    const bookIndex = this.props.lists[listIndex].books.findIndex((book) => book.id === bookId)
    
    return this.props.lists[listIndex].books[bookIndex]
  }

  render() {
    let listId = this.props.navigation.getParam('listId')
    let book = this.getBookFromStore(this.props.navigation.getParam('bookId'), listId)
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
        
        <View style={styles.wrapper}>

          <TouchableOpacity>
            <MaterialIcon name="backburger" size={25} color="#1b9ce2" />
          </TouchableOpacity>

          <View style={styles.bookDetails}>
            <Image source={imgSrc} style={styles.bookImg} />
            <Text style={[styles.title, styles.text]}>{title}</Text>
            <Text style={styles.authors}>{authors}</Text>
            <Text style={[styles.description, styles.text]}>{description}</Text>
          </View>

          <View style={styles.btnsWrapper}>
            <Button1 
              color='#fff'
              textColor='#444'
              text='Options'
              onPress={() => {
                this.handleModalTrigger({type: 'options', book, listId})
              }} />
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
            data={this.state.modalData}
            toggleModal={() => {this.toggleModal()}}
          />
        </Modal>
      </ScrollView>
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
  btnsWrapper: {
    alignItems: 'center'
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