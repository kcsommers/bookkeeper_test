import {createBottomTabNavigator} from 'react-navigation'

import ProfileView from '../views/ProfileView'
import SearchView from '../views/SearchView'
import SearchResultsView from '../views/SearchResultsView'
import BottomTabs from '../components/BottomTabs'

const BottomTabNavigator = createBottomTabNavigator({
  Search: SearchView,
  Profile: ProfileView,
  SearchResults: SearchResultsView
}, {
  tabBarComponent: BottomTabs
})

export default BottomTabNavigator