import React, { Component } from 'react';

class Footer extends Component{
  render() {
    return (
      <div>
        <div className="footer">
            {this.props.children}
        </div>
      </div>
    );
  }
}

export default Footer;
