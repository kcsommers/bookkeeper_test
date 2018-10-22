import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import Modal from 'react-native-modal'
import Button1 from './Button1'
import Icon from 'react-native-vector-icons/FontAwesome';

import {handleDelete} from '../formFunctions.js'

class DeleteBtn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      modalContent: ''
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal})
  }

  confirmDelete() {
    this.setState({
      showModal: true
    })
  }

  render() {
    const button = (this.props.type === 'button') ? 
    <Button1 
      color="#c13149" 
      text="Delete"
      onPress={() => {this.confirmDelete()}} />
    :
    <TouchableOpacity onPress={() => {this.confirmDelete()}}>
      <Icon name="trash" size={25} color="#c13149" />
    </TouchableOpacity>

    return (
      <View style={{alignSelf: 'stretch', alignItems: 'center'}}>
        {button}

        <Modal
          isVisible={this.state.showModal}
          onBackdropPress={this.toggleModal}>
          <View style={styles.modalWrapper}>
            <Text>Are you sure?</Text>
            <Button1 
              color="#c13149"
              text="Confirm Delete"
              onPress={() => {
                this.toggleModal()
                handleDelete(this.props.data, this.props.onDelete)
              }} />
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modalWrapper: {

  }
})

export default DeleteBtn