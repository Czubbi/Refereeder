import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="navbar">
            <div className="navbar-placeholder"></div>
            <div className="navbar-logo">
                <h1>Refereeder</h1>
            </div>
            <div className="navbar-menu">
                <div>
                    <ul>
                        <li>Test</li>
                        <li>Rules</li>
                        <li>Sign up</li>
                        <li>Log in</li>
                    </ul>
                </div>
            </div>
            <div className="navbar-placeholder"></div>
        </div>
      </div>
    );
  }
}

export default Home;
