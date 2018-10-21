import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

const Post = (props) => {
  return (
    <View style={styles.container}>
      <Text>{props.post.content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})

export default Post