import React, { Component } from 'react';

class Navbar extends Component{
  render() {
    return (
      <div>
        <div id="navbar" className="navbar">
            <div className="navbar-placeholder"></div>
            <div className="navbar-logo">
                <div class="navbar-logo-container">
                    <img src={process.env.PUBLIC_URL+'images/logo.png'}></img>
                </div>
            </div>
            <div className="navbar-menu">
                <div>
                    <ul>
                        <li>Take a test</li>
                        <li>See the rules</li>
                        <li><div className="navbar-buttons"><a href="#" className="btn btn-outline-light btn-lg">Sign up</a>
                        <a href="#" onClick={this.props.loginButtonClick} className="btn btn-success btn-lg">Log in</a></div></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-placeholder"></div>
        </div>
      </div>
    );
  }
}

export default Navbar;
