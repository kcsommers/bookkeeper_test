import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import {withNavigation} from 'react-navigation'

const Club = (props) => {
  const club = props.club
  return (
    <TouchableOpacity style={styles.wrapper} onPress={() => {props.navigation.navigate('Club', {clubId: club.id})}}>
     <View>
        <Image 
          source={{uri: club.bookImg}}
          style={styles.img} />
      </View>
      <View style={styles.clubInfo}>
        <Text style={[styles.text, styles.clubName]}>{club.name}</Text>
        <Text style={[styles.text, styles.clubTopic]}>{club.topic}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
  },
  clubInfo: {
    justifyContent: 'center',
    flex: 1
  },
  text: {
    fontFamily: 'Merriweather',
    textAlign: 'center'
  },
  clubName: {
    fontSize: 18
  },
  clubTopic: {
    fontSize: 16
  },
  img: {
    width: 85,
    height: 131
  }
})

export default withNavigation(Club)