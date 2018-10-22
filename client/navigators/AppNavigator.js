import React from 'react'
import {createStackNavigator} from 'react-navigation'
import BottomTabNavigator from './BottomTabNavigator'
import Nav from '../components/Nav'

const AppNavigator = createStackNavigator({
  Tabs: BottomTabNavigator
}, {
  navigationOptions: {
    header: <Nav />
  }
})

export default AppNavigator