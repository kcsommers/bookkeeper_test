import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const Note = (props) => {
  const styles = (props.type === 'modal') ? modalStyles : pageStyles
  return (
    <TouchableOpacity style={styles.wrapper} onPress={props.onPress}>
      <View style={mainStyles.dateWrapper}>
        <Text style={mainStyles.date}>added a month ago</Text>
        <TouchableOpacity onPress={props.onDelete}>
          <MaterialIcon name="remove-circle-outline" size={20} color="#444" />
        </TouchableOpacity>
      </View>
      <Text style={mainStyles.text}>{props.note.content}</Text>
    </TouchableOpacity>
  )
}

const mainStyles = StyleSheet.create({
  dateWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingTop: 5,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    color: '#444',
    fontFamily: 'Merriweather',
    fontSize: 16,
  }
})

const pageStyles = StyleSheet.create({
  wrapper: {
    padding: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    borderRadius: 5,
    alignSelf: 'stretch'
  }
})

const modalStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    alignSelf: 'stretch'
  }
})

export default Note