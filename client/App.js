import React from 'react';
import { 
  Dimensions,
  AsyncStorage
 } from 'react-native'
import AppNavigator from './services/AppNavigator'

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
    return <AppNavigator />
  }
}

export default App