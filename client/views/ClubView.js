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

import Modal from 'react-native-modal'
import ModalContent from '../components/ModalContent'
import Banner from '../components/Banner'
import AddForm from '../components/AddForm'
import Post from '../components/Post'
import IconBtn from '../components/IconBtn'

class ClubView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      modalData: null
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleModalTrigger = this.handleModalTrigger.bind(this)
    this.updateStore = this.updateStore.bind(this)
    this.getClubFromStore = this.getClubFromStore.bind(this)
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal, modalData: null})
  }

  handleModalTrigger(modalData) {
    this.setState({modalData, showModal: true})
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
    if(club) {
      const optionsBtn = (club.admin === this.props.user.username) ?
      <View style={styles.clubOptionsWrapper}>
        <IconBtn 
          name="options"
          backgroundColor='#fff'
          iconColor="#444"
          iconSize={20}
          circleSize={{width: 40, height: 40, borderRadius: 20}}
          onPress={() => {
            this.handleModalTrigger({type: 'club-options', club})
          }}
        />
      </View> : ''

      const posts = club.posts.map((post, i) => (
        <View style={{marginBottom: 15}} key={i}>
          <Post post={post} key={i} /> 
        </View>
      ))
      const members = club.users.map((user, i) => (
        <Image 
          source={require('../assets/images/profileImg.jpg')}
          style={styles.memberImg}
          key={i}
        />
      ))
      const formData = setFormData('post', {clubId: club.id, user: this.props.user})
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <Banner image={club.imgUrl} />

          <View style={styles.wrapper}>
            <View style={styles.clubDetails}>
              <Image source={{uri: club.bookImg}} style={styles.clubImg} />
              <Text style={[styles.name, styles.text]}>{club.name}</Text>
              <Text style={[styles.description, styles.text]}>{club.description}</Text>

              {optionsBtn}            
            </View>

            <View style={styles.membersWrapper}>
              <Text style={styles.header}>Club Members</Text>
              {members}
            </View>

            <View style={styles.postsWrapper}>
              <Text style={styles.header}>Club Posts</Text>
              {posts}
            </View>
            <AddForm data={formData} onSubmit={(data) => {this.updateStore(data)}} />
          </View>

          <Modal
            isVisible={this.state.showModal}
            onBackdropPress={this.toggleModal}>

            <ModalContent 
              data={this.state.modalData}
              toggleModal={() => {this.toggleModal()}}
            />
          </Modal>
        </ScrollView>
      )
    }
    else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 15,
    paddingRight: 15
  },
  text: {
    fontFamily: 'Merriweather',
    textAlign: 'center'
  },
  header: {
    fontFamily: 'Merriweather',
    fontSize: 22,
    marginBottom: 15,
    marginTop: 20
  },
  clubOptionsWrapper: {
    position: 'absolute',
    left: 0,
    top: 15,
    zIndex: 100
  },
  clubDetails: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  clubImg: {
    width: 130,
    height: 200,
    marginTop: -150,
    borderWidth: 2,
    borderColor: '#fff'
  },
  name: {
    fontSize: 25,
    color: '#1c4b44',
    marginTop: 10,
    marginBottom: 10
  },
   description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 25
   },
   memberImg: {
     width: 60,
     height: 60,
     borderRadius: 30,
     borderWidth: 2,
     borderColor: '#fff'
   }
})

const mapStateToProps = (state) => ({
  user: state.authUser,
  clubs: state.clubs
})

const mapActionsToProps = {addPost}

export default connect(mapStateToProps, mapActionsToProps)(ClubView)