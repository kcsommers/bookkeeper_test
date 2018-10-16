import {createStackNavigator} from 'react-navigation'
import BottomTabNavigator from './BottomTabNavigator'

const AppNavigator = createStackNavigator({
  Tabs: BottomTabNavigator
})

export default AppNavigator