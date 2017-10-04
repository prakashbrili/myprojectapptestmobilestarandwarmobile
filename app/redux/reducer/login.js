
import * as types from '../action/types'

const initialState = {
    loginResponse:"",
    jsonResponse:null,
};


const loginInfo  = (state = initialState, action) => {
    let newState = {};

    switch (action.type){
        case types.LOGIN_SUCCESS:
            newState = Object.assign({}, state, {
                loginResponse:types.LOGIN_SUCCESS, jsonResponse:action.response, reqCaller : action.reqCaller
            });
            return newState;
        case types.LOGIN_ERROR:
            newState = Object.assign({}, state, {
                loginResponse:types.LOGIN_ERROR, jsonResponse:action.response, reqCaller : action.reqCaller
            });
            return newState;
        case types.LOGIN_INVALID:
            newState = Object.assign({}, state, {
                loginResponse:types.LOGIN_INVALID,reqCaller : action.reqCaller
            });
            return newState;

        default:
            return state || newState;
    }
};

export default loginInfo;
