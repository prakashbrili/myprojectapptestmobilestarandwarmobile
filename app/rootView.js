import React from 'react';

import Login from './containers/login';
import Home from './containers/home';
import SearchPlanets from './components/searchPlanets';

import { StackNavigator } from 'react-navigation';

const Navigation = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        },
    },
    Home: {
        screen: Home,
        /*navigationOptions: {
            header: null,
        },*/
    },
    SearchPlanets: {
        screen: SearchPlanets,
        /*navigationOptions: {
            header: null,
        },*/
    },
});

export default Navigation;