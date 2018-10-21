import {createBottomTabNavigator} from 'react-navigation'

import ProfileView from '../views/ProfileView'
import SearchView from '../views/SearchView'
import SearchResultsView from '../views/SearchResultsView'
import ListView from '../views/ListView'
import BookView from '../views/BookView'
import ClubView from '../views/ClubView'
import BottomTabs from '../components/BottomTabs'

const BottomTabNavigator = createBottomTabNavigator({
  Search: SearchView,
  Profile: ProfileView,
  SearchResults: SearchResultsView,
  List: ListView,
  Book: BookView,
  Club: ClubView
}, {
  tabBarComponent: BottomTabs
})

export default BottomTabNavigator