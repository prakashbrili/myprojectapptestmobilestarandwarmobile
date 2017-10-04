import React from 'react';

import {
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';


const globalFontType = {
    base: 'Open Sans',
    bold: 'Roboto Slab',
    emphasis: 'Roboto',
};



const globalColor = {
    cTransparent: 'rgba(0,0,0,0)',
    cWindowTint: 'rgba(0, 0, 0, 0.4)',
    cText: '#263238',
    cGreen: '#8BC34A',
    cLightSilver: '#F0F2F4',
    cWhite: '#ffffff',
    cRed: 'red',
    cBlue: '#0099CC',
    cDarkBlue: '#066DA9',
    cLightBlue: '#81CCE5',
    cGray: '#AEAEAE',
    cDarkGray: '#757575',
    cBlack: '#263238',
};


const globalSize = {
    h1: 38,
    h2: 34,
    h3: 30,
    h4: 26,
    h5: 20,
    h6: 19,
    input: 18,
    regular: 17,
    medium: 14,
    small: 12,
    tiny: 8.5
};


const globalStyle = {
    container:{
        flex: 1,
        flexDirection: 'column',
    },
    productTitle:{
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingBottom: 20,
    },
    loginPlaceHolder: {
        backgroundColor: 'transparent',
        color: globalColor.cWhite,
        fontSize: 18,
        paddingLeft: 35,
        paddingTop: 5,
        paddingBottom: 5,
        fontFamily: globalFontType.base,
        height: 50,
        width: '100%',
    },
    textInputContainer:{
        height: 50,
        flexDirection: 'row',
        borderBottomColor: globalColor.cWhite,
        borderBottomWidth: 2,
        flexDirection: 'column',
    },
    loginIcon: {
        backgroundColor: 'transparent',
        height: 50,
        position: 'absolute',
        top: 8,
    },
    rightIcon:{
        backgroundColor: 'transparent',
        height: 50,
        position: 'absolute',
        top: 17,
        right: 10,
    },
    mainButton:{
        padding: 10,
        backgroundColor: globalColor.cBlue,
        marginTop: 15,
        borderRadius: 8,
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: globalFontType.base,
        color: globalColor.cWhite,
        fontSize: 16,
        fontWeight: '700',
        alignSelf: 'center'
    },
    errorTextContainer: {
        position: 'relative',
        height: 40,
        backgroundColor: 'transparent',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        fontFamily: globalFontType.base,
        position: 'absolute',
        top: 10,
        fontWeight: '700'
    },
    textInput:{

    }
};



module.exports = {
    globalColor,
    globalSize,
    globalStyle,
    globalFontType,
};
