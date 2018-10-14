import React from 'react'
import { 
  StyleSheet, 
  View, 
  Text,
  AsyncStorage
} from 'react-native'
import bookLogo from '../assets/images/bookLogo.png'
import LoadingIcon from '../components/LoadingIcon'

import axios from 'axios'
import {connect} from 'react-redux'
import {setAuthUser} from '../actions/authUserActions'
import {orientationChange} from '../actions/orientationActions'

class IntroView extends React.Component {
  constructor(props) {
    super(props)
    this.fetchToken = this.fetchToken.bind(this)
    this.setAuthUser = this.setAuthUser.bind(this)
  }

  setAuthUser(user) {
    this.props.setAuthUser(user)
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
      this.setAuthUser(verified.data.authData.user)
      setTimeout(() => {
        this.props.navigation.navigate('Home')
      }, 1000)
    }
    else {
      console.log('ERROR', verified.data.err)
      this.props.navigation.navigate('Login')
    }
  }
  
  async fetchToken() {
    try{
      const token = await AsyncStorage.getItem('bookkeeperToken')
      if(token) {
        console.log("FOUND TOKEN", token)
        this.verifyToken(token)
      }
      else {
        console.log('NO TOKEN FOUND')
        setTimeout(() => {
          this.props.navigation.navigate('Login')
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
        <View style={{alignItems: 'center'}}>
          <LoadingIcon />
        </View>
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

const mapActionsToProps = {setAuthUser, orientationChange} 

export default connect(mapStateToProps, mapActionsToProps)(IntroView)
