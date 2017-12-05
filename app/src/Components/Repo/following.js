/**
 * Created by sumanthu on 28/08/17.
 */
import React,{ Component } from 'react'
import {StyleSheet,TextInput,Text,View,TouchableOpacity,Dimensions,ScrollView,Alert,ListView,ActivityIndicator,Linking,Platform,Image} from 'react-native'
import Button from '../../ReusableComponents/Button';
import Services from '../../Services/Services'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { getFollowing } from'../../Actions/index'
import * as _ from 'lodash'
var deviceWidth = Dimensions.get('window').width
class FollowingPage extends Component {
    constructor(props){
        super(props)
        this.state = ({
            showProgress:true,
        })

    }
    componentDidMount(){
        this.props.getFollowing(Services.getUsername(),Services.getPassword(),this.props.data.name)
    }
    render() {
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
                            <Text style={styles.headerText}>Following</Text>
                        </View>

                        <View style={styles.rightButton}>
                            <TouchableOpacity onPress={() => this.onPressDone()} >

                            </TouchableOpacity>
                        </View>
                    </Image>
                </View>
                <View style={{justifyContent:'flex-end',alignItems:'flex-end'}}><TouchableOpacity onPress={()=>{
                    Linking.canOpenURL('https://github.com/' +Services.getLoginName()+ '?tab=following').then(supported => {
                        if (supported) {
                            Linking.openURL('https://github.com/' +Services.getLoginName()+ '?tab=following');
                        } else {
                            console.log('Don\'t know how to open URI: https://github.com/' +Services.getLoginName()+ '?tab=following');
                        }
                    });
                    }}><Text style = {{color:'rgb(21,147,204)',padding:10,textDecorationLine: "underline",}}>Switch to Desktop Version</Text></TouchableOpacity></View>
                {this.props.followingType?

                    <View >
                        <ActivityIndicator
                            animating={this.state.showProgress}
                            style={styles.loader}
                            size="large"
                        />
                    </View>
                    :
                    <ScrollView >
                        { _.map(this.props.followingSuccessData,(rowData) => {
                            return(
                                <TouchableOpacity style={styles.mainButton} onPress = {() =>{
                                    Linking.canOpenURL('https://github.com/' + rowData.login).then(supported => {
                                        if (supported) {
                                            Linking.openURL('https://github.com/' +rowData.login);
                                        } else {
                                            console.log('Don\'t know how to open URI: https://github.com/' +rowData.login);
                                        }
                                    })}}>
                                    <View>
                                        <Text style={{fontSize:18,fontWeight:'bold'}}>{"You are following "}{rowData.login}</Text>
                                        <Text style = {{color:'rgb(21,147,204)',padding:10,textDecorationLine: "underline",}}>{"Click here to View "}{rowData.login}{"'s Profile"}</Text>
                                    </View>
                                </TouchableOpacity>

                            )
                        })}
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
        getFollowing(username, password, name) { getFollowing(dispatch, username, password, name) },
    })
}

const mapStateToProps = ({  followingLib }) => {
    console.log("...state", followingLib)
    const {followingSuccessData,followingFailureData,followingType} = followingLib
    return {followingSuccessData,followingFailureData,followingType}

}
export default connect(mapStateToProps,mapDispatchToProps)(FollowingPage)