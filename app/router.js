import React, { Component } from 'react';

import Login from './containers/login';
import Home from './containers/home';
import SearchPlanets from './components/searchPlanets';

import { StackNavigator, NavigationActions} from 'react-navigation';


const routeConfig = {
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        },
    },
    Home: {
        screen: Home,
        navigationOptions: {
            header: null,
        },
    },
    SearchPlanets: {
        screen: SearchPlanets,
        navigationOptions: {
            header: null,
        },
    },
};

const stackNavConfig = {
    headerMode: 'screen',
    initialRouteName : "Login"
};

export const Navigation = StackNavigator(routeConfig, stackNavConfig);
