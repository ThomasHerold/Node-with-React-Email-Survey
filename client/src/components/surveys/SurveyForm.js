// SurveyForm shows a form for users to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; // reduxForm allows communication with redux store; Field allows rendering of any type of html form element
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
       return _.map(formFields, ({ label, name }) => {
        return <Field 
                 key={name} 
                 component={SurveyField} 
                 type="text" 
                 label={label} 
                 name={name} 
                />
       });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit) /* Submit button will call this handler that is currently logging the values of the input field */ }> 
                {this.renderFields()}
                <Link to="/surveys" className="red btn-flat white-text"> 
                    Cancel
                    <i className="material-icons right">close</i>
                </Link>
                <button type="submit" className="teal btn-flat right white-text">
                    Next
                    <i className="material-icons right">chevron_right</i>
                </button> 
                </form> 
            </div>
        );
    }
}

function validate(values) { // values is the object containing all of the values coming from our form
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name, label }) => {
        if(!values[name]) { // referencing object property depending on the name that was passed (i.e if name = subject, then it will check the subject property of the values object)
            errors[name] = `Please provide the ${label.toLowerCase()}`
        } 
    });

    
   
    return errors;
}

export default reduxForm({ // adds additional props to our surveyForm. handleSubmit helper prop is supplied to us, for example
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false // maintain form values after leaving form component
})(SurveyForm);


// <Field 
//    type="text" // what data will the input expect
//    name="surveyTitle" // when we type into this field input, the Field component tells redux form that the user is inputting some value called surveyTitle. The value is stored in redux store with this key name
//    component="input"  // displays what kind of html field element we want. will be a custom input component called SurveyField
//  />