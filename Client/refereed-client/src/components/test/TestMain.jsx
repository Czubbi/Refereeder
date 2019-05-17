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
          <NavbarMobile></NavbarMobile>
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
        </Footer>
      </div>
    );
  }
}

export default TestMain;
