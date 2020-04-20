import { combineReducers } from 'redux';
import authReducer from './authReducer';

// Reminder: object keys here are our state variables being passed to our Redux store
export default combineReducers({
    auth: authReducer
});