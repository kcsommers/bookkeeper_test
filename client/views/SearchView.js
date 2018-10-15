import React from 'react'
import {
  StyleSheet,
  View, 
  Text
} from 'react-native'
import SearchContainer from '../components/SearchContainer'

class SearchView extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <SearchContainer type="books" />
        <SearchContainer type="clubs" />
        <SearchContainer type="readers" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default SearchView