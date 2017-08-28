/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Router from './app/src/Router/Router'
import Login from './app/src/Login/login'
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './app/src/Reducers'
const testGitProj = () =>{
    return (
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <Router/>
        </Provider>
    )
};

AppRegistry.registerComponent('testGitProj', () => testGitProj);
