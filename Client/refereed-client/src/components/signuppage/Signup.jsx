import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import NavbarMobile from '../navbar/NavbarMobile';
import SignupHeader from '../Header/SignupHeader';
import Section from '../section/Section.js';
import LoginModal from '../modals/LoginModal';
import FederationCard from '../cards/FederationCard'
import Footer from '../footer/Footer'
import FooterNavigation from '../cards/FooterNavigation';
var $ = require('jquery');

class Signup extends Component {
  constructor()
  {
    super();
    this.state={
      modalVisible:false,
      passwordForgot:false,
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
        </LoginModal>
        

      </div>
    );
  }
}

export default Signup;
