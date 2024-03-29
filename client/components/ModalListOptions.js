import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontIcon from 'react-native-vector-icons/FontAwesome'


class ModalListOptions extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity 
          style={styles.modalOption} 
          onPress={() => {this.props.triggerEditForm('list', this.props.list)}}>

          <FontIcon name="edit" size={25} color="#444" />
          <Text style={styles.optionText}>
            Change List Name
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.modalOption} 
          onPress={this.props.onDelete}>
          <MaterialIcon name="delete" size={25} color="#444" />
          <Text style={styles.optionText}>
            Delete List
          </Text>
        </TouchableOpacity>
      </View>
        
    )
  }
}

const styles = StyleSheet.create({
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  optionText: {
    fontFamily: 'Merriweather',
    fontSize: 16,
    paddingLeft: 15
  }
})

export default ModalListOptions