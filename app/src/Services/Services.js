/**
 * Created by sumanthu on 28/08/17.
 */
import { NetInfo, Alert } from 'react-native';

NetInfo.isConnected.fetch().then(isConnected => {
    console.log('First, is ' + (isConnected ? 'online' : 'offline'));
});
import base64 from 'base-64'
//let base64 = require('base-64');
const BASE_URL = 'https://api.github.com/'
function handleFirstConnectivityChange(isConnected) {
    console.log('Then, is ' + (isConnected));

    if (isConnected === false) {
        Alert.alert(
            'No Internet Connection',
            'Please check your connection and try again.',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        )
    }
}
NetInfo.isConnected.addEventListener(
    'change',
    handleFirstConnectivityChange
);

class Services {
    constructor(){
        this.datastack = {
        }
    }
    setUsername(username){
        this.datastack.username = username
    }
    getUsername(){
        return this.datastack.username
    }
    setRepoName(repoName){
        this.datastack.repoName = repoName
    }
    getRepoName(){
        return this.datastack.repoName
    }
    setRepoBranch(repoBranch){
        this.datastack.repoBranch = repoBranch
    }
    getRepoBranch(){
        return this.datastack.repoBranch
    }
    setPassword(password){
        this.datastack.password = password
    }
    getPassword(){
        return this.datastack.password
    }
    setLoginName(login){
        this.datastack.loginName = login
    }
    getLoginName(){
        return this.datastack.loginName
    }
    getUserLoggedIn(uri, type = "GET",username,password) {
        var encodedAuth = base64.encode(username + ":" + password)
        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + encodedAuth);
        //console.log(BASE_URL + uri)
        return fetch(BASE_URL + uri, {
            method: type,
            timeout: 3000,
            headers:headers
        }).then(this.getStatus)
            .then(this.parseJson)
    }
    getUserRepos(uri, type = "GET",username,password) {
        var encodedAuth = base64.encode(username + ":" + password)
        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + encodedAuth);
        console.log(BASE_URL + uri )
        return fetch(BASE_URL + uri, {
            method: type,
            timeout: 3000,
            headers:headers
        }).then(this.getStatus)
            .then(this.parseJson)
    }
    getUserRepoCommits(uri, type = "GET",username,password) {
        var encodedAuth = base64.encode(username + ":" + password)
        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + encodedAuth);
        console.log(BASE_URL + uri)
        return fetch(BASE_URL + uri, {
            method: type,
            timeout: 3000,
            headers:headers
        }).then(this.getStatus)
            .then(this.parseJson)
    }
    getUserRepoIssues(uri, type = "GET",username,password) {
            var encodedAuth = base64.encode(username + ":" + password)
            var headers = new Headers();
            headers.append('Authorization', 'Basic ' + encodedAuth);
            console.log(BASE_URL + uri)
            return fetch(BASE_URL + uri, {
                method: type,
                timeout: 3000,
                headers:headers
            }).then(this.getStatus)
                .then(this.parseJson)
    }
    getUserStars(uri, type = "GET",username,password) {
            var encodedAuth = base64.encode(username + ":" + password)
            var headers = new Headers();
            headers.append('Authorization', 'Basic ' + encodedAuth);
            console.log(BASE_URL + uri)
            return fetch(BASE_URL + uri, {
                method: type,
                timeout: 3000,
                headers:headers
            }).then(this.getStatus)
                .then(this.parseJson)
    }
    getUserFollowers(uri, type = "GET",username,password) {
            var encodedAuth = base64.encode(username + ":" + password)
            var headers = new Headers();
            headers.append('Authorization', 'Basic ' + encodedAuth);
            console.log(BASE_URL + uri)
            return fetch(BASE_URL + uri, {
                method: type,
                timeout: 3000,
                headers:headers
            }).then(this.getStatus)
                .then(this.parseJson)
    }
    getUserFollowing(uri, type = "GET",username,password) {
            var encodedAuth = base64.encode(username + ":" + password)
            var headers = new Headers();
            headers.append('Authorization', 'Basic ' + encodedAuth);
            console.log(BASE_URL + uri)
            return fetch(BASE_URL + uri, {
                method: type,
                timeout: 3000,
                headers:headers
            }).then(this.getStatus)
                .then(this.parseJson)
    }
    getHTML(uri,type="GET"){
        return fetch(uri, {
            method: type,
            timeout: 3000,
        }).then(this.getStatus)
            .then(this.parseJson)
    }
}

export default new Services()