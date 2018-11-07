import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'

const Banner = (props) => {
  return (
    <View>
      <Image 
        source={{uri: props.image}}
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

export default Banner