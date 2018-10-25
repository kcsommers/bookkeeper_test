import React from 'react'
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  Text,
  TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {addList, addNote, addQuote} from '../actions/listsActions'
import Icon from 'react-native-vector-icons/FontAwesome'

import Modal from 'react-native-modal'
import ModalContent from '../components/ModalContent'
import SearchBar from '../components/SearchBar'
import List from '../components/List'
import Book from '../components/Book'
import Club from '../components/Club'

class ProfileView extends React.Component {
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

  render() {
    const lists = this.props.lists.map((list, i) => (
      <View style={{marginBottom: 15}} key={i}>
        <List list={list} key={i} />
      </View>
    ))
    const clubs = this.props.user.clubs.map((club, i) => (
      <View style={{marginBottom: 15}} key={i}>
        <Club club={club} key={i} />
      </View>
    ))
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
          modalTrigger={(data) => this.handleModalTrigger(data)} />
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
                this.handleModalTrigger({type: 'list'})
              }}>
                <Icon name="plus" size={25} color="#1b9ce2" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.clubsContainer}>
            <Text style={[styles.header]}>My Clubs</Text>
            {clubs}
          </View>

          <Modal
            isVisible={this.state.showModal}
            onBackdropPress={this.toggleModal}>

            <ModalContent 
              data={this.state.modalData}
              toggleModal={() => {this.toggleModal()}}
            />
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