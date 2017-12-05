/**
 * Created by sumanthu on 28/08/17.
 */
import React from 'react'
import { Router, Scene, ActionConst, Actions, DefaultRenderer } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Login from '../Login/login'
import Home from '../Components/Home'
import Profile from '../Components/Repo/profile'
import Repos from '../Components/Repo/Repos'
import RepoPage from '../Components/Repo/RepoPage'
import RepoCodePage from '../Components/Repo/RepoCodePage'
import Commits from '../Components/Repo/commits'
import Issues from '../Components/Repo/issues'
import Stars from '../Components/Repo/stars'
import Followers from '../Components/Repo/followers'
import Following from '../Components/Repo/following'

const Scenes = Actions.create(
    <Scene key="Main">
        <Scene
            key='login'
            component={Login}
            hideNavBar={true}
            title="Login"
            initial
             />
        <Scene
            key='Home'
            component={Home}
            hideNavBar={true}
            title = "Home"
            />
        <Scene
            key='RepoCodePage'
            component={RepoCodePage}
            hideNavBar={true}
            title = "RepoCode Page"
            />
        <Scene
            key='RepoPage'
            component={RepoPage}
            hideNavBar={true}
            title = "Repo Page"
            />
        <Scene
            key='Profile'
            component={Profile}
            hideNavBar={true}
            title = "My Profile"/>
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
        <Scene
                key='Issues'
                component={Issues}
                hideNavBar={true}
                title = "My Issues"/>
        <Scene
                key='Stars'
                component={Stars}
                hideNavBar={true}
                title = "My Starred Repos"/>
        <Scene
                key='Followers'
                component={Followers}
                hideNavBar={true}
                title = "My Followers"/>
        <Scene
                key='Following'
                component={Following}
                hideNavBar={true}
                title = "Following"/>
    </Scene>



)



const ConnectedRouter = connect()(Router);

const RouterComponent = () => {
    return (
        <ConnectedRouter scenes={Scenes} />
    );
};

export default RouterComponent;