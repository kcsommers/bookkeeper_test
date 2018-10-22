import React from 'react'
import {
  StyleSheet,
  View, 
  TextInput,
  TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {setSearchResults} from '../actions/searchResultsActions'
import {withNavigation} from 'react-navigation'

import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(endPoint) {
    let url = (endPoint === 'books' || endPoint === 'clubs') ?
    'http://localhost:3000/' : 'https://www.googleapis.com/'
    url = `${url}${endPoint}?q=${this.state.searchTerm}`
    console.log(url)
    try {
      const results = await axios.get(url)
      this.props.setSearchResults(results.data.items)
      this.props.navigation.navigate('SearchResults', {searchTerm: this.state.searchTerm, endPoint})
    }
    catch(err) {
      console.log('ERROR FINDING SEARCHRESULTS', err)
    }
  }

  handleChange(searchTerm) {
    this.setState({searchTerm})
  }

  render() {
    const styles = (this.props.type === 'full') ? fullWidthStyles : smallStyles
    return(
      <View style={styles.container}>
        <TextInput 
          style={styles.input}
          placeholder="New Search"  
          placeholderTextColor="#888"
          onChangeText={(text) => {this.handleChange(text)}} />

        <TouchableOpacity onPress={() => this.handleSubmit(this.props.endPoint)}>
          <Icon name="search" size={20} color="#888" />
        </TouchableOpacity>
      </View>
    )
  }
}

const fullWidthStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },

  input: {
    flex: 1,
    fontSize: 16
  }
})

const smallStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: '80%',
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  input: {

  }
})

const mapStateToProps = (state) => {
  return state
}

const mapActionsToProps = {setSearchResults}

export default withNavigation(connect(mapStateToProps, mapActionsToProps)(SearchBar))