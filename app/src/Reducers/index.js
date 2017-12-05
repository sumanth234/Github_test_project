/**
 * Created by sumanthu on 28/08/17.
 */
import { ActionConst } from 'react-native-router-flux';
import { combineReducers } from 'redux';
import * as Types from '../Actions/types'
const INITIALSTATE = {
    loginSuccessData :[],
    loginFailureData : [],
    loginType:false,
    repoSuccessData : [],
    repoFailureData : [],
    repoType : true ,
    commitSuccessData : [],
    commitFailureData : [],
    commitType : true,
    issueSuccessData: [],
    issueFailureData: [],
    issueType: true,
    starSuccessData: [],
    starFailureData: [],
    starType: true ,
    followerSuccessData: [],
    followerFailureData: [],
    followerType: true ,
    followingSuccessData: [],
    followingFailureData: [],
    followingType: true ,

}
const sceneReducer = (state = {}, {type, scene}) => {
    switch(type){
        case ActionConst.FOCUS:
            return { ...state, scene };
        default:
            return state;
    }
}
const loginReducer = (state = INITIALSTATE, {type,payload}) => {
    switch(type){
        case Types.LOGIN_SUCCESS:
            return { ...state, loginSuccessData: payload ,loginType:true}
        case Types.LOGIN_FAILURE:
            return { ...state, loginFailureData:payload,loginType:false}
        default:
            return state
    }
}
const repoReducer = (state = INITIALSTATE, {type,payload}) => {
    switch(type){
        case Types.REPO_ABLETO_GETDATA:
            return { ...state, repoSuccessData: payload ,repoType:false}
        case Types.REPO_UNABLETO_GETDATA:
            return { ...state, repoFailureData:payload,repoType:true}
        default:
            return state
    }
}
const commitReducer = (state = INITIALSTATE, {type,payload}) => {
    switch(type){
        case Types.COMMIT_ABLETO_GETDATA:
            return { ...state, commitSuccessData: payload ,commitType:false}
        case Types.COMMIT_UNABLETO_GETDATA:
            return { ...state, commitFailureData:payload,commitType:true}
        default:
            return state
    }
}
const issueReducer = (state = INITIALSTATE, {type,payload}) => {
    switch(type){
        case Types.ISSUE_ABLETO_GETDATA:
            return { ...state, issueSuccessData: payload ,issueType:false}
        case Types.ISSUE_UNABLETO_GETDATA:
            return { ...state, issueFailureData:payload,issueType:true}
        default:
            return state
    }
}
const starReducer = (state = INITIALSTATE, {type,payload}) => {
    switch(type){
        case Types.STAR_ABLETO_GETDATA:
            return { ...state, starSuccessData: payload ,starType:false}
        case Types.STAR_UNABLETO_GETDATA:
            return { ...state, starFailureData:payload,starType:true}
        default:
            return state
    }
}
const followerReducer = (state = INITIALSTATE, {type,payload}) => {
    switch(type){
        case Types.FOLLOWER_ABLETO_GETDATA:
            return { ...state, followerSuccessData: payload ,followerType:false}
        case Types.FOLLOWER_UNABLETO_GETDATA:
            return { ...state, followerFailureData:payload,followerType:true}
        default:
            return state
    }
}
const followingReducer = (state = INITIALSTATE, {type,payload}) => {
    switch(type){
        case Types.FOLLOWING_ABLETO_GETDATA:
            return { ...state, followingSuccessData: payload ,followingType:false}
        case Types.FOLLOWING_UNABLETO_GETDATA:
            return { ...state, followingFailureData:payload,followingType:true}
        default:
            return state
    }
}


export default combineReducers({
    scene:sceneReducer,
    loginLib:loginReducer,
    repoLib:repoReducer,
    commitLib:commitReducer,
    issueLib:issueReducer,
    starLib:starReducer,
    followerLib:followerReducer,
    followingLib:followingReducer,
})
