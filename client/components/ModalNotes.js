import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

const ModalNotes = (props) => {
  const notes = (props.book.notes.length) ?
props.book.notes.map((note, i) => {
    return <Text key={i}>{note.content}</Text>
  })
  :
  <Text>No Notes Just Yet</Text>
  return (
    <View>{notes}</View>
  )
}

const styles = StyleSheet.create({

})

export default ModalNotes
