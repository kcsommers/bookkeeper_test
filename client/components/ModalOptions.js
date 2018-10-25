import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native'
import {withNavigation} from 'react-navigation'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateBook} from '../actions/listsActions'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

class ModalOptions extends React.Component {

  toggleCurrentRead(book) {
    book.current = !book.current
  } 

  render() {
    const book = this.props.book
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.modalOption} onPress={() => {
          this.toggleCurrentRead(book)
        }}>
          <MaterialIcon name="book-open-page-variant" size={25} color="#444" />
          <Text style={styles.optionText}>
            {(book.current) ? "Finished!" : "Set as Current Read"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalOption} onPress={() => {
          this.props.triggerForm('note')
        }}>
          <MaterialIcon name="note-multiple-outline" size={25} color="#444" />
          <Text style={styles.optionText}>Add Note</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalOption} onPress={() => {
          this.props.triggerForm('quote')
        }}>
          <MaterialIcon name="format-quote-open" size={25} color="#444" />
          <Text style={styles.optionText}>Add Quote</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalOption} onPress={() => {
          this.triggerAddForm()
        }}>
          <MaterialIcon name="search-web" size={25} color="#444" />
          <Text style={styles.optionText}>Search Clubs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalOption} onPress={() => {
          this.props.triggerForm('club-start')
        }}>
          <MaterialIcon name="bookmark-plus-outline" size={25} color="#444" />
          <Text style={styles.optionText}>Start a Club</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalOption} onPress={this.props.onDelete}>
          <MaterialIcon name="delete" size={25} color="#444" />
          <Text style={styles.optionText}>Remove From List</Text>
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

const mapStateToProps = (state) => ({
  lists: state.lists,
  user: state.authUser
})

const mapActionsToProps = {updateBook}

export default withNavigation(connect(mapStateToProps, mapActionsToProps)(ModalOptions))