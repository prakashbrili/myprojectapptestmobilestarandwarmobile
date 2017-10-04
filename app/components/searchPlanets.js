import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Image,
    Animated,
    Easing
} from 'react-native';

import {globalStyle, globalColor, globalFontType}from "../utils/globalStyles"
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

const util = require('util');
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const goBackIcon = <MaterialIcon name="chevron-left" size={40} color={globalColor.cWhite}/>;
const starIcon = <EvilIcon name="star" size={40} color={globalColor.cWhite}/>;

class SearchPlanets extends Component {
    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0);
        this.state = {
            planetPopUpOpen : false,
            planetSize: 40,
            planetTextSize: 15,
        };
        this.planet = props.navigation.state.params.planet;
        this.onPressPlanet = this.onPressPlanet.bind(this);
    }

    componentDidMount(){
        this.spin();
        let planetSize = this.planet.population.length;
        console.log("planetSize " ,planetSize);

        switch(planetSize) {

            case (planetSize > 6) : {
                console.log("1 " ,planetSize);
                this.setState({
                    planetSize: 40,
                    planetTextSize: 15,
                })
            }
                break;
            case (planetSize > 8) : {
                console.log("2 " ,planetSize);
                this.setState({
                    planetSize: 50,
                    planetTextSize: 16,
                })
            }
                break;
            case (planetSize > 10) : {
                console.log("3 " ,planetSize);
                this.setState({
                    planetSize: 60,
                    planetTextSize: 17,
                })
            }
                break;
            case (planetSize > 12) : {
                console.log("4 " ,planetSize);
                this.setState({

                    planetSize: 70,
                    planetTextSize: 18,
                })
            }
                break;
        }

    }
    spin () {
        this.spinValue.setValue(0);
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear
            }
        ).start(() => this.spin())
    }

    onPressPlanet(){
        this.setState({
            planetPopUpOpen : !this.state.planetPopUpOpen,
        })
    }
    render() {
        const {goBack} = this.props.navigation;

        let planetSize = this.planet.population.length;
        console.log("planetSize " ,planetSize);


        return (
            <View style={[globalStyle.container, styles.container]}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor='#000000'
                />

                <TouchableOpacity style={styles.goBackButton} onPress={ ()=> goBack() }>
                    <View style={styles.goBackButton}>
                        <Text>{goBackIcon} </Text>
                        <Text style={styles.goBackTitle}>Back</Text>
                    </View>
                </TouchableOpacity>
                <Image style={styles.imageStarContainer} source={require('../resources/starsky.jpg')} resizeMode={'cover'}>
                    <View style={styles.content}>
                        <View style={styles.starContainer}>
                            {this.state.planetPopUpOpen ? <View style={styles.planetPopUp}>
                                <Text style={styles.planetTitle}>Planet Name : {this.planet.name}</Text>
                                <Text style={styles.planetTitle}>Population : {this.planet.population}</Text>
                                <Text style={styles.planetTitle}>Water Surface : {this.planet.surface_water}</Text>
                            </View> : null }
                            <TouchableOpacity style={styles.starIcon} onPress={ ()=> this.onPressPlanet() }>
                                <Animated.View><Text><EvilIcon name="star" size={this.state.planetSize} color={globalColor.cWhite}/></Text></Animated.View>
                                <Text style={[styles.planetTitleBottom,{fontSize: this.state.planetTextSize}]}>{this.planet.name}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: globalColor.cBlack,
        flex: 1,
        justifyContent: 'center',
        width: deviceWidth,
        height: deviceHeight,
    },
    content:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    planetTitle:{
        fontFamily: globalFontType.base,
        color: globalColor.cBlack,
        fontSize: 14,
        fontWeight: '700'
    },
    planetTitleBottom:{
        fontFamily: globalFontType.base,
        color: globalColor.cWhite,
        fontSize: 14,
        fontWeight: '700',
        position: 'relative',
        alignItems: 'center',
        alignSelf: 'center'
    },
    starContainer:{
        height: 100,
        width: 100,
    },
    planetPopUp :{
        backgroundColor: globalColor.cWhite,
        padding: 15,
        borderColor : globalColor.cDarkGray,
        borderWidth: 2,
        justifyContent: 'center',
        position: 'absolute',
        top:  -100,
        width: 250,
        left: -70,
        overflow: 'hidden',
        alignItems: 'center',
    },
    starIcon:{
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
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
    imageStarContainer: {
        width: deviceWidth,
        height: deviceHeight,
    },

});

export default SearchPlanets;