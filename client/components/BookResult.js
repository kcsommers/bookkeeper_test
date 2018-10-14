import React from 'react'
import {
  StyleSheet, 
  View, 
  Text, 
  Image,
  TouchableOpacity
} from 'react-native'
import {Dropdown} from 'react-native-material-dropdown'

const listNames = ['Books I\'ve Read', 'Books I\'d like to read']

class BookResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedList: listNames[0]
    }

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(selectedList) {
    this.setState({selectedList})
  }

  render() {
    let data = listNames.map(value => ({value}))
    const book = this.props.book
    const volumeInfo = book.volumeInfo
    const textSnippet = (book.searchInfo) ? book.searchInfo.textSnippet : ''
    return(
      <View style={styles.bookWrapper}>
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <Image 
            style={styles.thumbnail} 
            source={{uri: volumeInfo.imageLinks.smallThumbnail}}
            resizeMode="contain" />
          <View style={{flex: 1}}>
            <Text style={styles.title}>{volumeInfo.title}</Text>
            <Text style={styles.authors}>{volumeInfo.authors[0]}</Text>
            <Text style={styles.description}>{textSnippet}</Text>
          </View>
        </View>
        <View>
          <Dropdown 
            data={data} 
            label="Select List"
            value={this.state.selectedList}
            onChangeText={(list) => {this.handleSelect(list)}} />
          <TouchableOpacity style={styles.button}>
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

export default BookResult