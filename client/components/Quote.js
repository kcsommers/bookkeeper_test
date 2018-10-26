import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

const Quote = (props) => {
  return (
    <TouchableOpacity style={styles.wrapper}>
      <View style={styles.dateWrapper}>
        <Text style={styles.date}>added a month ago</Text>
      </View>
      <Text style={styles.text}>{props.quote.content}</Text>
      <Text style={styles.page}>Page: {props.quote.page}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    borderRadius: 5,
    alignSelf: 'stretch'
  },
  dateWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingTop: 5,
    paddingBottom: 10
  },
  text: {
    color: '#444',
    fontFamily: 'MerrItalic',
    fontSize: 16,
  },
  page: {
    fontFamily: 'Merriweather',
    marginTop: 10
  }
})

export default Quote