import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BackgroundImage from '../components/BackgroundImage'
import SearchBox from '../components/SearchBox'
import {Dimensions} from 'react-native'
import searchUsers from '../assets/images/page_backgrounds/searchUsers.jpg'
let screenWidth = Dimensions.get('window').width

export default class SearchUsers extends React.Component {
  render() {
    return (
      <View style={styles.pageContainer}>
        <SearchBox page={'searchUsers'} />
        <BackgroundImage image={searchUsers} />
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