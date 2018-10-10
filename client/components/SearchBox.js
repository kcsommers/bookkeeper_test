import React from 'react'
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View ,
  TouchableOpacity
} from 'react-native'


export default class SearchBox extends React.Component {
  render() {
    let mainText = ''
    let subText = ''

    switch(this.props.page) {
      case 'searchBooks':
        mainText = 'Search books by title, author or isbn',
        subText = ''
        break;
      case 'searchClubs': 
        mainText = 'Find clubs',
        subText = 'Enter a title to find out who\'s discussing the books on your lists'
        break;
      case 'searchUsers':
        mainText = 'Find fellow readers',
        subText = 'Enter a title to find out who else is reading the books on your lists'
    }

    return (
      <View style={styles.container}>
        <Text style={styles.mainText}>{mainText}</Text>
        <Text style={styles.subText}>{subText}</Text>
        <TextInput style={styles.input} />
        <TouchableOpacity style={styles.submit}>
          <Text style={styles.submitText}>Search</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 300,
    borderRadius: 5,
    paddingTop: 30,
    paddingBottom: 30,
    paddingRight: 20,
    paddingLeft: 20
  },
  mainText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#1c4b44',
    fontFamily: 'Merriweather'

  },
  subText: {
    color: '#888888',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Merriweather'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    marginTop: 10,
    marginBottom: 15,
    padding: 5,
    fontSize: 20
  },
  submit: {
    backgroundColor: '#c13149',
    width: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    borderRadius: 5
  },
  submitText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#fff',
    fontSize: 20
  }
})