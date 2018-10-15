import React from 'react'
import {
  StyleSheet, 
  ScrollView, 
  View, 
  Text, 
  Image
} from 'react-native'
import {connect} from 'react-redux'
import {setSearchResults} from '../actions/searchResultsActions'
import BookResult from '../components/BookResult'
import SearchBar from '../components/SearchBar'

class BookResultsView extends React.Component {
  render() {
    const searchTerm = this.props.navigation.getParam('searchTerm', '')
    const booksMapped = this.props.books.map((book, i) => (
      <BookResult book={book} key={i} />
    ))

    return(
      <ScrollView>
        <SearchBar type="books" styles="full" />
        <View>
          <Text style={styles.searchTerm}>Showing results for {searchTerm}</Text>
        </View>
        {booksMapped}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  searchTerm: {
    color: '#1c4b44',
    fontStyle: 'italic',
    fontSize: 18,
    margin: 10
  }
})

const mapStateToProps = (state) => ({books: state.searchResults})
const mapActionsToProps = {setSearchResults} 

export default connect(mapStateToProps, mapActionsToProps)(BookResultsView)