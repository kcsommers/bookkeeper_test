import React from 'react'
import App from './App';
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {Font} from 'expo'
import authUserReducer from './reducers/authUserReducer'
import listsReducer from './reducers/listsReducer'
import searchResultsReducer from './reducers/searchResultsReducer'
import orientationReducer from './reducers/orientationReducer'

const allReducers = combineReducers({
  authUser: authUserReducer,
  lists: listsReducer,
  searchResults: searchResultsReducer,
  orientation: orientationReducer
})

const store = createStore(allReducers, {
  orientation: 'portrait'
})

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: false
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Merriweather': require('./assets/fonts/Merriweather-Regular.ttf'),
      'Pacifico': require('./assets/fonts/Pacifico-Regular.ttf')
    })
    this.setState({fontsLoaded: true})
  }

  render() {
    return (this.state.fontsLoaded) ? (
      <Provider store={store}>
        <App />
      </Provider>
    ) : null
  }
}

export default Index