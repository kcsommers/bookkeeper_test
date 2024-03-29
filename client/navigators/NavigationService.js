import NavigationActions from 'react-navigation'
let navigator

const setTopLevelNavigator = (navigatorRef) => {
  console.log('HELLOP', navigatorRef)
  navigator = navigatorRef
}

const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigatorActions.navigate({routeName})
  )
} 

export default {setTopLevelNavigator, navigate}