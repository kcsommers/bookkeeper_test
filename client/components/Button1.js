import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native'

const Button1 = (props) => {
  return (
    <TouchableOpacity 
      style={[styles.btn, {backgroundColor: props.color}]}
      onPress={props.onPress}>
      <Text style={[styles.btnText, {color: props.textColor}]}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    alignSelf: 'stretch'
  },
  btnText: {
    textAlign: 'center',
    fontSize: 16
  }
})

export default Button1