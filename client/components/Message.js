import React from  'react'
import {
  StyleSheet,
  Text,
  Animated,
  Easing
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

class Message extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.animatedValue = new Animated.Value(0)
    this.animate = this.animate.bind(this)
    this.animateOut = this.animate.bind(this)
  }

  animate() {
    this.setState({visible: !this.state.visible})
    this.animatedValue.setValue(0)
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear
    }).start(() => {
      if(this.state.visible) {
        setTimeout(() => {
          this.animate()
        }, 1000)
      }
      else {
        this.props.clearMessage()
      }
    })
  }

  componentDidMount() {
    this.animate()
  }

  render() {
    const opacityIn = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    })

    const opacityOut = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    })

    const scaleIn = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.5, 1.2, 1]
    })

    const scaleOut = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.2, 0.5]
    })

    const opacity = (this.state.visible) ? opacityIn : opacityOut
    const scale = (this.state.visible) ? scaleIn : scaleOut

    let message = ''
    let iconName = 'check-circle'
    if(this.props.message) {
      message = (this.props.message.err) ? this.props.message.err : this.props.message.success
      iconName = (this.props.message.err) ? 'error-outline' : 'check-circle'
  }



    return (
      <Animated.View 
        style={[
          styles.wrapper,
          {
            opacity,
            transform: [{scale}, {translateY: -100}]
          }
        ]}
        onLoad={this.animateIn}>
        <Text style={styles.text}>{message}</Text>
        <Icon name={iconName} size={50} color="#444" />
      </Animated.View>
    )
      
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 5,
    height: 200,
    minWidth: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: '50%'
  },
  text: {
    fontFamily: 'Merriweather',
    fontSize: 24,
    color: '#444',
    marginBottom: 20
  }
})

export default Message
