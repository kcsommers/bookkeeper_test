import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import {connect} from 'react-redux'
import {setFormData} from '../formFunctions'
import {withNavigation} from 'react-navigation'
import{
  addList, 
  deleteList, 
  deleteBook, 
  updateBook, 
  addNote, 
  addQuote
} from '../actions/listsActions'
import ModalOptions from './ModalOptions'
import AddForm from './AddForm'
import ModalNotes from './ModalNotes'
import ModalQuotes from './ModalQuotes'
import ModalConfirm from './ModalConfirm'

class ModalContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalData: this.props.data,
      formData: null,
      formType: ''
    }
    this.triggerForm = this.triggerForm.bind(this)
  }

  updateStore(newData) {
    let bookId, listId
    switch(this.state.formType) {
      case 'list':
        this.props.addList(newData.list)
        break
      case 'note':
        bookId = this.state.modalData.book.id
        listId = this.state.modalData.book.listsBooks.listId
        this.props.addNote(newData.note, bookId, listId)
        break
      case 'quote': 
        bookId = this.state.modalData.book.id
        listId = this.state.modalData.book.listsBooks.listId
        this.props.addQuote(newData.quote, bookId, listId)
        break
      case 'club-start':
        this.props.navigation.navigate('Club')
        break
    }
    this.props.toggleModal()
  }

  confirm(type) {
    this.setState((prevState) => ({
      modalData: {...prevState.modalData, type: `confirm-${type}`}
    }))
  }

  triggerForm(type) {
    const formData = setFormData(type, 
      {
        book: this.state.modalData.book, 
        user: this.props.user
      })
      
    this.setState((prevState) => ({
      formData, 
      formType: type,
      modalData: {...prevState.modalData, type: 'form'}
    }))
  }

  componentWillMount() {
    if(this.state.modalData.type === 'list') {
      this.triggerForm('list')
    }
  }

  render() {
    const modalData = this.state.modalData
    let display = ''
    switch(modalData.type) {
      case 'notes':
        display = <ModalNotes book={modalData.book} />
        break
      case 'quotes':
        display = <ModalQuotes book={modalData.book} />
        break
      case 'options':
        display = <ModalOptions 
                    book={modalData.book}
                    triggerForm={(type) => {this.triggerForm(type)}}
                    toggleModal={() => {this.props.toggleModal()}}
                    onDelete={() => {this.confirm('delete-book')}} />
        break
      case 'form':
        display = <AddForm 
                    data={this.state.formData}
                    onSubmit={(data) => {this.updateStore(data)}} />
        break
      case 'confirm-delete-book':
        display = <ModalConfirm type="delete-book" />
        break
    }
    return (
      <View style={styles.container}>
        {display}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15
  }
})

const mapStateToProps = (state) => ({
  user: state.authUser
})

const mapActionsToProps = {
  addList, 
  deleteList, 
  deleteBook, 
  updateBook, 
  addNote, 
  addQuote
}

export default withNavigation(connect(mapStateToProps, mapActionsToProps)(ModalContent))