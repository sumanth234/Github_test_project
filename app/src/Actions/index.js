/**
 * Created by sumanthu on 28/08/17.
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
            console.log("Rep",result)
            if(result.status >=200 && result.status<=300){
                return result.json()
            }else  if (result.status == 401){
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
export const getIssues = (dispatch, username = "",password = "",name = "") => {
    Services.getUserRepoIssues("repos/" + Services.getLoginName() + "/" + name + "/issues", 'GET', Services.getUsername(), Services.getPassword())
        .then(result => {
            if (result.status >= 200 && result.status <= 300) {
                //console.log(result.json())
                return result.json()

            } else if (result.status == 401) {
                //Alert.alert("Please enter valid credentials")
                dispatch({
                    type: Types.ISSUE_UNABLETO_GETDATA,
                    payload: []
                })
            }


        }).then(data => {
        console.log("Issues Result", data);
        dispatch({
            type: Types.ISSUE_ABLETO_GETDATA,
            payload: data
        })
    })
        .catch((err => {
            console.log("error", err)
            // Alert.alert("Please try again later")
            dispatch({
                type: Types.ISSUE_UNABLETO_GETDATA,
                payload: err
            })
        }))
}
export const getStars = (dispatch, username = "",password = "",name = "") => {
    Services.getUserStars("users/" + Services.getLoginName() + "/starred", 'GET', Services.getUsername(), Services.getPassword())
        .then(result => {
            console.log("starResult",result)
            if (result.status >= 200 && result.status <= 300) {
                //console.log(result.json())
                return result.json()

            } else if (result.status == 401) {
                //Alert.alert("Please enter valid credentials")
                dispatch({
                    type: Types.STAR_UNABLETO_GETDATA,
                    payload: []
                })
            }


        }).then(data => {
        console.log("stars Result", data);
        dispatch({
            type: Types.STAR_ABLETO_GETDATA,
            payload: data
        })
    })
        .catch((err => {
            console.log("error", err)
            // Alert.alert("Please try again later")
            dispatch({
                type: Types.STAR_UNABLETO_GETDATA,
                payload: err
            })
        }))
}
export const getFollowers = (dispatch, username = "",password = "",name = "") => {
    Services.getUserFollowers("users/" + Services.getLoginName() + "/followers", 'GET', Services.getUsername(), Services.getPassword())
        .then(result => {
            console.log("followerResult",result)
            if (result.status >= 200 && result.status <= 300) {
                //console.log(result.json())
                return result.json()

            } else if (result.status == 401) {
                //Alert.alert("Please enter valid credentials")
                dispatch({
                    type: Types.FOLLOWER_UNABLETO_GETDATA,
                    payload: []
                })
            }


        }).then(data => {
        console.log("followers Result", data);
        dispatch({
            type: Types.FOLLOWER_ABLETO_GETDATA,
            payload: data
        })
    })
        .catch((err => {
            console.log("error", err)
            // Alert.alert("Please try again later")
            dispatch({
                type: Types.FOLLOWER_UNABLETO_GETDATA,
                payload: err
            })
        }))
}
export const getFollowing = (dispatch, username = "",password = "",name = "") => {
    Services.getUserFollowing("users/" + Services.getLoginName() + "/following", 'GET', Services.getUsername(), Services.getPassword())
        .then(result => {
            console.log("followingResult",result)
            if (result.status >= 200 && result.status <= 300) {
                //console.log(result.json())
                return result.json()

            } else if (result.status == 401) {
                //Alert.alert("Please enter valid credentials")
                dispatch({
                    type: Types.FOLLOWING_UNABLETO_GETDATA,
                    payload: []
                })
            }


        }).then(data => {
        console.log("following Result", data);
        dispatch({
            type: Types.FOLLOWING_ABLETO_GETDATA,
            payload: data
        })
    })
        .catch((err => {
            console.log("error", err)
            // Alert.alert("Please try again later")
            dispatch({
                type: Types.FOLLOWING_UNABLETO_GETDATA,
                payload: err
            })
        }))
}