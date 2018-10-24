import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import {withNavigation} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal'
import ModalOption from './ModalOption'

import {connect} from 'react-redux'

import AddForm from './AddForm'
import Button1 from './Button1'
import IconBtn from './IconBtn'

import {setFormData} from '../formFunctions.js'

class OptionsBtn extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      modalFormData: null,
      showModalForm: false,
      formType: ''
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.updateStore = this.updateStore.bind(this)
    this.setFormData = this.setFormData.bind(this)
  }

  toggleModal() {
    if(this.state.showModalForm) {
      this.setState({showModalForm: false})
    }
    else {
      this.setState({showModal: !this.state.showModal})
    }
  }

  updateStore(data) {
    if(!data.err) {
      this.props.navigation.navigate('Club', {club: data.club})
    }
    this.setState({showModalForm: false, showModal: false})
  }

  setFormData(type) {
    const data = {
      user: this.props.user,
      book: this.props.book,
    }
    const formData = setFormData(type, data)
    this.setState({modalFormData: formData, showModalForm: true, formType: type})
  }

  render() {
    let modalContent = (!this.state.showModalForm) ?
    <View style={styles.modalOptionsWrapper}>
      <ModalOption 
        text="Search Clubs"
        onPress={() => {this.setFormData('club-search')}} />
      <ModalOption 
        text="Start Club"
        onPress={() => {this.setFormData('club-start')}} />
    </View>
    :
    <AddForm 
      data={this.state.modalFormData}
      onSubmit={(data) => {this.updateStore(data)}}
     />

    return (
      <View style={styles.container}>
        <IconBtn 
          name="options"
          backgroundColor="#fff"
          iconColor="#444" 
          onPress={this.toggleModal} />

        <Modal 
          isVisible={this.state.showModal}
          onBackdropPress={this.toggleModal}>
          <View style={styles.modalWrapper}>
            <View style={styles.headerWrapper}>
              <TouchableOpacity 
                onPress={this.toggleModal}
                style={styles.headerClose}>
                <Icon style={{marginLeft: 20}} name="times" size={25} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerText}>{this.props.book.title}</Text>
            </View>
            {modalContent}
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch'
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: '#f1f3ee',
    padding: 30,
    borderRadius: 5
  },
  modalOptionsWrapper: {
    flex: 1
  },
  headerWrapper: {
    backgroundColor: '#71a7a9',
    paddingTop: 15,
    paddingBottom: 15
  },
  headerClose: {
    position: 'absolute',
    right: 15,
    top: 10,
    zIndex: 100
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#fff'
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.authUser,
    lists: state.lists
  }
}

const mapActionsToProps = {}

export default withNavigation(connect(mapStateToProps, mapActionsToProps)(OptionsBtn))