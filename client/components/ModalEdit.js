import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import {connect} from 'react-redux'
import {withNavigation} from 'react-navigation'

import {
  updateBook,
  updateList
} from '../actions/listsActions'

import {setUpdateFormData} from '../formFunctions'
import AddForm from './AddForm'

class ModalEdit extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      formData: null
    }
    this.updateStore = this.updateStore.bind(this)
  }

  updateStore(data) {
    const type = this.props.type
    const item = this.props.data.item
    let listId
    switch(type) {
      case 'book':
        listId = item.listsBooks.listId
        this.props.updateBook(data, listId)
        this.props.navigation.navigate('Book', {bookId: item.id, listId} )
        break
      case 'list':
        this.props.updateList(data)
        break

    }

    this.props.toggleModal()

  }

  componentWillMount() {
    const formData = setUpdateFormData(this.props.type, this.props.data.item)
    this.setState({formData})
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <AddForm 
          data={this.state.formData}
          onSubmit={(data) => {this.updateStore(data)}}
          itemId={this.props.data.item.id} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {

  }
})

const mapStateToProps = (state) => ({

})

const mapActionsToProps = {updateBook, updateList}

export default withNavigation(connect(mapStateToProps, mapActionsToProps)(ModalEdit))