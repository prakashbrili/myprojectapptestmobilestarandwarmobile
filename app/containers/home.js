import React, { Component } from 'react';
import {
    Text,
    Button,
    View,
    StyleSheet,
    Image,
    StatusBar,
    TextInput,
    Dimensions,
    TouchableOpacity,
    ListView,
    Keyboard
} from 'react-native';


import {globalStyle, globalColor , globalFontType}from "../utils/globalStyles";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import dataSource from '../utils/dataSource';
import Indicator from '../components/activityIndicator';
const util = require('util');

import { StackNavigator} from 'react-navigation';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const searchIcon = <MaterialIcon name="search" size={30} color={globalColor.cBlack} />;
const closeIcon = <MaterialIcon name="close" size={30} color={globalColor.cBlack} />;
const rightArrow = <MaterialIcon name="keyboard-arrow-right" size={30} color={globalColor.cBlack} />;
const errorIcon = <MaterialIcon name="error" size={25} color={globalColor.cWhite} />;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const goBackIcon = <MaterialIcon name="chevron-left" size={40} color={globalColor.cWhite}/>;

export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            dataSource: ds.cloneWithRows(dataSource.planets[0].results),
            dSource: dataSource.planets[0].results,
            dataSearchResults : [],
            isPlanet: false,
            inputValue: '',
            showOverlay: false,
            noRecords: false,
        };
        this.onChangeInputValue = this.onChangeInputValue.bind(this);
    }
    static navigationOptions = {
        title: 'Planets',
    };

    clearTextInput(){
        this.setState({
            inputValue: '',
            showOverlay: false,
            closeIcon: false,
        })
    }
    onChangeInputValue = (searchText) => {
        this.setState({inputValue: searchText});
        const dataSearchResults = this.state.dSource.filter((obj) => {
            let name = obj.name.toLowerCase();
            if(name.search(searchText.toLowerCase()) !== -1){
                this.setState({
                    dataSearchResults : ds.cloneWithRows(obj),
                    isPlanet: true,
                });
                return obj;
            }
            /*if(obj.length === 0){
                this.setState({
                    isPlanet: false,
                    noRecords: true,
                });
            }*/
        });
        if(searchText.length > 0){
            this.setState({
                showOverlay : true,
                closeIcon: true,
            })
        }else{
            this.setState({
                showOverlay : false,
                closeIcon: false,
            })
        }
        this.setState({
            dataSearchResults : dataSearchResults,
        });
    };
    planetInfo(rowData){
        console.log(" rowData , " ,JSON.stringify(rowData));
        this.props.navigation.navigate('SearchPlanets', {'planet' : rowData});

    }
    render() {
        const {goBack} = this.props.navigation;
        const objDet = this.state.dataSearchResults.map((obj) => {
            return (<TouchableOpacity
                        onPress={() => this.planetInfo(obj)}
                    >
                        <Text style={styles.searchedListItem}>{obj.name}</Text>
                    </TouchableOpacity>)
        });

        const errorOverlay = (<View style={styles.noRecordsContainer}>
            <Text style={styles.errorIcon}>{errorIcon} </Text>
            <Text style={styles.noRecordsText}>No Records Found</Text>
        </View>);
        return (
            <View style={[globalStyle.container,styles.container]}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={'transparent'}
                />
                <TouchableOpacity style={styles.goBackButton} onPress={ ()=> goBack() }>
                    <View style={styles.goBackButton}>
                        <Text>{goBackIcon} </Text>
                        <Text style={styles.goBackTitle}>Back</Text>
                    </View>
                </TouchableOpacity>
                <View style={[styles.searchBoxContainer]}>
                    <TextInput
                        autoCorrect={false}
                        style={styles.searchBox}
                        placeholder='Enter any Planets name'
                        placeholderTextColor={globalColor.cBlack}
                        underlineColorAndroid="transparent"
                        returnKeyType="go"
                        blurOnSubmit={false}
                        onChangeText={(text) => this.onChangeInputValue(text)}
                        value={this.state.inputValue}
                    />
                    <View style={[globalStyle.rightIcon, styles.searchIcon]}>
                        <TouchableOpacity
                            onPress={() => this.clearTextInput()}
                            style={styles.searchIcon}
                        >
                            <Text>{this.state.closeIcon ? closeIcon : searchIcon}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.planetsResult}>
                    { this.state.isPlanet && this.state.showOverlay ? <View style={[styles.searchedItems]}>
                        <View style={styles.searchedList}>
                            {objDet}
                        </View>
                    </View> : null}
                    { !this.state.isPlanet && this.state.noRecords ? errorOverlay : null}
                    <ListView
                        scrollEnabled={ true }
                        dataSource={this.state.dataSource}
                        renderRow={(rowData, sectionId, rowId) => <TouchableOpacity
                            style={styles.card}
                            onPress={() => this.planetInfo(rowData)}>
                            <View style={styles.cardContainer}>
                                <View>
                                    <Text style={styles.cardTitle}>{rowData.name}</Text>
                                </View>
                                <View style={[globalStyle.rightIcon, styles.rightArrow]}>
                                    {rightArrow}
                                </View>
                            </View>
                        </TouchableOpacity>}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#434e56',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
    },
    searchBoxContainer:{
      width: '100%',
      height: 50,
      marginTop: 40,
    },
    searchBox: {
        borderColor: 'red',
        backgroundColor: 'white',
        height: 50,
        color: globalColor.cBlack,
        fontSize: 15,
        paddingLeft: 15,
        fontFamily: globalFontType.base,
        position: 'relative',
        borderRadius: 4,
        fontWeight: '600',
    },
    card: {
        backgroundColor: globalColor.cWhite,
        marginTop: 2,
        height : 50,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    searchIcon: {
      top: 5,
    },
    planetsResult: {
        marginTop: 10,
        flex: 1,
        position: 'relative'
    },
    cardContainer: {
        padding: 5,
        flexDirection: 'row',
        height : 50,
        alignItems: 'center'
    },
    rightArrow: {
      top: 7,
    },
    cardTitle: {
        fontFamily: globalFontType.base,
        color: globalColor.cBlack,
        fontSize: 15,
    },
    searchedItems:{
        position: 'absolute',
        top: 0,
        left: -10,
        width: deviceWidth,
        minHeight: 80,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 5,
        zIndex: 99,
        paddingLeft: 10,
        paddingRight: 10,
    },
    searchedList: {
        backgroundColor: globalColor.cWhite,
    },
    searchedListItem:{
        fontSize: 15,
        color: globalColor.cBlack,
        fontFamily: globalFontType.base,
        padding: 10,
        borderColor: globalColor.cLightSilver,
        borderWidth: 1,
    },
    goBackButton :{
        backgroundColor: 'transparent',
        flexDirection: 'row',
        position: 'absolute',
        top: 10,
        zIndex: 99,
    },
    goBackTitle:{
        fontFamily: globalFontType.base,
        color: globalColor.cWhite,
        fontSize: 14,
        fontWeight: '700',
        position: 'relative',
        top: 10,
        left: -8,
    },
    noRecordsContainer:{
        position: 'absolute',
        zIndex: 99,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: deviceWidth - 20,
        paddingTop: 30,
        paddingBottom: 30,
        backgroundColor: 'rgba(0,0,0,0.8)',
        flexDirection: 'row'
    },
    noRecordsText:{
        color: globalColor.cWhite,
        fontSize: 19,
        fontWeight: '700',
        padding: 10,
        paddingLeft: 2,
        alignItems: 'center',
        fontFamily: globalFontType.base,
    },
    errorIcon:{
        position: 'relative',
        top: 2,
    }
});