import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BackgroundImage from '../components/BackgroundImage'
import SearchBox from '../components/SearchBox'
import {Dimensions} from 'react-native'
import searchClubs from '../assets/images/page_backgrounds/searchClubs.jpg'
let screenWidth = Dimensions.get('window').width

export default class SearchClubs extends React.Component {
  render() {
    return (
      <View style={styles.pageContainer}>
        <SearchBox page={'searchClubs'} />
        <BackgroundImage image={searchClubs} />
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