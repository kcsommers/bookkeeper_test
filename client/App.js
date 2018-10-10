import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {createStackNavigator} from 'react-navigation'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {reducers} from './reducers';
import HomeView from './views/HomeView'
import {Dimensions} from 'react-native' 
import {Font} from 'expo'

const AppNavigator = createStackNavigator({
  Home: HomeView
})

const store = createStore(reducers)
export default class App extends React.Component {
  constructor(props) {
    super(props)
    const {width, height} = Dimensions.get('window')
    this.state = {
      width, 
      height,
      orientation: (width < height) ? 'portrait' : 'landscape',
      fontsLoaded: false
    }
    this.onLayout = this.onLayout.bind(this)
  }

  onLayout() {
    const {width, height} = Dimensions.get('window')
    this.setState({
      width, 
      height,
      orientation: (width < height) ? 'portrait' : 'landscape'
    })
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Merriweather': require('./assets/fonts/Merriweather-Regular.ttf'),
      'Pacifico': require('./assets/fonts/Pacifico-Regular.ttf')
    })

    this.setState({fontsLoaded: true})
  }

  render() {
    const theApp = (this.state.fontsLoaded) ? <AppNavigator /> : null
    return theApp
  }
}

const styles = StyleSheet.create({
  appWrapper: {

  }
});
