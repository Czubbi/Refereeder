import React, { Component } from 'react';
import Cookies from 'js-cookie';
var $ = require('jquery');


class NoteModal extends Component{
    constructor(){
        super();
        this.filterRef = React.createRef();
        this.modalRef = React.createRef();
        this.state={
            loggedIn:null,
        }
    }
    componentDidMount(){
        var uid=Cookies.get('uid');
        if(uid){
            this.setState({loggedIn:uid});
        }
        else{
            this.setState({loggedIn:null});
        }
    }
    changeVisible()
    {
        setTimeout(() => {
            this.setState({modalVisible:true});
        }, 1000);
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
            <div className="modal-filter" ref={this.filterRef} onClick={(e)=>{this.props.onModalCloseClick(e)}}>
                <div className="my-modal note-modal" ref={this.modalRef}>
                    <i className="fas fa-times-circle" onClick={(e)=>{this.props.onModalCloseClick(e)}}></i>
                    <div>
                        {this.state.loggedIn?
                            (<div>
                                <p align="left"><span className="far fa-sticky-note"></span> Write your notes about the rule here:</p>
                                <textarea className="form-control" style={{resize:'none'}} id="comment-field" rows="8" cols="50"></textarea>
                                <button className="my-submit-button" onClick={(e)=>{console.log($('#comment-field').val())}}>Submit</button>
                                <button className="my-clear-button" onClick={(e)=>{$('#comment-field').val('')}}>Clear</button>
                            </div>)
                            :
                            (<div>
                                <span style={{fontSize:30}} className="fas fa-exclamation-triangle"></span>
                                <h4>Disclaimer</h4>
                                <p>You are not logged in!<br />
                                In order to create notes you have to log in.<br />
                                Don't have an account? Register by clicking <a href='/signup' onClick={(e)=>{window.location.replace('/signup')}}>here</a>!</p>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default NoteModal;
