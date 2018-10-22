import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import {withNavigation} from 'react-navigation'
import Book from './Book'
import Icon from 'react-native-vector-icons/FontAwesome'


class List extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const list = this.props.list
    const books = (list.books && list.books.length) ?
    list.books.map((book, i) => <Book book={book} list={list} key={i} />) :
    ''
    const noBooks = (!list.books || !list.books.length) ? (
      <View style={styles.noBooksWrapper}>
        <Text style={styles.noBooks}>No Books Just Yet</Text>
      </View>
    ) : ''

    return (
      <View style={styles.listWrapper}>
        <View style={styles.listHeader}>
          <Text style={styles.listName}>{list.name}</Text>
          <View style={styles.listIcons}>
            <TouchableOpacity 
              onPress={() => {this.props.navigation.navigate('List', {listId: list.id})}}>
              <Icon name="th-list" size={25} color="#1b9ce2" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.bookSlider}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
        >
        {books}
        </ScrollView>
        {noBooks}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listWrapper: {

  }, 
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15
  },
  listIcons: {

  },
  listName: {
    fontFamily: 'Merriweather',
    fontSize: 16,
  },
  bookSlider: {

  },
  noBooksWrapper: {
    padding: 15
  },  
  noBooks: {
    backgroundColor: '#fff',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    fontSize: 16,
    fontFamily: 'Merriweather',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5
  }
})

export default withNavigation(List)
