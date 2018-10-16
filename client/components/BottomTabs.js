import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity
 } from 'react-native'
 import Icon from 'react-native-vector-icons/FontAwesome';

export default class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress(page) {
    this.props.navigation.navigate(page)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.icon} onPress={() => {this.handlePress('Search')}}>
          <Icon name="search" size={25} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => {this.handlePress('Profile')}}>
          <Icon name="user-circle" size={25} color="#888" />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    borderTopWidth: 1,
    borderTopColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    margin: 10
  }
})