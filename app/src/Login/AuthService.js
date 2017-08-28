/**
 * Created by sumanthu on 28/08/17.
 */
import buffer from 'buffer';

import {AsyncStorage} from 'react-native';
import _ from 'lodash';

const authKey='auth';
const userKey='user';
const usernameKey='uname';
const passwordKey='pwd';

class AuthService {

    getAuthInfo(cb){

        AsyncStorage.multiGet([authKey,userKey,usernameKey,passwordKey],(error,val)=>{
            if(error){
                return cb(error);
            }
            if(!val){
                return cb();
            }

            console.log('val',val);

            var zippedObj =_.fromPairs(val);
            console.log('zippedObj',zippedObj);

            if(!zippedObj[authKey]){
                return cb();
            }

            var authInfo= {
                header:{
                    Authorization:"Basic "+zippedObj[authKey]
                },
                user:JSON.parse(zippedObj[userKey])
            }
            var usernam = zippedObj[usernameKey]
            var passwd =  zippedObj[passwordKey]

            return cb(null,authInfo,zippedObj,usernam,passwd);
        })
    }

    login (creds,cb){
        var b=new buffer.Buffer(creds.username+':'+creds.password);

        var encodedAuth=b.toString('base64');
        console.log('base64',encodedAuth);

        fetch('https://api.github.com/user',{
            headers:{
                'Authorization' :'Basic '+encodedAuth
            }
        })

            .then((response)=>{
                console.log('status ',response);
                if(response.status >=200 && response.status<=300){
                    return response;
                }

                throw{
                    badCredentials:response.status ==401,
                    UnknownError: response.status != 401,
                    success:false
                }
            })
            .then((response)=>{
                console.log(response);
                return response.json()
            })
            .then((result)=>{
                console.log('result',result);
                AsyncStorage.multiSet([
                    [authKey,encodedAuth],
                    [userKey,JSON.stringify(result)],
                    [usernameKey,creds.username],
                    [passwordKey,creds.password]

                ],(err)=>{
                    if(err){
                        throw err;
                    }
                    return cb({success:true});

                })
                data = {user:JSON.stringify(result)}
                return cb({zippedResult:data,username:creds.username,password:creds.password})

            })
            .catch((error)=>{

             return cb(error);
            })
            .finally(()=>{
                cb({
                    showProgress:false,
                });
            })
    }
}

module.exports = new AuthService();