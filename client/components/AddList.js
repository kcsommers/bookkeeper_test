import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

class AddList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.wrapper}>
          <Icon name="plus" size={25} color="#1b9ce2" />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  wrapper: {
    borderWidth: 1,
    borderColor: '#444',
    borderStyle: 'dashed',
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
})

export default AddList
