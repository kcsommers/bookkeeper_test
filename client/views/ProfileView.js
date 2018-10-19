import React from 'react'
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  Text, 
  TextInput,
  TouchableOpacity,
  Image
 } from 'react-native'
 import axios from 'axios'
 import {connect} from 'react-redux'
 import {setAuthUser, addList} from '../actions/authUserActions'
 import List from '../components/List'
 import AddList from '../components/AddList'
 import profileImg from '../assets/images/profileImg.jpg'

class ProfileView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listName: ''
    }
    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeText(text) {
    this.setState({listName: text})
  }

  async handleSubmit() {
    const url = 'http://localhost:3000/lists'
    const list = {
      name: this.state.listName,
      userId: this.props.user.id
    }
    const results = await axios.post(url, list)
    if(!results.data.err) {
      this.props.addList(results.data.list)
    }
  }

  render() {
    const user = this.props.user
    const lists = this.props.lists.map((list, i) => <List list={list} key={i} />)
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.userIntro}>
          <View style={styles.userIntroWrapper}>
            <Image source={profileImg} style={styles.profileImg}/>
            <Text style={styles.userName}>{user.username}</Text>
          </View>
        </View>
        <View style={styles.listsContainer}>
          <Text style={styles.listHeader}>My Lists</Text>
          {lists}
        </View>
        <AddList />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },  
  userIntro: {
    backgroundColor: '#1c4b44',
  },
  userIntroWrapper: {
    position: 'relative',
    alignItems: 'center',
    top: 70
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    fontFamily: 'Merriweather',
    fontSize: 24,
    marginTop: 10
  },
  listsContainer: {
    paddingTop: 85
  },
  listHeader: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Merriweather',
    marginBottom: 15
  }
})

const mapStateToProps = state => ({user: state.authUser, lists: state.lists})
const mapActionsToProps = {setAuthUser, addList} 
export default connect(mapStateToProps, mapActionsToProps)(ProfileView)