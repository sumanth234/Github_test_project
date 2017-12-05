/**
 * Created by sumanthu on 28/08/17.
 */
import React,{ Component } from 'react'
import {StyleSheet,TextInput,Text,View,TouchableOpacity,Dimensions,ScrollView,Alert,ListView,PixelRatio,ActivityIndicator,Linking,Platform,Image} from 'react-native'
import Button from '../../ReusableComponents/Button';
import Services from '../../Services/Services'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { getFollowers } from'../../Actions/index'
import * as _ from 'lodash'
var deviceWidth = Dimensions.get('window').width
class ProfilePage extends Component {
    constructor(props){
        super(props)
        this.state = ({
            showProgress:true,
            avatarSource:null
        })

    }
    componentDidMount(){
        this.setState({
            avatarSource:this.props.data.avatar_url
        })
        this.props.getFollowers(Services.getUsername(),Services.getPassword(),this.props.data.name)
    }
    render() {
        var createdDate = this.props.data.created_at ;
        var months = [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];
        var today = new Date(createdDate);
        var dd = today.getDate();
        var mm = months[today.getMonth()]; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        }
        var date = dd + " " + mm + ", " + yyyy
        return (
            <View style={{flex: 1}}>
                <View style={styles.header}>
                    <Image source={require('../../../img/header_background.png')} style={styles.headerImage}>
                        <View style={styles.backButtonView}>
                            <TouchableOpacity onPress={()=>Actions.pop()} >
                                <Image source={require('../../../img/back_button.png')} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.headerTextView}>
                            <Text style={styles.headerText}>My Profile</Text>
                        </View>

                        <View style={styles.rightButton}>
                            <TouchableOpacity onPress={() => this.onPressDone()} >

                            </TouchableOpacity>
                        </View>
                    </Image>
                </View>
                <View style={{justifyContent:'flex-end',alignItems:'flex-end'}}><TouchableOpacity onPress={()=>{

                    Linking.canOpenURL('https://github.com/' +Services.getLoginName()+ '?tab=followers').then(supported => {
                        if (supported) {
                            Linking.openURL('https://github.com/' +Services.getLoginName()+ '?tab=followers');
                        } else {
                            console.log('Don\'t know how to open URI: https://github.com/' +Services.getLoginName()+ '?tab=followers');
                        }
                    });
                    }}><Text style = {{color:'rgb(21,147,204)',padding:10,textDecorationLine: "underline",}}>Switch to Desktop Version</Text></TouchableOpacity></View>
                {this.props.followerType?

                    <View >
                        <ActivityIndicator
                            animating={this.state.showProgress}
                            style={styles.loader}
                            size="large"
                        />
                    </View>
                    :
                    <ScrollView >
                        <View style={styles.container}>
                            <TouchableOpacity style={{position:'relative'}}>
                                <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
                                    {this.state.avatarSource === null ? <Text>Select a Photo</Text> :
                                        <Image style={styles.avatar} source={{uri:this.state.avatarSource}} />
                                    }
                                </View>
                                {this.state.avatarSource === null?<View/>:<Text style={styles.editStyle}>Edit</Text>}
                            </TouchableOpacity>
                            <Text style={{fontSize:16,fontWeight:'bold',alignSelf:'center',padding:5}}>{this.props.data.name}</Text>
                            <Text style={{fontSize:16,alignSelf:'center',padding:5}}>{this.props.data.email}</Text>
                            <Text style={{fontSize:16,alignSelf:'center',padding:5}}>{this.props.data.location}</Text>
                        </View>
                        <Text style={{fontSize:16,fontWeight:'bold',alignSelf:'flex-start',padding:5}}>{this.props.data.bio}</Text>
                        <Text style={{fontSize:16,fontWeight:'bold',alignSelf:'flex-start',padding:5}}>{"Created on "}{date}</Text>
                    </ScrollView>
                }</View>



        );
    }
}

const styles = StyleSheet.create({
    mainButton:{
        borderWidth:2,
        borderColor:'black',
        borderRadius:12,
        justifyContent: 'center',
        alignItems: 'center',
        height:150,
        padding:10,
        margin:10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    avatarContainer: {

        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        top:10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150
    },
    editStyle:{
        position:'absolute',
        bottom:30,
        left:65,
        color:'rgb(242,113,32)',
        fontWeight:'bold',
        fontSize:13
    },
    header:{
        flexDirection: 'row',
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
        borderBottomWidth:2,
        borderRadius:2,
        borderColor:"black",
        padding:10
    },
    forgotOpacityStyle:{

    }
})

const mapDispatchToProps = dispatch => {
    return ({
        getFollowers(username, password, name) { getFollowers(dispatch, username, password, name) },
    })
}

const mapStateToProps = ({  loginLib }) => {
    console.log("...state", loginLib)
    const {loginSuccessData,loginFailureData,loginType} = loginLib
    return {loginSuccessData,loginFailureData,loginType}

}
export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage)