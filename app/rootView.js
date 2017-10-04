import React, { Component } from 'react';

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducer';
import thunkMiddleware from 'redux-thunk';
import { Navigation } from './router';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

export default class rootView extends  Component{
    render(){
        return(
            <Provider store={store}>
                <Navigation />
            </ Provider>

        )
    }
}

