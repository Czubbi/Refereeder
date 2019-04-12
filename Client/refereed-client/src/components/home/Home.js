import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import NavbarMobile from '../navbar/NavbarMobile';
import Header from '../Header/Header.js';
import Section from '../section/Section.js';
import LoginModal from '../modals/LoginModal';
import FederationCard from '../cards/FederationCard'
import Footer from '../footer/Footer'
import FooterNavigation from '../cards/FooterNavigation';

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
        <Navbar backgroundColor="transparent">
            <div>
              <ul>
                <li>Take a test</li>
                <li>See the rules</li>
                <li><div className="navbar-buttons"><a href="#" className="btn btn-outline-light btn-lg">Sign up</a>
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
        <Header></Header>
        <Section>
          <div className="card-wrapper">
            <div>
              <h3>Federations: </h3>
              <div className="card-container">
                <FederationCard>
                  <div className="card-top"></div>
                  <div className="card-bottom">
                  <h4>Federation Name</h4>
                  <p>Some text</p>
                  </div>
                </FederationCard>
                <FederationCard>
                  <div className="card-top"></div>
                  <div className="card-bottom">
                  <h4>Federation Name</h4>
                  <p>Some text</p>
                  </div>
                </FederationCard>
                <FederationCard>
                  <div className="card-top"></div>
                  <div className="card-bottom">
                  <h4>Federation Name</h4>
                  <p>Some text</p>
                  </div>
                </FederationCard>
              </div>
            </div>
          </div>
          <div className="section-bg">

          </div>
          <div className="section-nobg">
          </div>
        </Section>
        <Footer>
          <div className='footer-wrapper'>
            <div className='footer-content-left'>
              <a href="/"><img src={process.env.PUBLIC_URL+'images/logo.png'}></img></a>
            </div>
            <div className='footer-content-right'>
              <div className='footer-card-container'>
                <FooterNavigation>
                  <h6>CONTACT</h6>
                    <ul>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                    </ul>
                </FooterNavigation>
                <FooterNavigation>
                  <h6>ABOUT</h6>
                    <ul>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                    </ul>
                </FooterNavigation>
                <FooterNavigation>
                  <h6>HELP</h6>
                    <ul>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                    </ul>
                </FooterNavigation>
              </div>
            </div>
          </div>
        </Footer>
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
