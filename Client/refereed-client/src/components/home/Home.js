import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import NavbarMobile from '../navbar/NavbarMobile';
import Header from '../Header/Header.js';
import Section from '../section/Section.js';
import FederationCard from '../cards/FederationCard'
import Footer from '../footer/Footer'
import FooterNavigation from '../cards/FooterNavigation';
var $ = require('jquery');

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
        <Navbar position="absolute" backgroundColor="transparent">
        </Navbar>
        <NavbarMobile>
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
        </Footer>
      </div>
    );
  }
}

export default Home;
