import React from 'react'
import {
  StyleSheet, 
  ScrollView, 
  View, 
  Text
} from 'react-native'
import {connect} from 'react-redux'
import {setSearchResults} from '../actions/searchResultsActions'
import BookResult from '../components/BookResult'
import Club from '../components/Club'
import SearchBar from '../components/SearchBar'

class SearchResultsView extends React.Component {
  render() {
    const searchTerm = this.props.navigation.getParam('searchTerm', '')
    const endPoint = this.props.navigation.getParam('endPoint', '')
    const resultsMapped = this.props.results.map((result, i) => {
      if(endPoint === 'books') {
        const users = result.users.map((user) => <Text>{user.username}</Text>)
        return users
      }
      else if(endPoint === 'clubs') {
        return <Club club={result} key={i} />
      }
      else {
        return <BookResult book={result} key={i} />
      }
    })

    return(
      <ScrollView>
        <SearchBar endPoint="books/v1/volumes" type="full" />
        <View>
          <Text style={styles.searchTerm}>Showing results for {searchTerm}</Text>
        </View>
        {resultsMapped}
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

const mapStateToProps = (state) => ({results: state.searchResults})
const mapActionsToProps = {setSearchResults} 

export default connect(mapStateToProps, mapActionsToProps)(SearchResultsView)