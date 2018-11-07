import React from 'react'
import {
  View, 
  Text,
  TextInput,
  StyleSheet
} from 'react-native'
import {connect} from 'react-redux'
import {updateUser} from '../actions/authUserActions'

import AddForm from '../components/AddForm'
import {setFormData} from '../formFunctions'


class CreateView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: null
    }
  }

  updateStore = (newData) => {
    switch(newData.type) {
      case 'user': 
        this.props.updateUser(newData.miscData.userId, newData.newData)
        this.props.navigation.navigate('Profile', {user: this.props.user})
    }
  }
  
  componentDidMount() {
    this.setState({
      formData: setFormData('user', {user: this.props.user})
    })
  }

  render() {
    const header = this.props.navigation.getParam('header')
    if(this.state.formData) {
      return (
        <View style={styles.container}>
          <Text>{header}</Text>
          <AddForm 
            onSubmit={(newData) => {this.updateStore(newData)}}
            data={this.state.formData}
          />
        </View>
      )
    }
    else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  
})

mapStateToProps = (state) => ({
  user: state.authUser
})

mapActionsToProps = {updateUser}

export default connect(mapStateToProps, mapActionsToProps)(CreateView)