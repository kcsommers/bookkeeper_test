import React from 'react'
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FoundationIcon from 'react-native-vector-icons/Foundation'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const IconBtn = (props) => {
  let button
  switch(props.name) {
    case 'notebook':
      button = <SimpleLineIcon name={props.name} size={props.iconSize} color={props.iconColor} />
      break
    case 'quote':
      button = <FoundationIcon name={props.name} size={props.iconSize} color={props.iconColor} />
      break
    case 'options':
      button = <SimpleLineIcon name={props.name} size={props.iconSize} color={props.iconColor} />
      break
    case 'backburger':
      console.log(props.name)
      button = <MaterialIcon name={props.name} size={props.iconSize} color={props.iconColor} />
      break

  }


  
  return (
    <TouchableOpacity 
      style={[styles.wrapper, props.circleSize, {backgroundColor: props.backgroundColor}]} 
      onPress={props.onPress}>
      {button}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
  }
})

export default IconBtn