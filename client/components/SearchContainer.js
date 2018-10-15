import React from 'react'
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View,
  TouchableOpacity
} from 'react-native'
import {withNavigation} from 'react-navigation'
import axios from 'axios'
import {connect} from 'react-redux'
import {setSearchResults} from '../actions/searchResultsActions'
import SearchBar from './SearchBar'

class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }
  render() {
    let backgroundColor, title
    let type = this.props.type
    if(type === 'books') {
      backgroundColor = '#71a7a9'
      title = 'Search Books'
    }
    else if(type === 'clubs') {
      backgroundColor = 'rgba(113, 167, 169, 0.6)'
      title = 'Search Clubs'
    }
    else if(type === 'readers') {
      backgroundColor = '#71a7a9'
      title = 'Search Readers'
    }
    return(
      <View style={[styles.container, {backgroundColor}]}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <SearchBar type={type} styles="small" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Merriweather'
  }
})

const mapStateToProps = (state) => ({searchResults: state.searchResults})
const mapActionsToProps = {setSearchResults} 

export default withNavigation(connect(mapStateToProps, mapActionsToProps)(SearchContainer))