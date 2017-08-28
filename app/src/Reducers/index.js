/**
 * Created by sumanthu on 20/08/17.
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
    repoType : false ,
    commitSuccessData : [],
    commitFailureData : [],
    commitType : false
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
            return { ...state, repoSuccessData: payload ,repoType:true}
        case Types.REPO_UNABLETO_GETDATA:
            return { ...state, repoFailureData:payload,repoType:false}
        default:
            return state
    }
}
const commitReducer = (state = INITIALSTATE, {type,payload}) => {
    switch(type){
        case Types.COMMIT_ABLETO_GETDATA:
            return { ...state, commitSuccessData: payload ,commitType:true}
        case Types.COMMIT_UNABLETO_GETDATA:
            return { ...state, commitFailureData:payload,commitType:false}
        default:
            return state
    }
}


export default combineReducers({
    scene:sceneReducer,
    loginLib:loginReducer,
    repoLib:repoReducer,
    commitLib:commitReducer
})
