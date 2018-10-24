import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'

const ModalOption = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

})

export default ModalOption