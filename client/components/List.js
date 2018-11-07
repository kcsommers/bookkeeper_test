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
    let bookDisplay = <Text>No books just yet</Text>
    let bookImages = []
    let imgContainerStyle, imgStyle
    if(list.books.length) {
      if(list.books.length < 4) {
        imgContainerStyle = ''
        imgStyle = {marginRight: 10}
      }
      else {
        imgContainerStyle = {justifyContent: 'space-between'}
        imgStyle = ''
      }

      list.books.forEach((book, i) => {
        if(i < 4) {
          let imgSrc = (book && book.imgUrl) ? {uri: book.imgUrl} : missingBookCover
          let bookImg = <Image 
                          source={imgSrc}
                          key={i} 
                          style={[styles.bookImg, imgStyle]} />
          bookImages.push(bookImg)
        }
      })

      bookDisplay = bookImages
    }

    return (
      <TouchableOpacity style={styles.listWrapper} onPress={() => {
        this.props.navigation.navigate('List', {listId: list.id})
      }}>
        <View>
          <Text style={styles.listTitle}>{list.name}</Text>
        </View>
        <View style={[styles.bookImgs, imgContainerStyle]}>
          {bookDisplay}
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
    flex: 1
  },  
  bookImg: {
    width: 75,
    height: 115,
  },
  listTitle: {
    fontFamily: 'Merriweather',
    fontSize: 18,
    marginBottom: 10
  }
})

export default withNavigation(List)
