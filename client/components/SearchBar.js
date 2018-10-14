import React from 'react'
import {
  StyleSheet,
  View, 
  TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      type: this.props.type
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit() {

  }

  handleChange(searchTerm) {
    this.setState({searchTerm})
  }

  render() {
    return(
      <View style={{
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
      }}>
        <TextInput 
          style={styles.input}
          placeholder="New Search"  
          placeholderTextColor="#888"
          onChangeText={(text) => {this.handleChange(text)}} />

        <Icon name="search" size={20} color="#888" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 16
  }
})

export default SearchBar