import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import {connect} from 'react-redux'
import {withNavigation} from 'react-navigation'
import {
  deleteList,
  deleteBook,
  deleteNote,
  deleteQuote
} from '../actions/listsActions'

import {deleteClub} from '../actions/clubsActions'

import Button1 from './Button1'
import {handleDelete} from '../formFunctions'

class ModalConfirm extends React.Component {
  constructor(props) {
    super(props)
    this.updateStore = this.updateStore.bind(this)

  }

  updateStore(data) {
    switch(this.props.type) {
      case 'delete-list':
        this.props.deleteList(this.props.data.list.id)
        this.props.navigation.navigate('Profile')
        break
      case 'delete-book':
        this.props.deleteBook(this.props.data.book.id, this.props.data.listId)
        this.props.navigation.navigate('List', {listId: this.props.data.listId})
        break
      case 'delete-club':
        this.props.deleteClub(this.props.data.club.id)
        this.props.navigation.navigate('Profile')
        break
      case 'delete-note':
        this.props.deleteNote(this.props.data.item.id, this.props.data.book.id, this.props.data.listId)
        break
      case 'delete-quote':
        this.props.deleteQuote(this.props.data.item.id, this.props.data.book.id, this.props.data.listId)
        break

    }
    this.props.toggleModal()
  }

  render() {
    let text, btnData, btnText
    switch(this.props.type) {
      case 'delete-book':
        text = 'Deleting this book will also delete your notes.'
        btnText = 'Confirm Delete'
        btnData = {
          type: 'delete-book',
          id: this.props.data.book.id,
          endpoint: 'books'
        }
        break
      case 'delete-list':
        text = 'You will lose all of your notes for the books on this list. To save your notes, move your books to a different list.'
        btnText = "Confirm Delete"
        btnData = {
          type: 'delete-list',
          id: this.props.data.list.id,
          endpoint: 'lists'
        }
        break
      case 'delete-club':
        text = 'Deleting this club will also delete its posts.'
        btnText = "Confirm Delete"
        btnData = {
          type: 'delete-club',
          id: this.props.data.club.id,
          endpoint: 'clubs'
        }
        break
      case 'delete-note':
        text = ''
        btnText = 'Confirm Delete'
        btnData = {
          type: 'delete-note',
          id: this.props.data.item.id,
          endpoint: 'notes'
        }
        break
      case 'delete-quote':
        text = ''
        btnText = 'Confirm Delete'
        btnData = {
          type: 'delete-quote',
          id: this.props.data.item.id,
          endpoint: 'quotes'
        }
        break
    }
    return (
      <View style={styles.wrapper}>
        <Text style={styles.youSure}>Are You Sure?</Text>
        <Text style={styles.subtext}>{text}</Text>
        <Button1 
          color="#c13149"
          text={btnText}
          textColor="#fff"
          onPress={() => {
            handleDelete(btnData).then((results) => {
            this.updateStore(results)
          })}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {

  },
  youSure: {
    fontFamily: 'Merriweather',
    fontSize: 20,
    color: '#1c4b44'
  },
  subtext: {
    fontFamily: 'Merriweather',
    fontSize: 16,
    color: '#444',
    marginTop: 10,
    marginBottom: 10
  }
})

const mapStateToProps = (state) => ({})
const mapActionsToProps = {deleteBook, deleteList, deleteClub, deleteNote, deleteQuote}

export default withNavigation(connect(mapStateToProps, mapActionsToProps)(ModalConfirm))
