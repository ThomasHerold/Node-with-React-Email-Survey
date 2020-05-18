// SurveyNew show SurveyForm and SurveyFormReview components
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

class SurveyNew extends Component {
    state = {
        showReview: false
    };

    renderContent() {
        if (this.state.showReview) {
            return <SurveyFormReview 
                onCancel={() => this.setState({ showReview: false })}
            />
        }

        return <SurveyForm 
                onSurveySubmit={() => this.setState({ showReview: true })} 
               />;
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm' // Because this is the parent survey component and we did not specify to keep the form values when referencing the same form, navigating away from the survey form component will clear the values by default
})(SurveyNew);         // This solves the issue of old values always persisting when the user is no longer reviewing the survey.