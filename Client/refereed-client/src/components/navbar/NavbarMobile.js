import React, { Component } from "react";

class NavbarMobile extends Component {
  constructor() {
    super();
    this.state = {
      menuVisible: false
    };
    this.filterRef=React.createRef();
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
            <div className="mobile-menu-logo">
                <img src={process.env.PUBLIC_URL + "images/logo.png"} />
            </div>
            <div className="mobile-menu-content">
                <ul>
                    <li>Take a test</li>
                    <li>See the rules</li>
                    <li><a href="#">Sign up</a></li>
                    <li onClick={this.props.loginButtonClick}><a href="#">Log in</a></li>
                </ul>
            </div>
        </div>
        <div id="navbar-mobile" className="navbar-mobile">
          <div className="navbar-mobile-logo">
            <img src={process.env.PUBLIC_URL + "images/logo.png"} />
          </div>
          <div className="navbar-mobile-placeholder" />
          <div className="navbar-mobile-button" onClick={() => {this.setState({ menuVisible: !this.state.menuVisible });}}>
            <i className="fas fa-bars" />
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarMobile;
