import React, {Component} from 'react';
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
    ActivityIndicator,
    Keyboard
} from 'react-native';

import {globalStyle, globalColor, globalFontType}from "../utils/globalStyles"
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import dataSource from '../utils/dataSource'

import Indicator from '../components/activityIndicator';

const util = require('util');
const appName = 'STAR WARS';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const accountIcon = <MaterialIcon name="account-circle" size={30} color={globalColor.cWhite}/>;
const passwordIcon = <MaterialIcon name="enhanced-encryption" size={30} color={globalColor.cWhite}/>;
const visibleIcon = <MaterialIcon name="visibility" size={20} color={globalColor.cWhite}/>;

// let url = urlConfig.carrierServiceUrl.LITERATURE_SERVICE ;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/action'
import * as types from '../redux/action/types'

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleIcon: false,
            isErrorInput: false,
            errorText: '',
            user: '',
            password: '',
            dataSource: dataSource.people,
            isPwdVisible: false,
            hidden: true,
        };
        this.onLongPress = this.onLongPress.bind(this);
    }


    componentWillReceiveProps(nextProps){
        console.log("nextprops :: ", nextProps);
        let isSuccess = nextProps.loginInfo.loginResponse;
        if(isSuccess === 'LOGIN_SUCCESS'){
            this.props.navigation.navigate('Home');
        }else{
            alert("The Username or password might be wrong,");
        }
    }

    onLongPress () {
        this.setState({
            isPwdVisible: true,
        });
    }

    changePassword(password) {
        this.setState({
            changePassword: !this.state.changePassword,
        })
    }

    onChangeLoginInput(user) {
        this.setState({user})
        if (this.state.user.length >= 0) {
            this.setState({
                isErrorInput: false,
            })
        }
    }

    onChangeLoginPassword(password) {
        this.setState({password});
        if (this.state.password.length >= 0) {
            this.setState({
                isErrorInput: false,
                visibleIcon: true,
            })
        }else{
            this.setState({
                visibleIcon: true,
            })
        }
    }

    signUpButton() {
        Keyboard.dismiss();
        // let activityIndicator = new Indicator();
        // activityIndicator.startActivity();
        this.props.navigation.navigate('Home');
        // setTimeout(() => {this.props.navigation.navigate('Home');}, 1000);
        this.setState({
            // errorText: 'This feature is not added.',
            isErrorInput: !this.state.isErrorInput,
        });
        // activityIndicator.stopActivity();
    }

    validation(userCredential) {
        console.log(" loginButt111on : ", userCredential);
        if (userCredential.user === '' || userCredential.user === null) {
            this.setState({
                isErrorInput: true,
                errorText: 'Please enter all the input fields',
            });
            return;
        } else if (userCredential.password === '' || userCredential.password === null) {
            this.setState({
                isErrorInput: true,
                errorText: 'Please enter the password',
            });
            return;
        } else {
            this.setState({
                isErrorInput: false,
            });
            return true;
        }
    }

    loginButton(userCredential) {
        Keyboard.dismiss();
        console.log(" loginButton : ", userCredential);
        if (this.validation(userCredential)) {
            this.props.login(userCredential);
        }

    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={[globalStyle.container, styles.container]}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={'transparent'}
                />
                <Image source={require('../resources/login.png')} resizeMode={'contain'} style={styles.imageView}>
                    <View style={[styles.loginContainer]}>
                        <View style={[globalStyle.productTitle,]}>
                            <Text style={styles.appTitle}>{appName.toUpperCase()}</Text>
                        </View>

                        <View style={[globalStyle.textInputContainer, styles.userInput]}>
                            <View style={globalStyle.loginIcon}>
                                {accountIcon}
                            </View>
                            <View style={[globalStyle.textInput, styles.textInput]}>
                                <TextInput
                                    autoCorrect={false}
                                    returnKeyType="next"
                                    style={globalStyle.loginPlaceHolder}

                                    placeholder='Username'
                                    placeholderTextColor={globalColor.cWhite}
                                    underlineColorAndroid="transparent"
                                    onChangeText={user => this.onChangeLoginInput(user)}
                                />
                            </View>
                        </View>
                        <View style={[globalStyle.textInputContainer, styles.passwordInput]}>
                            <View style={globalStyle.loginIcon}>
                                {passwordIcon}
                            </View>
                            <TextInput
                                autoCorrect={false}
                                style={globalStyle.loginPlaceHolder}
                                placeholder='Password'
                                placeholderTextColor={globalColor.cWhite}
                                underlineColorAndroid="transparent"
                                returnKeyType="go"
                                blurOnSubmit={false}
                                secureTextEntry={this.state.hidden}
                                value={this.state.password}
                                onSubmitEditing={event => this.onSubmitEdit(event)}
                                onChangeText={password => this.onChangeLoginPassword(password)}
                            />
                            <View style={globalStyle.rightIcon}>
                                <TouchableOpacity
                                    onPress={ () => this.setState({ hidden: !this.state.hidden })}
                                >
                                    {this.state.visibleIcon ? visibleIcon : null}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={globalStyle.errorTextContainer}>
                            <Text
                                style={globalStyle.errorText}>{this.state.isErrorInput ? this.state.errorText : ''}</Text>
                        </View>
                        <View style={styles.loginButtonContainer}>
                            <TouchableOpacity
                                style={[globalStyle.mainButton, styles.mainButton]}
                                onPress={(user, password) => this.loginButton({
                                    user: this.state.user,
                                    password: this.state.password
                                })}
                            >
                                <Text style={globalStyle.buttonText}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.signUpButton()}
                                style={[globalStyle.mainButton, styles.mainButton]}
                            >
                                <Text style={globalStyle.buttonText}>
                                    Sign up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Image>
                <Button title="Login" onPress={ () => navigate('Home', {name: 'Jane'})}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        width: deviceWidth,
        // height: deviceHeight,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'column',
        // backgroundColor: 'rgba(0,0,0,0.5)',
    },
    productTitle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    appTitle: {
        fontFamily: globalFontType.bold,
        fontSize: 30,
        color: globalColor.cWhite,
        alignSelf: 'center',
    },
    loginButtonContainer: {
        flexDirection: 'row',
        marginBottom: 90,
    },
    mainButton: {
        width: '40%',
        marginLeft: 5,
    }
});
function mapStateToProps(state) {
    return {
        loginInfo: state.loginInfo,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);


