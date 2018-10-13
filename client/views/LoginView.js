import React from 'react'
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View,
  ScrollView,
  TouchableOpacity 
} from 'react-native'
import axios from 'axios'

import {connect} from 'react-redux'
import {setAuthUser} from '../actions/authUserActions'
import {orientationChange} from '../actions/orientationActions'

class LoginView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(text, field) {
    if(field === 'name') {
      this.setState({username: text})
    }
    else if(field === 'password') {
      this.setState({password: text})
    }
  }

  async setToken(token) {
    try {
      await AsyncStorage.setItem('bookkeeperToken', token)
    }
    catch(err) {
      console.log('ERROR SETTING TOKEN', err)
    }
  }

  async handleSubmit() {
    const url = 'http://localhost:3000/auth/login'
    const payload = {
      username: this.state.username,
      password: this.state.password
    }
    const results = await axios.post(url, payload)
    if(results.data.token) {
      const user = {
        username: this.state.username,
        email: this.state.email,
        token: results.data.token
      }
      this.props.setAuthUser(user)
      this.setToken(results.data.token)
    }
    else if(results.data.error) {
      this.setState({
        message: results.data.error.message
      })
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Login</Text>
        </View>
        <TextInput 
          style={[styles.input]}
          placeholder="Username"  
          placeholderTextColor="#fff"
          onChangeText={(text) => {this.handleChange(text, 'name')}}  
          /> 
        <TextInput 
          style={[styles.input]}
          placeholder="Password"  
          placeholderTextColor="#fff"  
          onChangeText={(text) => {this.handleChange(text, 'password')}}  
        />
        <TouchableOpacity 
          style={styles.submitBtn}
          onPress={this.handleSubmit}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#71a7a9',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30
  },  
  titleWrapper: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10
  },
  title: {
    fontSize: 24,
    color: '#fff',
    borderBottomColor: 'green'
  },
  input: {
    fontSize: 20,
    color: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    marginBottom: 15,
    borderBottomColor: '#fff', 
    borderBottomWidth: 2,
  },
  submitBtn: {
    backgroundColor: '#c13149',
    marginTop: 20
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15
  }
})

const mapStateToProps = state => {
  return state
}

const mapActionsToProps = {setAuthUser, orientationChange} 
export default connect(mapStateToProps, mapActionsToProps)(LoginView)