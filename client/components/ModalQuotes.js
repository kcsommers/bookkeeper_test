import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

const ModalQuotes = (props) => {
  const notes = (props.book.quotes.length) ?
  props.book.quotes.map((quote, i) => <Text key={i}>{quote.content}</Text>)
  :
  <Text>No Quotes Just Yet</Text>
  return (
    <View>{notes}</View>
  )
}

const styles = StyleSheet.create({

})

export default ModalQuotes
