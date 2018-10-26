import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import Note from './Note'

const ModalNotes = (props) => {
  const notes = (props.book.notes.length) ?
props.book.notes.map((note, i) => {
    return <Note note={note} key={i} />
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
