import React, { Component } from 'react';
import LoginModal from '../modals/LoginModal';
import Cookies from 'js-cookie';
var loginStatus={
  tried:false,
  could:false,
}

class Navbar extends Component{
  constructor()
  {
    super();
    this.state={
      loggedIn:"",
      modalVisible:false,
    }
  }
  componentWillMount()
  {
    var cookie=Cookies.get('uid');
    console.log(cookie);
    if(cookie)
    {
      fetch(`/graphql/users?query=query{one(id:"${cookie}"){firstName}}`).then(x=>x.json()).then(x=>{
        this.setState({loggedIn:x.data.one.firstName});
       })
    }
  }
  render() {
    return (
      <div>
        <div id="navbar" className="navbar" style={{backgroundColor:this.props.backgroundColor,position:this.props.position}}>
            <div className="navbar-placeholder"></div>
            <div className="navbar-logo">
                <div className="navbar-logo-container">
                    <a href="/"><img src={process.env.PUBLIC_URL+'images/logo.png'}></img></a>
                </div>
            </div>
            <div className="navbar-menu">
              <div>
                <ul>
                  <li><a href="testorquiz">Practice</a></li>
                  <li><a href="rules">See the rules</a></li>
                  <li><div className="navbar-buttons"><a href={this.state.loggedIn==""?'/signup':'/user'} style={{minWidth:100}} className="btn btn-outline-light btn-lg">{this.state.loggedIn==""?"Sign up":this.state.loggedIn}</a>
                  <a href="#" onClick={this.state.loggedIn==""
                  ?
                  ()=>{this.setState({modalVisible:true})}
                  :
                  ()=>{document.cookie="uid=";window.location.reload()}} 
                  className={this.state.loggedIn==""?"btn btn-success btn-lg":"btn btn-danger btn-lg"}>{this.state.loggedIn==""?"Log in":"Log out"}</a></div></li>
                </ul>
              </div>
            </div>
            <div className="navbar-placeholder"></div>
        </div>
        <LoginModal modalVisible={this.state.modalVisible?'flex':'none'} modalPos={this.state.modalVisible?'0px':'-2000px'} onModalCloseClick={(e)=>{e.preventDefault();if(e.target==e.currentTarget){this.setState({modalVisible:false})}}}>
        </LoginModal>
      </div>
    );
  }
}

export default Navbar;
