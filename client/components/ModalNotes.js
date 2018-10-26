import React from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native'
import Note from './Note'
import IconBtn from './IconBtn'

const ModalNotes = (props) => {
  const notes = (props.book.notes.length) ?
  props.book.notes.map((note, i) => {
    console.log(note, i)
    return <Note note={note} key={i} />
  })
  :
  <Text>No Notes Just Yet</Text>
  return (
    <View style={styles.container}>
      <View style={styles.addBtn}>
        <IconBtn 
          name="add" 
          backgroundColor="rgba(0,0,0,0)"
          iconColor="#1c4b44"
          iconSize={25}
          circleSize={{width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#1c4b44'}}
          onPress={() => {
            this.props.modalTrigger({
              type: 'quotes', 
              book, 
              modalStyle: {
                flex: 1
              },
              modalAnimations: {
                in: 'zoomIn',
                out: 'zoomOut'
              },
              listId: book.listsBooks.listId
            })
          }} />
      </View>
      <Text style={styles.header}>Notes</Text>
      <Text style={styles.bookTitle}>{props.book.title}</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {notes}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  addBtn: {
    position: 'absolute'  
  },
  scrollContainer: {

  },
  bookTitle: {
    fontFamily: 'Merriweather',
    fontSize: 16
  },
  header: {
    fontFamily: 'Merriweather',
    fontSize: 20,
    textAlign: 'center',
    flex: 1
  }
})

export default ModalNotes
