/**
 * Created by sumanthu on 20/08/17.
 */
import React,{ Component } from 'react'
import {StyleSheet,TextInput,Text,View,TouchableOpacity,Dimensions,ScrollView,ListView,ActivityIndicator,Linking,Platform,Image} from 'react-native'
import Button from '../ReusableComponents/Button';
import Services from '../Services/Services';
import { getRepos }  from '../Actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import * as _ from 'lodash'
var deviceWidth = Dimensions.get('window').width
class MainPage extends Component {
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = ({
            repoArray:[],
            showProgress:true,
            dataSource: ds.cloneWithRows([]),
        })
console.log("props",this.props)
    }
    componentDidMount(){
        this.props.getRepos(Services.getUsername(),Services.getPassword())

        //console.log(this.props.data + Services.getUsername() + Services.getPassword() + Services.getLoginName())
        /*Services.getUserRepos("users/" + Services.getLoginName() + "/repos",'GET',Services.getUsername(),Services.getPassword())
            .then(result =>{
                if(result.status >=200 && result.status<=300){
                    console.log("result.json",result)
                    return result.json()
                    console.log("Repos Result",result.json()) ;
                }else  if (result.status == 401){
                    //Alert.alert("Please enter valid credentials")
                }


            }).then(data => {
            console.log("Repos Result",data) ;
            this.setState({
                repoArray:data,
                dataSource: this.state.dataSource.cloneWithRows(data),
                showProgress:false
            })

        })
            .catch((err => {
                this.setState({
                    showProgress:false
                })
                console.log("error",err)
                Alert.alert("Please try again later")
            }))*/
    }
componentWillUpdate(){
    this.setState({
        showProgress:false,
        dataSource:this.state.dataSource.cloneWithRows(this.props.repoSuccessData)
    })
}
    renderRow(rowData){
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
        <TouchableOpacity onPress = {() => Actions.Commits({data:rowData})}>
            <View style={{height:150,borderWidth:1,paddingTop:2,paddingBottom:2,paddingLeft:10,margin:1}}>
                <Text style={{paddingTop:3,paddingBottom:2,paddingLeft:10,fontSize:18,fontWeight:'bold'}}>{rowData.name}</Text>
                <Text style={{paddingTop:2,paddingBottom:2,paddingLeft:10}}>{rowData.description}</Text>
                <View style={{justifyContent:'flex-start',flexDirection:'row',padding:10}}>
                    <Text style={{borderWidth:1,paddingTop:2,paddingBottom:2,paddingLeft:10}}>{rowData.language}</Text>
                </View>
                <View style={{webkitJustifyContent:'flex-end',paddingTop:2,paddingBottom:2,paddingLeft:10}}><Text>{"Updated on "}{date}</Text></View>
            </View>
        </TouchableOpacity>

        )
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.header}>
                    <Image source={require('../../img/header_background.png')} style={styles.headerImage}>
                        <View style={styles.backButtonView}>
                        </View>

                        <View style={styles.headerTextView}>
                            <Text style={styles.headerText}>My Repos</Text>
                        </View>

                        <View style={styles.rightButton}>
                        </View>
                    </Image>
                </View>
                <View style={{justifyContent:'flex-end',alignItems:'flex-end'}}><TouchableOpacity onPress={()=>{

                    Linking.canOpenURL('https://github.com/' +Services.getLoginName()+ '?tab=repositories').then(supported => {
                        if (supported) {
                            Linking.openURL('https://github.com/' +Services.getLoginName()+ '?tab=repositories');
                        } else {
                            console.log('Don\'t know how to open URI: https://github.com/' +Services.getLoginName()+ '?tab=repositories');
                        }
                    });
                    /*setTimeout(function () {
                     Actions.Shop()
                     Actions.refresh({key: 'drawer', open: value => !value })
                     }),30*/}}><Text style = {{color:'rgb(21,147,204)',padding:10,textDecorationLine: "underline",}}>Switch to Desktop Version</Text></TouchableOpacity></View>
            {this.state.showProgress?

                <View >
                    <ActivityIndicator
                        animating={this.state.showProgress}
                        style={styles.loader}
                        size="large"
                    />
                </View>
                :
                <ScrollView >
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => this.renderRow(rowData)}/>
                </ScrollView>
            }</View>



        );
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
        getRepos(username, password) { getRepos(dispatch, username, password) },
    })
}

const mapStateToProps = ({  repoLib }) => {

    const {repoSuccessData,repoFailureData,repoType} = repoLib
    return {repoSuccessData,repoFailureData,repoType}

}
export default connect(mapStateToProps,mapDispatchToProps)(MainPage)