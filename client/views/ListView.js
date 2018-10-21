import React from 'react'
import {
  View,
  Text
} from 'react-native'
import Book from '../components/Book'

class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: this.props.navigation.getParam('list', {})
    }
  }

  render() {
    const list = this.state.list
    const books = list.books.map((book, i) => (
      <Book book={book} list={list} key={i} />
    ))
    return (
      <View>
        <Text>{list.name}</Text>
        {books}
      </View>
    )
  }
}

export default ListView