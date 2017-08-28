/**
 * Created by sumanthu on 28/08/17.
 */
import React from 'react'
import { Router, Scene, ActionConst, Actions, DefaultRenderer } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Login from '../Login/login'
import Repos from '../Components/Repos'
import Commits from '../Components/commits'

const Scenes = Actions.create(
    <Scene key="Main">
        <Scene
            key='login'
            component={Login}
            hideNavBar={true}
            title="Login"
            initial/>
        <Scene
            key='Repos'
            component={Repos}
            hideNavBar={true}
        title = "My Repos"/>
        <Scene
            key='Commits'
            component={Commits}
            hideNavBar={true}
            title = "My Commits"/>
    </Scene>



)



const ConnectedRouter = connect()(Router);

const RouterComponent = () => {
    return (
        <ConnectedRouter scenes={Scenes} />
    );
};

export default RouterComponent;