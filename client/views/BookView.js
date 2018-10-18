import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
} from 'react-native'
import Modal from 'react-native-modal'

import {connect} from 'react-redux'
import addQuote from '../actions/authUserActions'
import addNote from '../actions/authUserActions'

import Banner from '../components/Banner'
import Button1 from '../components/Button1'
import Quote from '../components/Quote'
import Note from '../components/Note'
import AddForm from '../components/AddForm'

import missingBookCover from '../assets/images/missingBookCover.jpg'
import bg7 from '../assets/images/page_backgrounds/bg7.jpg'

class BookView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      book: this.props.navigation.getParam('book', {}),
      showModal: false,
      modalFormData: null
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.setFormData = this.setFormData.bind(this)
  }

  toggleModal() {
    this.setState({showModa: !this.state.showModal})
  }

  setFormData(type) {
    let fields = []
    let data = {}
    let url = ''
    if(type === 'note') {
      fields.push({
        field: 'content',
        placeholder: 'Note',
        value: ''
      })
      url = 'http://localhost:3000/notes'
    }
    else if(type === 'quote') {
      fields.push({
        field: 'content',
        placeholder: 'Quote',
        value: ''
      }, {
        field: 'page',
        placeholder: 'Page',
        value: ''
      })
      url = 'http://localhost:3000/quotes'
    }

    data.fields = fields
    data.data = {
      ids: [{
        type: 'userId',
        id: this.props.user.id
      },
      {
        type: 'bookId',
        id: this.state.book.id
      }],
      url: url,
      method: 'post'
    }
    this.setState({modalFormData: data, showModal: true})
  }

  render() {
    const book = this.state.book
    const imgSrc = (book.imgUrl) ? {uri: book.imgUrl} : missingBookCover

    const quotes = (this.props.user.quotes.length) ? 
    this.props.user.quotes.map((quote, i) => <Quote quote={quote} key={i} />)
    :
    <Text>No Quotes Just Yet</Text>

    const notes = (this.props.user.notes.length) ? 
    this.props.user.notes.map((note, i) => <Note note={note} key={i} />)
    :
    <Text>No Notes Just Yet</Text>

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.bannerWrapper}>
          <Banner image={bg7} />
        </View>
        <View style={styles.mainWrapper}>
          <Image 
            resizeMode="contain"
            source={imgSrc}
            style={styles.bookImg}
          />
          <View style={styles.bookInfo}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.authors}>{book.authors}</Text>
            <Text style={styles.description}>{book.description}</Text>
          </View>
          <View style={styles.btnsWrapper}>
            <Button1 
              color="#71a7a9" 
              text="Add Note" 
              onPress={() => this.setFormData('note')} />
            <Button1 
              color="#71a7a9" 
              text="Add Quote"
              onPress={() => this.setFormData('quote')} />
            <Button1 color="#71a7a9" text="Back to List" />
          </View>
          <View style={styles.quotesWrapper}>
            {quotes}
          </View>
          <View style={styles.notesWrapper}>
            {notes}
          </View>
          <Modal 
            isVisible={this.state.showModal} 
            onBackdropPress={this.toggleModal}>

            <AddForm data={this.state.modalFormData} />

          </Modal>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  mainWrapper: {
    paddingLeft: 15,
    paddingRight: 15
  },
  bookImg: {
    width: 130,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: -150,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#fff'
  },
  title: {
    fontFamily: 'Merriweather',
    textAlign: 'center',
    fontSize: 24
  },
  authors: {
    fontFamily: 'Merriweather',
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    paddingTop: 10,
    paddingBottom: 10
  },
  description: {
    fontFamily: 'Merriweather',
    textAlign: 'center',
    fontSize: 18
  },
  btnsWrapper: {
    paddingTop: 15,
    alignItems: 'center'
  },
  btn: {
    marginBottom: 15
  },
  notesWrapper: {

  },
  quotesWrapper: {

  }
})

const mapStateToProps = (state) => {
  return {
    user: state.authUser
  }
}

const mapActionsToProps = {addQuote, addNote}

export default connect(mapStateToProps, mapActionsToProps)(BookView)