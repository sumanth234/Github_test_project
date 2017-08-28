/**
 * Created by sumanthu on 28/08/17.
 */
import React,{ Component } from 'react'
import {StyleSheet,TextInput,Text,View,TouchableOpacity,Dimensions,Alert,ActivityIndicator,Image,Platform} from 'react-native'
import Button from '../ReusableComponents/Button'
import { Actions } from 'react-native-router-flux'
var deviceWidth = Dimensions.get('window').width
import AuthService from './AuthService'
//var GitHub = require('github-api');
import Services from '../Services/Services'
import { connect } from 'react-redux';
import { LoggedIn } from '../Actions'
class Login extends Component {
    constructor(props){
        super(props)
        this.state = ({
            username : "",
            password : "",
            isLoggedIn:false,
            checkingAuth:true,
            showProgress:false,
            showData:[],
        })
    }
    componentDidMount(){
        AuthService.getAuthInfo((err,authInfo,zippedObj,usernam,passwd)=>{
            console.log("usernam",usernam)
            console.log("passwd",passwd)
            this.setState({
                checkingAuth:false,
                isLoggedIn:authInfo!=null,
                showData:zippedObj,
                username:usernam,
                password:passwd
            })

        });
    }
    onLoginPressed(){
        //Services.setUsername(this.state.username);
        //Services.setPassword(this.state.password)
        if(this.state.username == ""){
            Alert.alert("Please Enter username")
            return
        }
        if(this.state.password == ""){
            Alert.alert("Please Enter password")
            return
        }
        console.log('Attempting to log in with username  '+this.state.username);
        this.setState({
            showProgress:true
        });

        var authService = require('./AuthService');

        authService.login({
            username:this.state.username,password:this.state.password
        },(result)=>{
            console.log("Auth Res",result)
            this.setState(Object.assign({
                showProgress:false},result));
            if(result.zippedResult){
                this.setState({
                    showData:result.zippedResult
                })
            }
            if(result.username && result.password){
                Services.setUsername(result.username);
                Services.setPassword(result.password);
            }
            if(result.success && this.onLogin){
                this.onLogin();

            }
        })


    }
    onLogin(){
        console.log('successfully logged in, can show different view');
        /*    setTimeout(() => this.setState({isLoggedIn: true}), 3000);*/
        this.setState({isLoggedIn: true});


    }
    /*onFormSubmit(){
        Services.setUsername(this.state.username);
        Services.setPassword(this.state.password)
        if(this.state.username == ""){
            Alert.alert("Please Enter username")
            return
        }
        if(this.state.password == ""){
            Alert.alert("Please Enter password")
            return
        }
        this.props.LoggedIn(this.state.username,this.state.password)
        if(this.props.loginType == false){
            Alert.alert("Please enter valid credentials")
        }else{
            Services.setLoginName(this.props.loginSuccessData.login)
            Actions.Repos({data:this.props.loginSuccessData});
        }
        //if(this.props.loginData)
            //console.log(this.state.username )
            //console.log(this.state.password)
        /!*Services.getUserLoggedIn("user",'GET',this.state.username,this.state.password)
        //Services.getUserLoggedIn("user",'GET',"karthikg1643@gmail.com","naruto@8123807576")
            .then(result =>{
                //console.log("Login Result",result)
                if(result.status >=200 && result.status<=300){
                    return result.json();

                }else  if (result.status == 401){
                    Alert.alert("Please enter valid credentials")
                }


            }).then(data => {
            console.log("Login Result",data) ;
            Services.setLoginName(data.login)
            Actions.Repos({data:data});
        })
            .catch((err => {
                console.log("error",err)
                Alert.alert("Please enter valid credentials")
            }))*!/
    }*/
    render(){
        if(this.state.checkingAuth){
            return(
                <View style={styles.container}>
                    <ActivityIndicator
                        animating={this.state.checkingAuth}
                        style={styles.loader}
                        size="large"
                    />
                </View>
            );
        }
        if(this.state.isLoggedIn){
            Services.setUsername(this.state.username);
            Services.setPassword(this.state.password)
            data1 = JSON.parse(this.state.showData.user)
            console.log("Res",data1)
            Services.setLoginName(data1.login)
            Actions.Repos({data:data1});
            return (
                <View >

                </View>
            );
        }
        if(!this.state.isLoggedIn){
            return (
                <View style={{flex:1}}>
                    <View style={styles.header}>
                        <Image source={require('../../img/header_background.png')} style={styles.headerImage}>
                            <View style={styles.backButtonView}>
                            </View>

                            <View style={styles.headerTextView}>
                                <Text style={styles.headerText}>Login</Text>
                            </View>

                            <View style={styles.rightButton}>
                            </View>
                        </Image>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'row',paddingTop:20,justifyContent:'center',alignItems:'center'}}>
                            <Image source={require('../../img/Octocat.png')} style={styles.logo}/>
                        </View>
                        <View style={{flexDirection:'row',paddingTop:20}}>
                            <Text style ={styles.textStyle}>EMAIL</Text>
                            <TextInput  style ={styles.textInputStyle} placeholder="Please Enter Email"  value={this.state.username} onChangeText= {(text)=>this.setState({username:text})} />

                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style ={styles.textStyle}>Password</Text>
                            <TextInput  style ={styles.textInputStyle} placeholder="Please Enter Password"  value={this.state.password} onChangeText= {(text)=>this.setState({password:text})} />
                        </View>
                        <TouchableOpacity onPress={() => Alert.alert("This is not under requirement and hence not Implemented")}>
                            <Text style ={styles.forgotTextStyle}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity onPress={() => this.onLoginPressed()} style = {styles.buttonOpacityStyle}>
                                <Text style={styles.buttonTextStyle}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex:4}}></View>
                    <ActivityIndicator
                        animating={this.state.showProgress}
                        style={styles.loader}
                        size="large"
                    />
                </View>

            );
        }
    }
}

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#077CE5',
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0,
        elevation: 2,
        width:deviceWidth,
    },
    headerImage :{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: deviceWidth,
        marginTop: (Platform.OS === 'ios') ? 15 : 0,
    },
    backButtonView: {
        flex:1,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    headerTextView: {
        flex:3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText : {
        fontSize:18,
        color: '#fff'
    },
    rightButton : {
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    buttonTextStyle:{
        alignSelf:'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight:'600',
        paddingTop:10,
        paddingBottom:10
    },
    loader:{
        marginTop:20
    },
    logo:{
        width:100,
        height:90,
    },
    buttonOpacityStyle:{
        marginTop:20,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft:5,
        marginRight:5
    },
    textStyle:{
        flex:1,
        fontSize:16,
        color:'black',
        padding:10
    },
    forgotTextStyle:{
        fontSize:16,
        color:'rgb(21,147,204)',
        padding:10,
        textDecorationLine: "underline",
    },
    textInputStyle:{
        flex:2,
        fontSize:16,
        color:'black',
        padding:10
    },
})

const mapDispatchToProps = dispatch => {
    return ({
            LoggedIn(username, password) { LoggedIn(dispatch, username, password) }
        })
}

const mapStateToProps = ({  loginLib }) => {
     console.log("...state", loginLib)
    const {loginSuccessData,loginFailureData,loginType} = loginLib
    return {loginSuccessData,loginFailureData,loginType}

}
export default connect(mapStateToProps,mapDispatchToProps)(Login)
