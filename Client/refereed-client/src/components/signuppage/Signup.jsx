import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import SignupHeader from '../Header/SignupHeader';
import LoginModal from '../modals/LoginModal';
var $ = require('jquery');

class Signup extends Component {
  constructor()
  {
    super();
    this.state={
      modalVisible:false,
    }
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
          document.cookie=`uid=${x}`;
          window.location.reload();
        }
        else{
          window.location.reload();
        }
      },
    })
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
  render() {
    return (
      <div>
        <Navbar position="absolute" backgroundColor="transparent">
        </Navbar>
        <SignupHeader></SignupHeader>
        <LoginModal modalVisible={this.state.modalVisible?'flex':'none'} modalPos={this.state.modalVisible?'0px':'-2000px'} onModalCloseClick={(e)=>{e.preventDefault();if(e.target==e.currentTarget){this.setState({modalVisible:false})}}}>
        </LoginModal>
      </div>
    );
  }
}

export default Signup;
