import React, { Component } from 'react';

class Navbar extends Component{
  render() {
    return (
      <div>
        <div id="navbar" className="navbar" style={{backgroundColor:this.props.backgroundColor}}>
            <div className="navbar-placeholder"></div>
            <div className="navbar-logo">
                <div className="navbar-logo-container">
                    <a href="/"><img src={process.env.PUBLIC_URL+'images/logo.png'}></img></a>
                </div>
            </div>
            <div className="navbar-menu">
                {this.props.children}
            </div>
            <div className="navbar-placeholder"></div>
        </div>
      </div>
    );
  }
}

export default Navbar;
