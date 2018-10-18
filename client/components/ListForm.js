import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'
import {addList} from '../actions/authUserActions'
import {connect} from 'react-redux'

class ListForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.listData.name,
      description: this.props.listData.description
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange(text, field) {
    if(field === 'name') {
      this.setState({name: text})
    }
    else if(field === 'description') {
      this.setState({description: text})
    }
  }

  async handleSubmit() {
    const url = 'http://localhost:3000/lists'
    const listData = {name: this.state.name, userId: this.props.user.id}
    const results = await axios.post(url, listData)
    if(!results.data.err) {
      console.log("LISTTT", results.data.list)
      this.props.addList(results.data.list)
      this.props.toggleModal()
      this.setState({name: '', description: ''})
    }
    else {
      console.log('ERROR CREATING LIST', results.data.err)
    }
  }

  render() {
    const headerText = (this.props.isNew) ? 'Create List' : 'Edit List'
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>{headerText}</Text>

        <TextInput
          placeholder="List Name" 
          style={styles.input}
          value={this.state.name}
          onChangeText={(text) => {this.handleChange(text, 'name')}}
        />
        <TextInput 
          style={styles.input}
          placeholder="List Description"
          value={this.state.description}
          onChangeText={(text) => {this.handleChange(text, 'description')}}
        />
        <TouchableOpacity style={styles.submitBtn} onPress={this.handleSubmit}>
          <Text style={styles.submitText}>Create List</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 22,
    fontFamily: 'Merriweather',
    marginBottom: 10
  },  
  input: {
    borderBottomColor: '#71a7a9',
    borderBottomWidth: 2,
    fontSize: 16,
    fontFamily: 'Merriweather',
    padding: 5,
    marginTop: 5,
    marginBottom: 5
  },
  submitBtn: {
    backgroundColor: '#c13149',
    width: '50%',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  submitText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  }
})

const mapStateToProps = state => ({user: state.authUser})
const mapActionsToProps = {addList} 

export default connect(mapStateToProps, mapActionsToProps)(ListForm)
