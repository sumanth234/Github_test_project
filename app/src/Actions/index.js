/**
 * Created by sumanthu on 21/08/17.
 */
import Services from '../Services/Services';
import {Alert} from 'react-native'
import * as Types from './types';
import * as _ from 'lodash'


export const LoggedIn = (dispatch, username = "",password = "") => {
    var APIData = []
    Services.getUserLoggedIn("user", 'GET', username, password)
    //Services.getUserLoggedIn("user",'GET',"karthikg1643@gmail.com","naruto@8123807576")
        .then(result => {
            //console.log("Login Result",result)
            if (result.status >= 200 && result.status <= 300) {
                return result.json();

            } else if (result.status == 401) {
                dispatch({
                    type: Types.LOGIN_FAILURE,
                    payload: []
                })
            }


        }).then(data => {
        console.log("Login Result", data);
        dispatch({
            type: Types.LOGIN_SUCCESS,
            payload: data
        })
    })
        .catch((err => {
            console.log("error", err)
            dispatch({
                type: Types.LOGIN_FAILURE,
                payload: err
            })
        }))
}

export const getRepos = (dispatch, username = "",password = "") => {
    Services.getUserRepos("users/" + Services.getLoginName() + "/repos",'GET',username,password)
        .then(result =>{
            if(result.status >=200 && result.status<=300){
                return result.json()
                console.log("Repos Result",result.json()) ;
            }else  if (result.status == 401){
                //Alert.alert("Please enter valid credentials")
                dispatch({
                    type: Types.REPO_UNABLETO_GETDATA,
                    payload: []
                })
            }


        }).then(data => {
        console.log("Repos Result",data) ;
        dispatch({
            type: Types.REPO_ABLETO_GETDATA,
            payload: data
        })
    })
        .catch((err => {
            dispatch({
                type: Types.REPO_UNABLETO_GETDATA,
                payload: err
            })
            console.log("error",err)
            Alert.alert("Please try again later")
        }))
};
export const getCommits = (dispatch, username = "",password = "",name = "") => {
    Services.getUserRepoCommits("repos/" + Services.getLoginName() + "/" + name + "/commits", 'GET', Services.getUsername(), Services.getPassword())
        .then(result => {
            if (result.status >= 200 && result.status <= 300) {
                //console.log(result.json())
                return result.json()

            } else if (result.status == 401) {
                //Alert.alert("Please enter valid credentials")
                dispatch({
                    type: Types.COMMIT_UNABLETO_GETDATA,
                    payload: []
                })
            }


        }).then(data => {
        console.log("Commits Result", data);
        dispatch({
            type: Types.COMMIT_ABLETO_GETDATA,
            payload: data
        })
    })
        .catch((err => {
            console.log("error", err)
           // Alert.alert("Please try again later")
            dispatch({
                type: Types.COMMIT_UNABLETO_GETDATA,
                payload: err
            })
        }))
}