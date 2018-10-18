import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'

const BookView = (props) => {
  return (
    <View>
      <Image 
        source={props.image}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  }
})

export default BookView