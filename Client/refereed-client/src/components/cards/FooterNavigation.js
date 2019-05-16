import React, { Component } from 'react';
class FooterNavigation extends Component {
  constructor()
  {
    super();
  }
  render() {
    return (
      <div className="footer-card" onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}

export default FooterNavigation;
