import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import SearchBooks from '../components/SearchBooks'
import SearchUsers from '../components/SearchUsers'
import SearchClubs from '../components/SearchClubs'
import NavDots from '../components/NavDots'

export default class SearchView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeDot: 0,
      currentOffset: 0
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll(e) {
    const newOffset = e.nativeEvent.targetContentOffset.x
    if(newOffset > this.state.currentOffset) {
      this.setState({
        activeDot: this.state.activeDot + 1,
        currentOffset: newOffset
      })
    }
    else if(newOffset < this.state.currentOffset) {
      this.setState({
        activeDot: this.state.activeDot - 1,
        currentOffset: newOffset
      })
    }
  }

  render() {
    return (
      <View style={{flex: 1, position: 'relative'}}>
        <ScrollView 
          horizontal={true} 
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}
          onScrollEndDrag={this.handleScroll}>
          <SearchBooks />
          <SearchUsers />
          <SearchClubs />
        </ScrollView>
        <View style={styles.navDotsWrapper}>
          <NavDots dots={3} active={this.state.activeDot} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navDotsWrapper: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{translateX: -30}]
  }
})