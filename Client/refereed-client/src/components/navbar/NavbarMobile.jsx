import React, { Component } from "react";
import LoginModal from '../modals/LoginModal';
import Cookies from 'js-cookie';
var loginStatus={
  tried:false,
  could:false,
}


class NavbarMobile extends Component {
  constructor() {
    super();
    this.state = {
      menuVisible: false,
      loggedIn:"",
      modalVisible:false,
    };
    this.filterRef=React.createRef();
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
  componentDidUpdate(){
    this.filterRef.current.style.display=this.state.menuVisible?'block':'none';
    setTimeout(() => {
      this.filterRef.current.style.opacity=this.state.menuVisible?1:0
    }, 100);
  }
  render() {
    return (
      <div>
        <div className="mobile-menu-filter" ref={this.filterRef} onClick={()=>{this.setState({menuVisible:false})}}>
        </div>
        <div className="mobile-menu" style={{left:this.state.menuVisible?'0px':'-70%'}}>
            <div className="mobile-menu-logo" onClick={(e)=>{window.location.replace('/')}}>
              <a href='/' style={{paddingLeft:30,paddingRight:0}}><img alt="Logo" src={process.env.PUBLIC_URL + "images/logo.png"} /></a>
            </div>
            <div className="mobile-menu-content">
            <ul>
                <li><a href="testorquiz">Practice</a></li>
                <li><a href="rules">See the rules</a></li>
                <li><a href="signup">Sign up</a></li>
                <li onClick={this.state.loggedIn==""
                  ?
                  ()=>{this.setState({modalVisible:true})}
                  :
                  ()=>{document.cookie="uid=";window.location.reload()}}><a href="#">{this.state.loggedIn?'Log out':'Log in'}</a></li>
            </ul>
          </div>
        </div>
        <div id="navbar-mobile" style={{backgroundColor:this.props.backgroundColor,position:this.props.position}} className="navbar-mobile">
          <div className="navbar-mobile-logo">
            <a href='/' style={{paddingLeft:30,paddingRight:0}}><img src={process.env.PUBLIC_URL + "images/logo.png"} /></a>
          </div>
          <div className="navbar-mobile-button" onClick={() => {this.setState({ menuVisible: !this.state.menuVisible });}}>
            <i className="fas fa-bars" />
          </div>
        </div>
        <LoginModal modalVisible={this.state.modalVisible?'flex':'none'} modalPos={this.state.modalVisible?'0px':'-2000px'} onModalCloseClick={(e)=>{e.preventDefault();if(e.target==e.currentTarget){this.setState({modalVisible:false})}}}>
        </LoginModal>
      </div>
    );
  }
}

export default NavbarMobile;
