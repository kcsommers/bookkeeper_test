import React from 'react'
import {
  StyleSheet, 
  View, 
  Image,
  Animated,
  Easing
} from 'react-native'
import loading from '../assets/images/loading.png'

class LoadingIcon extends React.Component {
  constructor(props) {
    super(props)
    this.spinValue = new Animated.Value(0)
    this.spin = this.spin.bind(this)
  }

  spin() {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }

  componentDidMount() {
    this.spin()
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <Animated.Image 
        resizeMode="contain" 
        style={{
          width: 50,
          height: 50,
          transform: [{rotate: spin}]
        }} 
        source={loading} />
    )
  }
}

export default LoadingIcon