import React, { Component } from 'react';
import Stripe from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';


class Payments extends Component {
    render() {

        return (
            <Stripe
                name="Emaily"
                description="Add 5 Credits for $5" 
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_PUBLIC}
            >
                <button className="btn">
                    Add Credits
                </button>
            </Stripe>
        );
    }
}

export default connect(null, actions)(Payments);