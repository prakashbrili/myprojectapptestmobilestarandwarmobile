import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import RootView from './app/rootView'
export default class starwars extends Component {
  render() {
    return (
      <RootView />
    );
  }
}

AppRegistry.registerComponent('starwars', () => starwars);
