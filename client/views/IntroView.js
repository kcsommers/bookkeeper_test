import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import bookLogo from '../assets/images/bookLogo.png'
import LoadingIcon from '../components/LoadingIcon'

class IntroView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bookkeeper</Text>
        <Image resizeMode="contain" style={styles.logo} source={bookLogo}  />
        <View style={{alignItems: 'center'}}>
          <LoadingIcon />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#71a7a9'
  },
  title: {
    fontFamily: 'Pacifico',
    color: '#fff',
    fontSize: 40,
    textAlign: 'center'
  },
  logo: {
    width: '30%',
    height: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    marginBottom: 10
  },
  loadingIcon: {
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

export default IntroView