// SurveyFormReview shows users their survey form inputs to verify before sending email
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom'

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => { // history object comes from withRouter
    const reviewFields = _.map(formFields, ({ label, name }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    })

    return (
        <div>
            <h5>Please Review Your Entries</h5>
            {reviewFields}
            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
                Back
            </button>
            <button onClick={() => submitSurvey(formValues, history)} className="green btn-flat white-text right">
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { formValues: state.form.surveyForm.values }; // passing these props to SurveyFormReview
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview)); // pass history object to component using withRouter