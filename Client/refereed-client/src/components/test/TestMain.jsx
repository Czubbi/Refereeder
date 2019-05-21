import React, { Component } from 'react';
import Navbar from '../navbar/Navbar'
import NavbarMobile from '../navbar/NavbarMobile';
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
          </Navbar>
          <NavbarMobile position='relative' backgroundColor='black'></NavbarMobile>
          <Section>
            <div className='test-content-wrapper'>
            <div className='test-card-holder'>
              <TestCard bgcolor='#222222'>
                <div>
                  <i  style={{color:'white'}} className="fas fa-clipboard-check"></i><br/>
                  <font color="white">Take a test in a selected topic</font>
                </div>
              </TestCard>
              <TestCard bgcolor='#F1F1F1'>
                <div>
                <i className="fas fa-envelope-open-text"></i><br/>
                  Test your knowledge broadly
                </div>
              </TestCard>
              <TestCard bgcolor='#F1F1F1'>
                <div>
                  <i className="fas fa-question"></i><br/>
                  Take a quiz
                </div>
              </TestCard>
              <TestCard bgcolor='#222222'>
                <div>
                  <i style={{color:'white'}} className="fas fa-flag-checkered"></i><br></br>
                  <font color="white"> Compete with other referees in a quiz</font>
                </div>
              </TestCard>
            </div>
            </div>
          </Section>
          <Footer>
        </Footer>
      </div>
    );
  }
}

export default TestMain;
