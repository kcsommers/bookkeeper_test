import React from 'react'
import { 
  StyleSheet, 
  View, 
  Text,
  AsyncStorage
} from 'react-native'

import axios from 'axios'
import {connect} from 'react-redux'
import {setAuthUser} from '../actions/authUserActions'
import {setLists} from '../actions/listsActions'

class IntroView extends React.Component {
  constructor(props) {
    super(props)
    this.fetchToken = this.fetchToken.bind(this)
  }

  async verifyToken(token) {
    console.log('VERIFYING TOKEN')
    const url = 'http://localhost:3000/auth/verify'
    const verified = await axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    if(verified.data.verified) {
      this.props.setAuthUser(verified.data.authUser)
      this.props.setLists(verified.data.lists)
      
      setTimeout(() => {
        this.props.navigation.navigate('App')
      }, 1000)
    }
    else {
      console.log('ERROR', verified.data.err)
      this.props.navigation.navigate('Auth')
    }
  }
  
  async fetchToken() {
    try{
      const token = await AsyncStorage.getItem('bookkeeperToken')
      if(token) {
        console.log("FOUND TOKEN")
        this.verifyToken(token)
      }
      else {
        console.log('NO TOKEN FOUND')
        setTimeout(() => {
          this.props.navigation.navigate('Auth')
        }, 1000)
      }
    }
    catch(err) {
      console.log('ERROR FETCHING TOKEN', err)
    }
  }

  componentDidMount() {
    this.fetchToken()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bookkeeper</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#71a7a9'
  },
  title: {
    fontFamily: 'Pacifico',
    color: '#fff',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 50
  },
  loadingIcon: {
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

const mapStateToProps = state => state

const mapActionsToProps = {setAuthUser, setLists} 

export default connect(mapStateToProps, mapActionsToProps)(IntroView)
