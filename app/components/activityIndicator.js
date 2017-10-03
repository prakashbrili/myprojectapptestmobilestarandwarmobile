import React, { Component } from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

const loader = <EvilIcon name="spinner-2" size={20} color={'white'}/>;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
let singletonObj = null;

export default class Indicator extends Component {
    constructor(props) {
        super(props);

        if(!singletonObj){
            singletonObj = this;
            this.state = {showActivityIndicator:false}
            this.startActivity = this.startActivity.bind(this);
            this.stopActivity = this.stopActivity.bind(this);
        }

        return singletonObj;
    }

    isActivityStarted(){
        return this.state.showActivityIndicator;
    }
    startActivity(){
        this.setState({showActivityIndicator:true})
    }

    stopActivity(){
        this.setState({showActivityIndicator:false})
    }

    render(){
        return (
            this.state.showActivityIndicator ?(
                <View style = {styles.container}>
                    <View style={{flex: 1, width: deviceWidth, height: deviceHeight, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        {loader}
                    </View>
                </View>):null
        );
    }
}

const styles = StyleSheet.create ({
    container:{
        position: 'absolute',
        width: deviceWidth,
        height:deviceHeight,
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,

    },
});