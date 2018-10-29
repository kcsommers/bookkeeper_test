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
import Message from '../components/Message'
import NavDots from '../components/NavDots'

class ProfileView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      modalData: null,
      message: null,
      showMessage: false,
      activeDot: 0,
      currentOffset: 0
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleModalTrigger = this.handleModalTrigger.bind(this)
    this.setMessage = this.setMessage.bind(this)
    this.handleScrollEnd = this.handleScrollEnd.bind(this)
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

  handleScrollEnd(e) {
    const newOffset = e.nativeEvent.targetContentOffset.x
    if(newOffset > this.state.currentOffset) {
      this.setState({
        activeDot: this.state.activeDot + 1,
        currentOffset: newOffset
      })
    }
    else if(newOffset < this.state.currentOffset) {
      this.setState({
        activeDot: this.state.activeDot - 1,
        currentOffset: newOffset
      })
    }
  }

  render() {
    const modalData = this.state.modalData
    const lists = this.props.lists.map((list, i) => (
      <View style={{marginBottom: 15}} key={i}>
        <List list={list} key={i} />
      </View>
    ))
    const clubs = this.props.clubs.map((club, i) => (
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
      <Book 
        book={book} 
        key={i} 
        modalTrigger={(data) => this.handleModalTrigger(data)} />
    ))
    :
    <Text>You are not currently reading anything!</Text>
    const dotCount = currentsDisplay.length ? currentsDisplay.length : 0

    const message = (this.state.showMessage) ? 
    <Message 
      message={this.state.message}
      clearMessage={() => {this.setMessage(null)}} /> : ''

    return (
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          <SearchBar 
            type="full"
            endPoint="books/v1/volumes" />

          <View style={styles.profileWrapper}>
            <View style={styles.currentReadsContainer}>
              <Text style={[styles.header, {padding: 15}]}>Current Reads</Text>
              <ScrollView 
                horizontal={true} 
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScrollEndDrag={this.handleScrollEnd}
              >
                {currentsDisplay}
              </ScrollView>
                
              <NavDots dots={dotCount} active={this.state.activeDot} />
            </View>

            <View style={styles.listsContainer}>
              <Text style={[styles.header]}>My Lists</Text>
              {lists}
              <View style={styles.addListWrapper}>
                <TouchableOpacity style={styles.addListBtn} onPress={() => {
                  this.handleModalTrigger({
                    type: 'list',
                    modalStyle: null,
                    modalAnimations: {
                      in: 'slideInUp',
                      out: 'slideOutDown'
                    }
                  })
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
              onBackdropPress={this.toggleModal}
              animationIn={(modalData) ? modalData.modalAnimations.in : 'zoomIn'}
              animationOut={(modalData) ? modalData.modalAnimations.out : 'zoomOut'}
            >

              <ModalContent 
                data={modalData}
                toggleModal={() => {this.toggleModal()}}
                setMessage={(message) => {this.setMessage(message)}}
              />
            </Modal>
          </View>
        </ScrollView>
        {message}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profileWrapper: {
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