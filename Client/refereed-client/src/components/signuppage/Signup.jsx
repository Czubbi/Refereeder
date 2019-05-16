import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import NavbarMobile from '../navbar/NavbarMobile';
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
            <div>
              <ul>
                <li>Take a test</li>
                <li>See the rules</li>
                <li><div className="navbar-buttons"><a href="signup" className="btn btn-outline-light btn-lg">Sign up</a>
                <a href="#" onClick={()=>{this.setState({modalVisible:true})}} className="btn btn-success btn-lg">Log in</a></div></li>
              </ul>
            </div>
        </Navbar>
        <NavbarMobile>
          <div className="mobile-menu-content">
            <ul>
                <li>Take a test</li>
                <li>See the rules</li>
                <li><a href="#">Sign up</a></li>
                <li onClick={()=>{this.setState({modalVisible:true})}}><a href="#">Log in</a></li>
            </ul>
          </div>
        </NavbarMobile>
        <SignupHeader></SignupHeader>
        <LoginModal modalVisible={this.state.modalVisible?'flex':'none'} modalPos={this.state.modalVisible?'0px':'-2000px'} onModalCloseClick={(e)=>{e.preventDefault();if(e.target==e.currentTarget){this.setState({modalVisible:false})}}}>
        </LoginModal>
      </div>
    );
  }
}

export default Signup;
