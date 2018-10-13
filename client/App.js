import React from 'react';
import { 
  AsyncStorage,
  Dimensions
 } from 'react-native'
import axios from 'axios'
import {connect} from 'react-redux'
import {setAuthUser} from './actions/authUserActions'
import {orientationChange} from './actions/orientationActions'
import AppNavigator from './services/AppNavigator'

class App extends React.Component {
  constructor(props) {
    super(props)
    const {width, height} = Dimensions.get('window')
    this.state = {
      width, 
      height,
      orientation: (width < height) ? 'portrait' : 'landscape'
    }
    this.onLayout = this.onLayout.bind(this)
    this.fetchToken = this.fetchToken.bind(this)
    this.setAuthUser = this.setAuthUser.bind(this)
  }

  onLayout() {
    const {width, height} = Dimensions.get('window')
    this.setState({
      width, 
      height,
      orientation: (width < height) ? 'portrait' : 'landscape'
    })
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
    }
    else {
      console.log('ERROR', verified.data.err)
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
      }
    }
    catch(err) {
      console.log('ERROR FETCHING TOKEN', err)
    }
  }

  async componentDidMount() {
    if(!this.state.authUser) this.fetchToken()
  }

  render() {
    AsyncStorage.clear()
    return <AppNavigator />
  }
}

const mapStateToProps = state => state

const mapActionsToProps = {setAuthUser, orientationChange} 

export default connect(mapStateToProps, mapActionsToProps)(App)