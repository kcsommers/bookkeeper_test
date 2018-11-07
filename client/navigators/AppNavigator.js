import React from 'react'
import {createStackNavigator} from 'react-navigation'
import BottomTabNavigator from './BottomTabNavigator'
import SideNavigator from './SideNavigator'
import Nav from '../components/Nav'
import CreateView from '../views/CreateView'

const AppNavigator = createStackNavigator({
  Tabs: BottomTabNavigator,
  Create: CreateView
}, {
  navigationOptions: {
    header: <Nav />
  }
})

export default AppNavigator