import React from 'react';
import { 
  Dimensions,
  AsyncStorage
 } from 'react-native'
import AppNavigator from './navigators/AppNavigator'
import BottomTabNavigator from './navigators/BottomTabNavigator'

class App extends React.Component {
  onLayout() {
    const {width, height} = Dimensions.get('window')
    this.setState({
      width, 
      height,
      orientation: (width < height) ? 'portrait' : 'landscape'
    })
  }

  render() {
    // AsyncStorage.clear()
    return <BottomTabNavigator />
  }
}

export default App