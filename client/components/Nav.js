import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Nav extends React.Component {
  constructor(props) {
    super(props) 
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress(link) {
    console.log(this.props)
  }

  render() {
    return (
      <View style={styles.navWrapper}>
        <Icon style={{marginLeft: 20}} name="ellipsis-v" size={25} color="#fff" />
        <Text style={styles.title}>Bookkeeper</Text>
        <TouchableOpacity onPress={() => this.handlePress('Profile')}>
          <Icon style={{marginRight: 20}} name="user-circle" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navWrapper: {
    alignSelf: 'stretch',
    backgroundColor: '#1c4b44',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 60
  },
  title: {
    color: '#fff',
    fontFamily: 'Pacifico',
    fontSize: 20,
  },
})