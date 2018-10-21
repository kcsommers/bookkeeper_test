import React from 'react'
import {
  StyleSheet, 
  View, 
  Text, 
  Image,
  TouchableOpacity
} from 'react-native'
import {withNavigation} from 'react-navigation'
import axios from 'axios'
import {Dropdown} from 'react-native-material-dropdown'
import {connect} from 'react-redux'
import {addBook} from '../actions/authUserActions'
import missingBookCover from '../assets/images/missingBookCover.jpg'

class BookResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedList: this.props.lists[0].name,
      message: ''
    }

    this.handleSelect = this.handleSelect.bind(this)
    this.addToList = this.addToList.bind(this)
  }

  handleSelect(selectedList) {
    this.setState({selectedList})
    console.log(this.state.selectedList)
  }

  async addToList(book) {
    const bookData = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors.join(', '),
      description: book.searchInfo.textSnippet,
      imgUrl: (book.volumeInfo.imageLinks) 
              ? book.volumeInfo.imageLinks.smallThumbnail : '',
      banner: '',
      userId: this.props.authUser.id
    }
    const list = this.props.lists.find((listObj) => listObj.name === this.state.selectedList)
    const url = 'http://localhost:3000/books'
    const results = await axios.post(url, {bookData, list})
    if(!results.data.err) {
      this.props.addBook(results.data.book, list.id)
      this.props.navigation.navigate('Profile')
    }
    else {
      console.log('ERROR ADDING BOOK', err)
    }
  }

  render() {
    let data = this.props.lists.map(list => ({value: list.name}))
    const book = this.props.book
    const volumeInfo = book.volumeInfo
    const authors = (volumeInfo.authors) ? volumeInfo.authors.join(', ') : ''
    const textSnippet = (book.searchInfo) ? book.searchInfo.textSnippet : ''
    const imgSrc = (volumeInfo.imageLinks) ? 
    {uri: volumeInfo.imageLinks.smallThumbnail} : missingBookCover

    return(
      <View style={styles.bookWrapper}>
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <Image 
            style={styles.thumbnail} 
            source={imgSrc}
            resizeMode="contain" />
          <View style={{flex: 1}}>
            <Text style={styles.title}>{volumeInfo.title}</Text>
            <Text style={styles.authors}>{authors}</Text>
            <Text style={styles.description}>{textSnippet}</Text>
          </View>
        </View>
        <View>
          <Dropdown 
            data={data} 
            label="Select List"
            value={this.state.selectedList}
            onChangeText={(list) => {this.handleSelect(list)}} />
          <TouchableOpacity onPress={() => {this.addToList(book)}} style={styles.button}>
            <Text style={styles.btnText}>Add to List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText}>Search Readers</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bookWrapper: {
    padding: 15,
    marginTop: 15,
    marginBottom: 15
  },
  title: {
    fontFamily: 'Merriweather',
    fontSize: 20
  },
  authors: {
    fontFamily: 'Merriweather',
    fontSize: 18
  },
  description: {
    fontFamily: 'Merriweather',
    fontSize: 16
  },
  thumbnail: {
    width: 130,
    height: 200,
    marginRight: 10
  },
  button: {
    backgroundColor: '#71a7a9',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    marginTop: 5,
    marginBottom: 5
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20
  }
})

const mapStateToProps = (state) => ({authUser: state.authUser, lists: state.lists})
const mapActionsToProps = {addBook}
export default withNavigation(connect(mapStateToProps, mapActionsToProps)(BookResult))