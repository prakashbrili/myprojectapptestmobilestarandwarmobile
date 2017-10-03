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
const rightArrow = <MaterialIcon name="keyboard-arrow-right" size={30} color={globalColor.cBlack} />;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});



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
        });
        if(searchText.length > 0){
            this.setState({
                showOverlay : true,
            })
        }else{
            this.setState({
                showOverlay : false,
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
        //console.log("dataSource1 :: " ,JSON.stringify(this.state.dataSource));
        // console.log("dataSearchResults :: " ,JSON.stringify(this.state.dataSearchResults));

        const objDet = this.state.dataSearchResults.map((obj) => {
            return (<TouchableOpacity
                        onPress={() => this.planetInfo(obj)}
                    >
                        <Text style={styles.searchedListItem}>{obj.name}</Text>
                    </TouchableOpacity>)
        });

        return (
            <View style={[globalStyle.container,styles.container]}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={'transparent'}
                />
                <View style={[styles.searchBoxContainer]}>
                    <TextInput
                        autoCorrect={false}
                        style={styles.searchBox}
                        placeholder='Enter the Planets'
                        placeholderTextColor={globalColor.cBlack}
                        underlineColorAndroid="transparent"
                        returnKeyType="go"
                        blurOnSubmit={false}
                        onChangeText={(text) => this.onChangeInputValue(text)}
                        value={this.state.inputValue}
                    />
                    <View style={[globalStyle.rightIcon, styles.searchIcon]}>
                        <TouchableOpacity
                            onPress={() => this.searchButton(this.state.searchInput)}
                            style={styles.searchIcon}
                        >
                            <Text>{searchIcon}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.planetsResult}>
                    { this.state.isPlanet && this.state.showOverlay? <View style={[styles.searchedItems]}>
                        <View style={styles.searchedList}>
                            {objDet}
                        </View>
                    </View> :  this.state.noRecords && this.state.inputValue.length > 0 ? <View style={styles.searchedList}><Text style={styles.searchedListItem}>No Records Found</Text></View> : null }
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
        backgroundColor: globalColor.cBlue,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
    },
    searchBoxContainer:{
      width: '100%',
      height: 50,
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
        fontWeight: '600'
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
    }
});