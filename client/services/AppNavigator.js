import React from 'react';
import {createStackNavigator} from 'react-navigation'

import Nav from '../components/Nav'
import IntroView from '../views/IntroView'
import HomeView from '../views/HomeView'
import SignupView from '../views/SignupView'
import LoginView from '../views/LoginView'

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeView,
    navigationOptions: {
      header: <Nav />,
      headerStyle: {
        backgroundColor: 'transparent'
      }
    }
  },
  Intro: {
    screen: IntroView,
    navigationOptions: {
      headerStyle: {
        display: 'none'
      }
    }
  },
  Login: {
    screen: LoginView,
    navigationOptions: {
      header: <Nav />,
      headerStyle: {
        backgroundColor: 'transparent'
      }
    }
  },
  Signup: {
    screen: (props) =>  <SignupView {...props} />,
    navigationOptions: {
      header: <Nav />,
      headerStyle: {
        backgroundColor: 'transparent'
      }
    }
  }
}, {
  initialRouteName: 'Intro'
})

export default AppNavigator