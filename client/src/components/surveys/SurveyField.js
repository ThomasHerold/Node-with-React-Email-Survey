// Survey Field contains logic to render a single field with text input

import React from 'react';

export default ({ input, label, meta: { error, touched } }) => { // Field component form redux form sends us a whole bunch of props that contain helpers for our input fields. we are destructuring the input property for the helper methods
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px'}} />
            <div className="red-text" style={{ marginBottom: '20px'}}>
            {touched && error} 
            </div>
        </div>
    );
};

// LINE 10: Spread operator gives the input all of the input methods passed by the Field component. Saves time rather than defining them individually
// LINE 11: Return error message only after the field has been touched