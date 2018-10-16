import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import {Dimensions} from 'react-native'
let screenWidth = Dimensions.get('window').width

class Book extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const book = this.props.book
    return (
      <View style={styles.bookContainer}>
        <View style={styles.bookWrapper}>
          <Image 
            style={styles.bookImg} 
            source={{uri: book.imgUrl}}
            resizeMode="contain" />
          <View style={styles.bookInfo}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.authors}>{book.authors}</Text>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText} >Notes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bookContainer: {
    width: screenWidth,
    padding: 15
  },
  bookWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
  },
  bookImg: {
    width: 130,
    height: 200,
    flex: 0.7,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Merriweather',
    fontSize: 20
  },
  authors: {
    fontFamily: 'Merriweather',
    fontSize: 16
  },
  btn: {
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  btnText: {
    color: '#444',
    fontSize: 16,
    fontFamily: 'Merriweather',
    textAlign: 'center'
  }
})

export default Book