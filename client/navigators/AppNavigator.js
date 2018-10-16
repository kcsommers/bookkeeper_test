import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

import Nav from '../components/Nav'
import IntroView from '../views/IntroView'
import ProfileView from '../views/ProfileView'
import HomeView from '../views/HomeView'
import BookResultsView from '../views/BookResultsView'
import SignupView from '../views/SignupView'
import LoginView from '../views/LoginView'
import SearchView from '../views/SearchView'

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeView,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#1c4b44'
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
  Search: {
    screen: SearchView,
    navigationOptions: {
      headerStyle: {
        display: 'none'
      }
    }
  },
  Profile: {
    screen: ProfileView,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#1c4b44'
      }
    }
  },
  Login: {
    screen: LoginView,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#1c4b44'
      }
    }
  },
  BookResults: {
    screen: BookResultsView,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#1c4b44'
      }
    }
  },
  Signup: {
    screen: (props) =>  <SignupView {...props} />,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#1c4b44'
      }
    }
  }
}, {
  initialRouteName: 'Intro'
})

export default AppNavigator