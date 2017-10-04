
import * as types from './types';
import LoginService from '../../lib/loginService';


// Action creator
export function login(userCredentials, reqCaller) {

    return (dispatch) => {
        dispatch({ type: 'REQUEST_STARTED' });

        return LoginService.getLoginInfo(userCredentials, (response, errMsg) => {
            if (response == null) {
                dispatch(setLoginInfo({ payload: null, error: errMsg }, reqCaller));
            } else {
                dispatch(setLoginInfo({ payload: response, error: null }, reqCaller));
            }
        });
    };
}

export function setLoginInfo(response, reqCaller) {
    const object = response['payload'];

    if (object) {
        return {
            type: types.LOGIN_SUCCESS,
            response: object, reqCaller : reqCaller };
    } else {
        return {
            type: types.LOGIN_ERROR,
            response: response['error'], reqCaller : reqCaller };
    }
}




