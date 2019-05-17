import React, { Component } from 'react';

class TestCard extends Component {
  constructor()
  {
    super();
  }
  render() {
    return (
      <div className="test-card" onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}

export default TestCard;
