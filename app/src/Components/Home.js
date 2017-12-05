/**
 * Created by sumanthu on 28/08/17.
 */
import React,{ Component } from 'react'
import {StyleSheet,TextInput,Text,View,TouchableOpacity,Dimensions,ScrollView,Alert,ListView,ActivityIndicator,Linking,Platform,Image} from 'react-native'
import Button from '../ReusableComponents/Button';
import Services from '../Services/Services'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { getCommits } from'../Actions'
const deviceWidth = Dimensions.get('window').width
export default class Home extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.header}>
                    <Image source={require('../../img/header_background.png')} style={styles.headerImage}>
                        <View style={styles.backButtonView}>
                        </View>

                        <View style={styles.headerTextView}>
                            <Text style={styles.headerText}>Home</Text>
                        </View>

                        <View style={styles.rightButton}>
                        </View>
                    </Image>
                </View>
                <View style={{justifyContent:'flex-end',alignItems:'flex-end'}}><TouchableOpacity><Text style = {{color:'rgb(21,147,204)',padding:10,textDecorationLine: "underline",}}>Switch to Desktop Version</Text></TouchableOpacity></View>
                <View>
                    <TouchableOpacity onPress = {() => Actions.Profile({data:this.props.data})} style = {styles.mainButton}>
                        <Text style = {styles.mainButtonText}>Profile</Text>
                    </TouchableOpacity>
                </View>
                 <View>
                    <TouchableOpacity onPress = {() => Actions.Repos({data:this.props.data})} style = {styles.mainButton}>
                        <Text style = {styles.mainButtonText}>Repositories</Text>
                    </TouchableOpacity>
                </View>
                 <View>
                    <TouchableOpacity onPress = {() => Actions.Stars({data:this.props.data})} style = {styles.mainButton}>
                        <Text style = {styles.mainButtonText}>Starred Repos</Text>
                    </TouchableOpacity>
                </View>
                 <View>
                    <TouchableOpacity onPress = {() => Actions.Followers({data:this.props.data})} style = {styles.mainButton}>
                        <Text style = {styles.mainButtonText}>Followers</Text>
                    </TouchableOpacity>
                </View>
                 <View>
                    <TouchableOpacity onPress = {() => Actions.Following({data:this.props.data})} style = {styles.mainButton}>
                        <Text style = {styles.mainButtonText}>Following</Text>
                    </TouchableOpacity>
                </View>
                </View>



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
        height:50,
        padding:10,
        margin:10
    },
    mainButtonText:{
        fontSize:18,
        fontWeight:'bold'
    },
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