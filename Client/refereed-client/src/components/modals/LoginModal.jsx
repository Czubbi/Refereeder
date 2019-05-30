import React, { Component } from 'react';
import { DEFAULT_ECDH_CURVE } from 'tls';
var $ = require('jquery');
var moment = require('moment');

class LoginModal extends Component{
    constructor(){
        super();
        this.filterRef = React.createRef();
        this.modalRef = React.createRef();
        this.state={
            passwordForgot:false,
        }
    }
    changeVisible()
    {
        setTimeout(() => {
            this.setState({modalVisible:true});
        }, 1000);
    }
    passwordReset=()=>{
        var body=$("#loginform").serialize();
        $.ajax({
          method:'POST',
          data:body,
          url:'/api/forgotpass',
          success:(x)=>{
            window.location.reload();
          },
        })
      }
    login=()=>{
        var body=$("#loginform").serialize();
        $.ajax({
          method:'POST',
          data:body,
          url:'/api/login',
          success:(x)=>{
            if(x)
            {
              var date=new Date(moment().add(1,'month').toDate());
              document.cookie=`uid=${x}; expires=${date.toUTCString()}`;
              window.location.reload();
            }
            else{
              window.location.reload();
            }
          },
        })
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
                <div className="my-modal" ref={this.modalRef}>
                    <i className="fas fa-times-circle" onClick={(e)=>{this.props.onModalCloseClick(e)}}></i>
                    <img style={{width:"70%",marginBottom:20,filter:'invert(100%)'}} src={process.env.PUBLIC_URL + "images/logo.png"} />
                    <div>
                        {this.state.passwordForgot?
                            (<form id="loginform"><input type="email" placeholder="Email" name="email" className="form-control"/>
                            <input type="submit" value="Send email" style={{backgroundColor:"#28a745"}} onClick={this.passwordReset} className="form-control btn-success"/>
                            <h6 onClick={()=>{this.setState({passwordForgot:false})}}>Sign in!</h6></form>)
                            :
                            (<form id="loginform">
                            <input type="email" placeholder="Email" name="email" className="form-control"/>
                            <input type="password" placeholder="Password" name="password" className="form-control"/>
                            <input type="submit" value="Log in" style={{backgroundColor:"#28a745"}} onClick={this.login} className="form-control btn-success"/>
                            <h6 onClick={()=>{this.setState({passwordForgot:true})}}>Forgot your password?</h6></form>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default LoginModal;
