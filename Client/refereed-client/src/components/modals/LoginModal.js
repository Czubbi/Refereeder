import React, { Component } from 'react';
import { DEFAULT_ECDH_CURVE } from 'tls';

class Navbar extends Component{
    constructor(){
        super();
        this.filterRef = React.createRef();
        this.modalRef = React.createRef();
    }
    componentDidUpdate(){
        if(this.props.modalVisible=='flex'){
            this.filterRef.current.style.display=this.props.modalVisible;
            setTimeout(() => {
                this.modalRef.current.style.top=this.props.modalPos;
            }, 30);
        }
        else{
            this.modalRef.current.style.top=this.props.modalPos;
            setTimeout(() => {
                this.filterRef.current.style.display=this.props.modalVisible;
            }, 300);
        }
    }
    render() {
        return (
        <div>
            <div className="modal-filter" ref={this.filterRef}>
                <div className="my-modal" ref={this.modalRef}>
                    <i className="fas fa-times-circle" onClick={this.props.onModalCloseClick}></i>
                    {this.props.children}
                </div>
            </div>
        </div>
    );
  }
}

export default Navbar;
