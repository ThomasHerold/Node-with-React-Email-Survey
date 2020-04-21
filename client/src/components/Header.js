import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {

    renderContent () {
      switch(this.props.auth) {
        case null:
          return;
        case false:
          return (
            <>
            <li><a href="/auth/google"><i className="fa fa-google" /> Sign In With Google</a></li>
            <li><a href="/auth/facebook"><i className="fa fa-facebook" /> Sign In With Facebook</a></li>
            </>
          );
        default:
          return (
            <> 
            <li key="1"><Payments /></li>
            <li key="3" style={{ marginLeft: '10px' }}>Credits: {this.props.auth.credits}</li>
            <li key="2"><a href="/api/logout">Logout</a></li>
            </>
          );
      }
    }

    render() {
        return (
          <nav>
            <div className="nav-wrapper">
              <Link 
                to={ this.props.auth ? "/surveys" : "/" } 
                className="left brand-logo" 
                style={{ marginLeft: 10 }} 
              >
                Emaily
              </Link>
              <ul className="right">
                {this.renderContent()}
              </ul>
            </div>
          </nav>
    );
 }
}

const mapStateToProps = ({ auth }) => {
  return { auth: auth };
}

export default connect(mapStateToProps)(Header);