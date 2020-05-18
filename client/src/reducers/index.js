import { combineReducers } from 'redux';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer'
import { reducer as reduxForm } from 'redux-form';

// Reminder: object keys here are our state variables being passed to our Redux store
export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer
});