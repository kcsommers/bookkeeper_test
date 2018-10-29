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
        source={{uri: 'https://res.cloudinary.com/kcsommers/image/upload/v1530509212/lflbvvr8kjmgae9suzov.jpg'}}
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