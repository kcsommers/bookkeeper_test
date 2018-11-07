import React from 'react';
import {createDrawerNavigator} from 'react-navigation'
import CreateView from '../views/CreateView';

const SideNavigator = createDrawerNavigator({
  Edit: CreateView
})

export default SideNavigator