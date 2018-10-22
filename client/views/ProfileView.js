import React from 'react'
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  Text, 
  TextInput,
  TouchableOpacity,
  Image
 } from 'react-native'
 import axios from 'axios'
 import {connect} from 'react-redux'
 import {addList} from '../actions/authUserActions'

 import SearchBar from '../components/SearchBar'

class ProfileView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listName: ''
    }
    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeText(text) {
    this.setState({listName: text})
  }

  async handleSubmit() {
    const url = 'http://localhost:3000/lists'
    const list = {
      name: this.state.listName,
      userId: this.props.user.id
    }
    const results = await axios.post(url, list)
    if(!results.data.err) {
      this.props.addList(results.data.list)
    }
  }

  render() {

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <SearchBar 
          type="full"
          endPoint="books/v1/volumes" />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  }
})

const mapStateToProps = state => ({
  user: state.authUser, 
  lists: state.lists,
  clubs: state.clubs
})
const mapActionsToProps = {addList} 
export default connect(mapStateToProps, mapActionsToProps)(ProfileView)