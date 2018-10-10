import React from 'react'
import { StyleSheet, Button, View } from 'react-native'
import BackgroundImage from '../components/BackgroundImage'
import SearchBox from '../components/SearchBox'
import {Dimensions} from 'react-native'
import searchBooks from '../assets/images/page_backgrounds/searchBooks.jpg'
let screenWidth = Dimensions.get('window').width

export default class SearchBooks extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <SearchBox page={'searchBooks'} />
        <BackgroundImage image={searchBooks} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth
  }
})