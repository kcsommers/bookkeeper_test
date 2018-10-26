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
import {addClub} from '../actions/clubsActions'
import ModalBookOptions from './ModalBookOptions'
import ModalListOptions from './ModalListOptions'
import ModalClubOptions from './ModalClubOptions'
import AddForm from './AddForm'
import ModalNotes from './ModalNotes'
import ModalQuotes from './ModalQuotes'
import ModalEdit from './ModalEdit'
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
    this.triggerEditForm = this.triggerEditForm.bind(this)
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
        this.props.addClub(newData.club)
        this.props.navigation.navigate('Club', {clubId: newData.club.id})
        break
    }
    this.props.toggleModal()
  }

  confirm(type) {
    this.setState((prevState) => ({
      modalData: {...prevState.modalData, type: `confirm-${type}`}
    }))
  }

  triggerEditForm(type, item) {
    this.setState((prevState) => ({
      formType: type,
      modalData: {...prevState.modalData, type: 'edit', item, book: null}
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
      case 'book-options':
        display = <ModalBookOptions 
                    book={modalData.book}
                    triggerForm={(type) => {this.triggerForm(type)}}
                    triggerEditForm={(type, item) => {
                      this.triggerEditForm(type, item)
                    }}
                    toggleModal={() => {this.props.toggleModal()}}
                    onDelete={() => {this.confirm('delete-book')}} />
        break
      case 'list-options':
        display = <ModalListOptions 
                    list={modalData.list}
                    triggerEditForm={(type, item) => {
                      this.triggerEditForm(type, item)
                    }}
                    toggleModal={() => {this.props.toggleModal()}}
                    onDelete={() => {this.confirm('delete-list')}}
        />
        break
      case 'club-options':
        display = <ModalClubOptions 
                    club={modalData.club}
                    triggerEditForm={(type, item) => {
                      this.triggerEditForm(type, item)
                    }}
                    toggleModal={() => {this.props.toggleModal()}}
                    onDelete={() => {this.confirm('delete-club')}}
        />
        break
      case 'form':
        display = <AddForm 
                    data={this.state.formData}
                    onSubmit={(data) => {this.updateStore(data)}} />
        break
      case 'edit':
        display = <ModalEdit 
                    type={this.state.formType}
                    toggleModal={() => {this.props.toggleModal()}} 
                    data={modalData} />
        break
      case 'confirm-delete-book':
        display = <ModalConfirm 
                    type="delete-book" 
                    data={modalData}
                    toggleModal={() => {this.props.toggleModal()}} />
        break
      case 'confirm-delete-list':
        display = <ModalConfirm 
                    type="delete-list" 
                    data={modalData}
                    toggleModal={() => {this.props.toggleModal()}} />
        break
      case 'confirm-delete-club':
        display = <ModalConfirm 
                    type="delete-club" 
                    data={modalData}
                    toggleModal={() => {this.props.toggleModal()}} />
        break
    }
    return (
      <View style={[styles.container, modalData.modalStyle]}>
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
  addQuote,
  addClub
}

export default withNavigation(connect(mapStateToProps, mapActionsToProps)(ModalContent))