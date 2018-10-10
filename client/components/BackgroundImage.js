import React from 'react'
import {Image, StyleSheet} from 'react-native'


export default class BackgroundImage extends React.Component {
  render() {
    return (
      <Image source={this.props.image} style={styles.imageStyles} height="100%" width="100%" />
    )
  }
}

const styles = StyleSheet.create({
  imageStyles: {
    position: 'absolute',
    zIndex: -1000,
  }
})