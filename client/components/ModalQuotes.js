import React from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native'
import Quote from './Quote'
import IconBtn from './IconBtn'

const ModalQuotes = (props) => {
  const quotes = (props.book.quotes.length) ?
  props.book.quotes.map((quote, i) => (
    <View style={{marginBottom: 30}} key={i}>
      <Quote 
        quote={quote} 
        onPress={() => {props.triggerEditForm('quote', quote)}}
        key={i} 
        type="modal"
        onDelete={() => {props.onDelete('quote', quote)}} />
    </View>
  ))
  :
  <Text>No Quotes Just Yet</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.bookTitle}>{props.book.title}</Text>
      <View style={styles.headerWrapper}>
        <IconBtn 
          name="add" 
          backgroundColor="rgba(0,0,0,0)"
          iconColor="#1c4b44"
          iconSize={25}
          circleSize={{width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#1c4b44'}}
          onPress={() => {
            props.triggerAddForm('quote')
          }} />
        <Text style={styles.header}>Quotes</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {quotes}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  scrollContainer: {
    flex: 1
  },
  bookTitle: {
    fontFamily: 'Merriweather',
    fontSize: 16,
    textAlign: 'center'
  },
  header: {
    fontFamily: 'Merriweather',
    fontSize: 20,
    marginLeft: 15
  }
})

export default ModalQuotes
