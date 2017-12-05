/**
 * Created by sumanthu on 28/08/17.
 */
import React,{ Component } from 'react'
import {StyleSheet,TextInput,Text,View,TouchableOpacity,Dimensions,ScrollView,Alert,ListView,ActivityIndicator,Linking,Platform,Image} from 'react-native'
import Button from '../../ReusableComponents/Button';
import Services from '../../Services/Services'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { getIssues } from'../../Actions/index'
import * as _ from 'lodash'
import HTMLView from 'react-native-htmlview';
var deviceWidth = Dimensions.get('window').width
class IssuesPage extends Component {
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = ({
            commitArray:[],
            showProgress:true,
            dataSource: ds.cloneWithRows([]),
        })

    }
    componentDidMount(){
        this.props.getIssues(Services.getUsername(),Services.getPassword(),this.props.data.name)
        /*Services.getUserRepoCommits("repos/"+ Services.getLoginName() +"/"+ this.props.data.name +"/commits",'GET',Services.getUsername(),Services.getPassword())
            .then(result =>{
                if(result.status >=200 && result.status<=300){
                    //console.log(result.json())
                    return result.json()

                }else  if (result.status == 401){
                    //Alert.alert("Please enter valid credentials")
                }


            }).then(data => {
            console.log("Commits Result",data) ;
            this.setState({
                commitArray:data,
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
    /*componentDidUpdate(){
        this.setState({
            showProgress:false,
            dataSource:this.state.dataSource.cloneWithRows(this.props.commitSuccessData)
        })
    }*/
    renderRow(rowData){
            console.log("commit rowData",rowData)
            var createdDate = rowData.commit.committer.date ;
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
            //console.log("Date",date)
            return(

                <View style={{height:150,borderWidth:1,margin:1}}>
                    <Text style={{paddingTop:2,paddingBottom:2,paddingLeft:10,}}>{rowData.commit.message}</Text>
                    <Text style={{paddingTop:2,paddingBottom:2,paddingLeft:10}}>{"commited by "}{rowData.commit.committer.name}{" on "}{date}</Text>


                </View>
            )

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
                            <Text style={styles.headerText}>My Commits</Text>
                        </View>

                        <View style={styles.rightButton}>
                            <TouchableOpacity onPress={() => this.onPressDone()} >

                            </TouchableOpacity>
                        </View>
                    </Image>
                </View>
                <View style={{justifyContent:'flex-end',alignItems:'flex-end'}}><TouchableOpacity onPress={()=>{

                    Linking.canOpenURL('https://github.com/' +Services.getLoginName()+ '/' + this.props.data.name + '/commits/' + this.props.data.default_branch).then(supported => {
                        if (supported) {
                            Linking.openURL('https://github.com/' +Services.getLoginName()+ '/' + this.props.data.name + '/commits/' + this.props.data.default_branch);
                        } else {
                            console.log('Don\'t know how to open URI: https://github.com/' +Services.getLoginName()+ '/' + this.props.data.name + '/commits/' + this.props.data.default_branch);
                        }
                    });
                    /*setTimeout(function () {
                     Actions.Shop()
                     Actions.refresh({key: 'drawer', open: value => !value })
                     }),30*/}}><Text style = {{color:'rgb(21,147,204)',padding:10,textDecorationLine: "underline",}}>Switch to Desktop Version</Text></TouchableOpacity></View>
                {this.props.issueType?

                    <View >
                        <ActivityIndicator
                            animating={this.state.showProgress}
                            style={styles.loader}
                            size="large"
                        />
                    </View>
                    :
                    <ScrollView >
                        {
                            _.map(this.props.issueSuccessData,(rowData) => {
                                console.log("issue rowData",rowData)
                                var createdDate = rowData.created_at ;
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
                                //console.log("Date",date)
                                return(

                                    <View style={styles.mainButton}>
                                        <Text>{rowData.title}</Text>
                                        <Text>{rowData.state}</Text>
                                        <Text>{"Issue was created on "}{date}</Text>


                                    </View>
                                )
                            })

                            /*<ListView
                                dataSource={this.state.dataSource}
                                renderRow={(rowData) => this.renderRow(rowData)}/>*/
                        }
                    </ScrollView>
                }</View>



        );
    }
    /*render(){
        console.log("RA",this.state.commitArray)

        return(
            <ScrollView style={{flex:1}}>
                {this.state.commitArray==[]?
                    <View/>:this.state.commitArray.map(rowData => {
                        return(
                            <TouchableOpacity key={rowData.id} onPress = {() => Actions.Commits({data:rowData})}>
                                <Text>{rowData.commit.message}</Text>
                            </TouchableOpacity>
                        )
                    })}
            </ScrollView>
        )
    }*/
}

const styles = StyleSheet.create({
    mainButton:{
        borderWidth:2,
        borderColor:'black',
        borderRadius:12,
        //justifyContent: 'center',
        //alignItems: 'center',
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
        getIssues(username, password, name) { getIssues(dispatch, username, password, name) },
    })
}

const mapStateToProps = ({  issueLib }) => {
    console.log("...state", issueLib)
    const {issueSuccessData,issueFailureData,issueType} = issueLib
    return {issueSuccessData,issueFailureData,issueType}

}
export default connect(mapStateToProps,mapDispatchToProps)(IssuesPage)