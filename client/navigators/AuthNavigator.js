import React from 'react';
import {createStackNavigator} from 'react-navigation'
import SignupView from '../views/SignupView'
import LoginView from '../views/LoginView'

const AuthNavigator = createStackNavigator({
  Login: LoginView,
  Signup: SignupView
})

export default AuthNavigator