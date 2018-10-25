import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import {withNavigation} from 'react-navigation'
import missingBookCover from '../assets/images/missingBookCover.jpg'
import IconBtn from './IconBtn'

class Book extends React.Component {

  render() {
    const book = this.props.book
    const imgSrc = (book.imgUrl) ? {uri: book.imgUrl} : missingBookCover
    return (
      <View style={styles.bookContainer}>
        <View style={styles.bookLeft}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('Book', {bookId: book.id, listId: book.listsBooks.listId})
          }}>
            <Image source={imgSrc} style={styles.image} resizeMode="cover" />
          </TouchableOpacity>
        </View>
        <View style={styles.bookRight}>
          <View style={styles.bookDetails}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.authors}>{book.authors}</Text>
            <View style={styles.bookButtons}>
              <IconBtn 
                name="note"
                backgroundColor='#71a7a9'
                iconColor="#fff" 
                onPress={() => {
                  this.props.modalTrigger({
                    type: 'notes', book, listId: book.listsBooks.listId
                  })
                }} />
              <IconBtn 
                name="quote" 
                backgroundColor="#71a7a9"
                iconColor="#fff"
                onPress={() => {
                  this.props.modalTrigger({
                    type: 'quotes', book, listId: book.listsBooks.listId
                  })
                }} />
              <IconBtn 
                name="options" 
                backgroundColor="#fff"
                iconColor="#444"
                onPress={() => {
                  this.props.modalTrigger({
                    type: 'options', book, listId: book.listsBooks.listId
                  })
                }} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bookContainer: {
    flexDirection: 'row',
    flex: 1
  },
  bookLeft: {
    flex: 1
  },
  bookRight: {
    flex: 1.5,
    justifyContent: 'flex-start'

  },
  bookDetails: {

  },
  title: {
    fontFamily: 'Merriweather',
    color: '#1c4b44',
    fontSize: 20
  },
  authors: {
    fontFamily: 'MerrItalic',
    color: '#888',
    fontSize: 16
  },  
  bookButtons: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10
  },
  image: {
    width: 130,
    height: 200,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5
  }
})

export default withNavigation(Book)