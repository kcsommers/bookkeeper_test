import React from 'react';
import {createBottomTabNavigator} from 'react-navigation'

import Nav from '../components/Nav'
import IntroView from '../views/IntroView'
import ProfileView from '../views/ProfileView'
import HomeView from '../views/HomeView'
import BookResultsView from '../views/BookResultsView'
import SignupView from '../views/SignupView'
import LoginView from '../views/LoginView'
import SearchView from '../views/SearchView'

const BottomTabNavigator = createBottomTabNavigator({
  Intro: {
    screen: IntroView
  },  
  Home: {
    screen: HomeView
  },
  Profile: {
    screen: ProfileView
  }
})

export default BottomTabNavigator