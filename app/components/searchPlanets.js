import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    StatusBar,
    TouchableOpacity
} from 'react-native';

import {globalStyle, globalColor, globalFontType}from "../utils/globalStyles"
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

const util = require('util');
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const accountIcon = <MaterialIcon name="account-circle" size={30} color={globalColor.cWhite}/>;
const starIcon = <EvilIcon name="star" size={40} color={globalColor.cWhite}/>;

class SearchPlanets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planetPopUpOpen : false,
        };
        this.planet = props.navigation.state.params.planet;
        this.onPressPlanet = this.onPressPlanet.bind(this);
    }

    componentDidMount(){
        // const {params} = this.props.navigation.state;

        // const {planet} = this.props.navigation.state;
        // console.log(" asdsd  ",params);
        // console.log(" asdsd  ",JSON.stringify(params), "planet : " ,params);
    }

    onPressPlanet(){
        this.setState({
            planetPopUpOpen : !this.state.planetPopUpOpen,
        })
    }
    render() {
        //console.log(" asdsd  ",JSON.stringify(this.planet));

        return (
            <View style={[globalStyle.container, styles.container]}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={'transparent'}
                />
                <View style={styles.content}>
                    {this.state.planetPopUpOpen ? <View style={styles.planetPopUp}>
                        <Text style={styles.planetTitle}>{this.planet.name}</Text>
                        <Text style={styles.planetTitle}>{this.planet.population}</Text>
                        <Text style={styles.planetTitle}>{this.planet.surface_water}</Text>
                    </View> : null }
                    <TouchableOpacity onPress={ ()=> this.onPressPlanet() }>
                        <Text>{starIcon}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: globalColor.cBlack,
        flex: 1,
        justifyContent: 'center',
    },
    content:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    planetTitle:{
        fontFamily: globalFontType.base,
        color: globalColor.cBlack,
        fontSize: 13,
    },
    planetPopUp :{
        backgroundColor: globalColor.cWhite,
        padding: 10,
        borderColor : globalColor.cDarkGray,
        borderWidth: 2,
        justifyContent: 'center',
    }
});

export default SearchPlanets;