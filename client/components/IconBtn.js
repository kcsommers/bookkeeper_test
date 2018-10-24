import React from 'react'
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FoundationIcon from 'react-native-vector-icons/Foundation'

const IconBtn = (props) => {
  let button
  switch(props.name) {
    case 'note':
      button = <SimpleLineIcon name={props.name} size={25} color={props.iconColor} />
      break
    case 'quote':
      button = <FoundationIcon name={props.name} size={25} color={props.iconColor} />
      break
    case 'options':
      button = <SimpleLineIcon name={props.name} size={25} color={props.iconColor} />
  }


  
  return (
    <TouchableOpacity 
      style={[styles.wrapper, {backgroundColor: props.backgroundColor}]} 
      onPress={props.onPress}>
      {button}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#71a7a9',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
  }
})

export default IconBtn