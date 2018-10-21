import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image
} from 'react-native'
import {connect} from 'react-redux'
import {setFormData} from '../formFunctions.js'

import {addPost} from '../actions/clubsActions'

import bg1 from '../assets/images/page_backgrounds/bg1.jpg'
import Banner from '../components/Banner'
import AddForm from '../components/AddForm'
import Post from '../components/Post'

class ClubView extends React.Component {
  constructor(props) {
    super(props)
    this.updateStore = this.updateStore.bind(this)
    this.getClubFromStore = this.getClubFromStore.bind(this)
  }

  updateStore(data) {
    this.props.addPost(data.post)
  }

  getClubFromStore(clubId) {
    const clubIndex = this.props.clubs.findIndex((clubObj) => clubObj.id === clubId)
    return this.props.clubs[clubIndex]
  }

  render() {
    const club = this.getClubFromStore(this.props.navigation.getParam('clubId'))
    const posts = club.posts.map((post, i) => <Post post={post} key={i} />)
    const members = club.users.map((user, i) => (
      <Image 
        source={require('../assets/images/profileImg.jpg')}
        style={styles.memberImg}
        key={i}
      />
    ))
    const formData = setFormData('post', {clubId: club.id, userId: this.props.user.id})
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Banner image={bg1} />

        <View style={styles.clubDetails}>
          <Image source={{uri: club.bookImg}} style={styles.clubImg} />
          <Text style={[styles.name, styles.text]}>{club.name}</Text>
          <Text style={[styles.description, styles.text]}>{club.description}</Text>
        </View>

        <View style={styles.membersWrapper}>
          {members}
        </View>

        <View style={styles.postsWrapper}>
          {posts}
        </View>
        <AddForm data={formData} onSubmit={(data) => {this.updateStore(data)}} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
  text: {
    fontFamily: 'Merriweather',
    textAlign: 'center'
  },
  clubDetails: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  clubImg: {
    width: 130,
    height: 200,
    marginTop: -150
  },
  name: {

  },
   description: {

   },
   memberImg: {
     width: 100,
     height: 100,
     borderRadius: 50
   }
})

const mapStateToProps = (state) => ({
  user: state.authUser,
  clubs: state.clubs
})

const mapActionsToProps = {addPost}

export default connect(mapStateToProps, mapActionsToProps)(ClubView)