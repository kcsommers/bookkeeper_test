import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from 'react-native-modal'
import ListForm from './ListForm'

class AddList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState({modalVisible: !this.state.modalVisible})
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.wrapper} onPress={this.toggleModal}>
          <Icon name="plus" size={25} color="#1b9ce2" />
        </TouchableOpacity>
        <Modal 
          isVisible={this.state.modalVisible}
          onBackdropPress={this.toggleModal}
        >
          <View style={styles.modalWrapper}>
            <ListForm 
              listData={{name: '', description: ''}} 
              toggleModal={this.toggleModal}
              isNew={true} />
          </View>
        </Modal>
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
  },
  modalWrapper: {
    backgroundColor: '#f1f3ee',
    padding: 30,
    borderRadius: 5
  }
})

export default AddList
