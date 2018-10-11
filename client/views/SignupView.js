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

export default class SignupView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(text, field) {
    if(field === 'name') {
      this.setState({name: text})
    }
    else if(field === 'email') {
      this.setState({email: text})
    }
    else if(field === 'password') {
      this.setState({password: text})
    }
  }

  async handleSubmit() {
    console.log(this.state)
    const url = 'http://localhost:3000/auth/signup'
    const payload = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    const results = await axios.post(url, payload)
    console.log('SIGNUP RESULTS', results.data)

  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Sign Up</Text>
        </View>
        <TextInput 
          style={[styles.input]}
          placeholder="Username"  
          placeholderTextColor="#fff"
          onChangeText={(text) => {this.handleChange(text, 'name')}}  
          /> 
        <TextInput 
          style={[styles.input]}
          placeholder="Email"
          placeholderTextColor="#fff"  
          onChangeText={(text) => {this.handleChange(text, 'email')}}  
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
          <Text style={styles.btnText}>Sign Up</Text>
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