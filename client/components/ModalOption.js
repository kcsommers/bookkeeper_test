import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'

const ModalOption = (props) => {
  return(
    <TouchableOpacity style={[styles.container]} onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'Merriweather',
    fontSize: 20,
  }
})

export default ModalOption