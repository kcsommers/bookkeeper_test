import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native'
import Book from './Book'

class List extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const list = this.props.list
    const books = list.books.map((book, i) => <Book book={book} key={i} />)
    return (
      <View style={styles.listWrapper}>
        <Text style={styles.listName}>{list.name}</Text>
        <ScrollView 
          horizontal={true}
          contentContainerStyle={styles.bookSlider}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
        >
        {books}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listWrapper: {
    
  }, 
  listName: {
    fontFamily: 'Merriweather',
    fontSize: 16,
    marginLeft: 15
  },
  bookSlider: {

  }
})

export default List
