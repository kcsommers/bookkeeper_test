import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class Nav extends React.Component {
  render() {
    return (
      <View style={styles.footerWrapper}>
        <View>
          <Text style={{color: '#fff', fontFamily: 'Merriweather'}}>Developed by M Kacy Sommers</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  footerWrapper: {
    backgroundColor: '#333',
    minHeight: 60,
    borderTopWidth: 1,
    borderTopColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }
})