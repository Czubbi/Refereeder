import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import NavbarMobile from '../navbar/NavbarMobile';
import Header from '../Header/Header.js';
import Section from '../section/Section.js';
import LoginModal from '../modals/LoginModal';
import FederationCard from '../cards/FederationCard'

class Home extends Component {
  constructor()
  {
    super();
    this.state={
      modalVisible:false,
    }
  }
  render() {
    return (
      <div>
        <Navbar loginButtonClick={()=>{this.setState({modalVisible:true})}}></Navbar>
        <NavbarMobile loginButtonClick={()=>{this.setState({modalVisible:true})}}></NavbarMobile>
        <Header></Header>
        <Section>
          <div className="card-wrapper">
            <div>
              <h3>Federations: </h3>
              <div className="card-container">
                <FederationCard>
                  <div className="card-top"></div>
                  <div className="card-bottom"></div>
                </FederationCard>
                <FederationCard>
                  <div className="card-top"></div>
                  <div className="card-bottom"></div>
                </FederationCard>
                <FederationCard>
                  <div className="card-top"></div>
                  <div className="card-bottom"></div>
                </FederationCard>
              </div>
            </div>
          </div>
        </Section>
        <LoginModal modalVisible={this.state.modalVisible?'flex':'none'} modalPos={this.state.modalVisible?'0px':'-2000px'} onModalCloseClick={(e)=>{e.preventDefault();if(e.target==e.currentTarget){this.setState({modalVisible:false})}}}>
          <img style={{width:"70%",marginBottom:20,filter:'invert(100%)'}} src={process.env.PUBLIC_URL + "images/logo.png"} />
          <div>
            <form>
              <input type="email" placeholder="Email" className="form-control"/>
              <input type="password" placeholder="Password" className="form-control"/>
              <input type="submit" value="Log in" style={{backgroundColor:"#28a745"}} className="form-control btn-success"/>
              <h6>Forgot your password?</h6>
            </form>
          </div>
        </LoginModal>
        

      </div>
    );
  }
}

export default Home;
