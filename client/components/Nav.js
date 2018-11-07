import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  Image,
  TouchableOpacity,
  AsyncStorage 
} from 'react-native'
import {withNavigation} from 'react-navigation'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import SideNavigator from '../navigators/SideNavigator';

class Nav extends React.Component {
  constructor(props) {
    super(props) 
    this.handlePress = this.handlePress.bind(this)
  }

  _logout = async () => {
    try {
      await AsyncStorage.removeItem('bookkeeperToken')
      this.props.navigation.navigate('Login')
    }
    catch(err) {
      console.log("ERROR REMOVING TOKEN", err)
    }
  }

  handlePress(link) {
    console.log(this.props)
  }

  render() {
    return (
      <View style={styles.navWrapper}>
        <TouchableOpacity onPress={this._logout}>
          <Icon style={{marginLeft: 20}} name="ellipsis-v" size={25} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.title}>Bookkeeper</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate('Create', {header: 'Profile'})
          // this.props.navigation.toggleDrawer()
        }}>
          <Image source={require('../assets/images/profileImg.jpg')} style={styles.userImg} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navWrapper: {
    alignSelf: 'stretch',
    backgroundColor: '#1c4b44',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 60
  },
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
    borderColor: '#fff',
    borderWidth: 2
  },  
  title: {
    color: '#fff',
    fontFamily: 'Pacifico',
    fontSize: 20,
  },
})

const mapStateToProps = (state) => ({
  user: state.authUser
})

export default withNavigation(connect(mapStateToProps)(Nav))