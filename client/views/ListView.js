import React from 'react'
import {
  View,
  Text
} from 'react-native'

class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: this.props.navigation.getParam('list', {})
    }
  }

  render() {
    const list = this.state.list
    return (
      <View>
        <Text>{list.name}</Text>
      </View>
    )
  }
}

export default ListView