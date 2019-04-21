import React, { Component } from 'react';

class AddButton extends Component {
    constructor(){
        super();
    }
  render() {
    return (
      <div className="add-button-circle" onClick={this.props.onBtnClick}> 
        <i className="fas fa-plus"></i>
      </div>
    );
  }
}

export default AddButton;
