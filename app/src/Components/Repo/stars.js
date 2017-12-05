/**
 * Created by sumanthu on 28/08/17.
 */
import React,{ Component } from 'react'
import {StyleSheet,TextInput,Text,View,TouchableOpacity,Dimensions,ScrollView,Alert,ListView,ActivityIndicator,Linking,Platform,Image} from 'react-native'
import Button from '../../ReusableComponents/Button';
import Services from '../../Services/Services'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { getStars } from'../../Actions/index'
import * as _ from 'lodash'
var deviceWidth = Dimensions.get('window').width
class StarsPage extends Component {
    constructor(props){
        super(props)
        this.state = ({
            showProgress:true,
        })
    }
    componentDidMount(){
        this.props.getStars(Services.getUsername(),Services.getPassword(),this.props.data.name)
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
                            <Text style={styles.headerText}>My Starred Repos</Text>
                        </View>

                        <View style={styles.rightButton}>
                            <TouchableOpacity onPress={() => this.onPressDone()} >

                            </TouchableOpacity>
                        </View>
                    </Image>
                </View>
                <View style={{justifyContent:'flex-end',alignItems:'flex-end'}}><TouchableOpacity onPress={()=>{

                    Linking.canOpenURL('https://github.com/' +Services.getLoginName()+ '?tab=stars').then(supported => {
                        if (supported) {
                            Linking.openURL('https://github.com/' +Services.getLoginName()+ '?tab=stars');
                        } else {
                            console.log('Don\'t know how to open URI: https://github.com/' +Services.getLoginName()+ '?tab=stars');
                        }
                    });
                    }}><Text style = {{color:'rgb(21,147,204)',padding:10,textDecorationLine: "underline",}}>Switch to Desktop Version</Text></TouchableOpacity></View>
                {this.props.starType?

                    <View >
                        <ActivityIndicator
                            animating={this.state.showProgress}
                            style={styles.loader}
                            size="large"
                        />
                    </View>
                    :
                    <ScrollView >
                        { _.map(this.props.starSuccessData,(rowData) => {
                            console.log("rowData",rowData)
                            Services.setRepoName(rowData.name)
                            Services.setRepoBranch(rowData.default_branch)
                            var createdDate = rowData.pushed_at ;
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
                            return(
                                <TouchableOpacity onPress = {() => Actions.RepoPage({data:rowData})} style={styles.mainButton}>
                                    <View>
                                        <Text style={{fontSize:18,fontWeight:'bold'}}>{rowData.name}</Text>
                                        <Text>{rowData.description}</Text>
                                        <View style={{justifyContent:'flex-start',flexDirection:'row'}}>
                                            <Text style={{fontSize:14,fontWeight:'bold',borderWidth:1,borderRadius:5,padding:2}}>{rowData.language}</Text>
                                        </View>
                                        <View style={{justifyContent:'flex-end',paddingTop:2,paddingBottom:2,paddingLeft:10}}><Text>{"Updated on "}{date}</Text></View>
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
        getStars(username, password, name) { getStars(dispatch, username, password, name) },
    })
}

const mapStateToProps = ({  starLib }) => {
    console.log("...state", starLib)
    const {starSuccessData,starFailureData,starType} = starLib
    return {starSuccessData,starFailureData,starType}

}
export default connect(mapStateToProps,mapDispatchToProps)(StarsPage)