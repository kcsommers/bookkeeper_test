import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native'
import {withNavigation} from 'react-navigation'

import missingBookCover from '../assets/images/missingBookCover.jpg'

class List extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const list = this.props.list
    const images = list.books.map((book, i) => {
      let imgSrc = (book.imgUrl) ? {uri: book.imgUrl} : missingBookCover
      return <Image source={imgSrc} style={styles.bookImg} key={i} />
    })

    const books = (images.length) ? images : <Text>No Books Just Yet</Text>
    return (
      <TouchableOpacity style={styles.listWrapper} onPress={() => {
        this.props.navigation.navigate('List', {listId: list.id})
      }}>
        <View>
          <Text style={styles.listTitle}>{list.name}</Text>
        </View>
        <View style={styles.bookImgs}>
          {books}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  listWrapper: {
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    backgroundColor: '#fff',
    padding: 15
  },
  bookImgs: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },  
  bookImg: {
    width: 75,
    height: 115
  },
  listTitle: {
    fontFamily: 'Merriweather',
    fontSize: 18,
    marginBottom: 10
  }
})

export default withNavigation(List)
