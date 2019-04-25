import React, { Component } from 'react';
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import FooterNavigation from '../cards/FooterNavigation';
import Section from '../section/Section';
import TestCard from '../cards/TestCard'

class TestMain extends Component {
  constructor()
  {
    super();
    
  }

  
  render() {
    return (
      <div>
          <Navbar position="relative" backgroundColor="black">
          <div>
              <ul>
                <li>Take a test</li>
                <li>See the rules</li>
                <li><div className="navbar-buttons"><a href="#" className="btn btn-outline-secondary btn-lg">Czubbi</a>
                <a href="#" onClick={()=>{this.setState({modalVisible:true})}} className="btn btn-outline-light btn-lg">Log out</a></div></li>
              </ul>
            </div>
          </Navbar>
          <Section>
            <div className='test-content-wrapper'>
            <div className='test-card-holder'>
              <TestCard></TestCard>
              <TestCard></TestCard>
              <TestCard></TestCard>
              <TestCard></TestCard>
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
      </div>
    );
  }
}

export default TestMain;
