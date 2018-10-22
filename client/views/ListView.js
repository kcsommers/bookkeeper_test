import React from 'react'
import {
  View,
  Text
} from 'react-native'
import {connect} from 'react-redux'
import {deleteList} from '../actions/listsActions'
import Book from '../components/Book'
import DeleteBtn from '../components/DeleteBtn'

class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.updateStore = this.updateStore.bind(this)
  }

  updateStore(data) {
    this.props.deleteList(data.id)
    this.props.navigation.navigate('Profile')
  }

  getListFromStore(listId) {
    const listIndex = this.props.lists.findIndex((list) => list.id === listId)
    return this.props.lists[listIndex]
  }

  render() {
    const list = this.getListFromStore(this.props.navigation.getParam('listId'))
    const books = (list) ? list.books.map((book, i) => (
      <Book book={book} list={list} key={i} />
    )) : ''

    return (
      <View>
        <DeleteBtn 
          data={{id: (list) ? list.id : -1, endpoint: 'lists'}}
          type="icon"
          onDelete={(data) => {this.updateStore(data)}}
        />
        <Text>{(list) ? list.name : ''}</Text>
        {books}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  lists: state.lists
})

const mapActionsToProps = {deleteList}

export default connect(mapStateToProps, mapActionsToProps)(ListView)