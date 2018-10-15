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
 import {setAuthUser, addList} from '../actions/authUserActions'

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
    console.log('USER DEETS', this.props.user)
    const user = this.props.user
    const lists = this.props.user.lists.map((list, i) => {
      return (
        <Text key={i}>{list.name}</Text>
      )
    })
    return (
      <ScrollView>
        <Text>{user.username}</Text>
        <TextInput placeholder="Create New List" onChangeText={(text) => {this.handleChangeText(text)}} />
        <TouchableOpacity onPress={this.handleSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
        {lists}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({

})

const mapStateToProps = state => ({user: state.authUser})
const mapActionsToProps = {setAuthUser, addList} 
export default connect(mapStateToProps, mapActionsToProps)(ProfileView)