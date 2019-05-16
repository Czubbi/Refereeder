import React, { Component } from 'react';

class ModalBase extends Component {
  render() {
    return (
        <div className="my-modal-filter" style={{display:this.props.open?'flex':'none'}}>
            <div className="my-modal-box">
                <i className="fas fa-times-circle" onClick={this.props.onCloseClick}></i>
                <div className="my-modal-body">
                    <div className="my-modal-title">
                        <h3>{this.props.title}</h3>
                    </div>
                    <div className="my-modal-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default ModalBase;
