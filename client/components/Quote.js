import React from 'react'
import {
  View,
  Text
} from 'react-native'

const Quote = (props) => {
  return (
    <View>
      <Text>{props.quote.content}</Text>
    </View>
  )
}

export default Quote