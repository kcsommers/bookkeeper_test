import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from 'react-native-modal' 

import {addList} from '../actions/listsActions'
import {connect} from 'react-redux'

import AddForm from './AddForm'

class AddList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.updateStore = this.updateStore.bind(this)
  }

  toggleModal() {
    this.setState({modalVisible: !this.state.modalVisible})
  }

  updateStore(data) {
    if(!data.err) {
      this.props.addList(data.list)
    }

    this.toggleModal()
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
            <AddForm
              onSubmit={(data) => {this.updateStore(data)}} 
              data={{
                formFields: [{
                  field: 'name',
                  placeholder: 'List Name',
                  value: ''
                }, {
                  field: 'description',
                  placeholder: 'List Description',
                  value: ''
                }],
                modelFields: [
                  {
                    type: 'userId',
                    value: this.props.user.id
                  }
                ],
                httpData: {
                  url: 'http://localhost:3000/lists',
                  method: 'post'
                }
              }} />
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15
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

const mapStateToProps = state => ({user: state.authUser})
const mapActionsToProps = {addList} 

export default connect(mapStateToProps, mapActionsToProps)(AddList)
