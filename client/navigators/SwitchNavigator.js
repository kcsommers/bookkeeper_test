import {createBottomTabNavigator} from 'react-navigation'
import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'
import IntroView from '../views/IntroView'

const SwitchNavigator = createBottomTabNavigator({
  Intro: IntroView,
  App: AppNavigator,
  Auth: AuthNavigator
}, {
  initialRouteName: 'Intro',
  navigationOptions: {
    tabBarVisible: false
  }
})

export default SwitchNavigator