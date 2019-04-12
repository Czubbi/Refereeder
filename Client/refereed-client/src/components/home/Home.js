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
        </Section>
        <Footer>
          <div className='footer-wrapper'>
            <div className='footer-content-left'>
              <a href="/"><img src={process.env.PUBLIC_URL+'images/logo.png'}></img></a>
            </div>
            <div className='footer-content-right'>
              <div className='footer-card-container'>
                <FooterNavigation>
                  <h3>Content:</h3>
                    <ul>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                    </ul>
                </FooterNavigation>
                <FooterNavigation>
                  <h3>About:</h3>
                    <ul>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                    </ul>
                </FooterNavigation>
                <FooterNavigation>
                  <h3>Help:</h3>
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
