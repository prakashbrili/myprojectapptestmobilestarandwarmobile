import { combineReducers } from 'redux';
import loginInfo from './login';

const rootReducer = combineReducers({
    loginInfo: loginInfo,
});

export default rootReducer;
