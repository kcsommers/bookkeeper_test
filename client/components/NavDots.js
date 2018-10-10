import React from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class NavDots extends React.Component{
  render() {
    let dots = []
    for(let i = 0; i < this.props.dots; i++) {
      if(i === this.props.active) {
        dots.push(<Icon style={[styles.dots, styles.active]} name="circle" size={15} key={i} />)
      }
      else {
        dots.push(<Icon style={[styles.dots]} name="circle" size={15} key={i} />)
      }
    }
    return (
      <View style={{
        flexDirection: 'row',
      }}>
        {dots}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dots: {
    marginLeft: 5, 
    marginRight: 5,
    color: "rgba(255, 255, 255, 0.5)" 
  },
  active: {
    color: '#fff'
  }
})