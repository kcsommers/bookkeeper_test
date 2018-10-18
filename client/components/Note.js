import React from 'react'
import {
  View,
  Text
} from 'react-native'

const Note = (props) => {
  return (
    <View>
      <Text>{props.note.content}</Text>
    </View>
  )
}

export default Note