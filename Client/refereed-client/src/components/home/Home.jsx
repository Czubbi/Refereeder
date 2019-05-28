import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import NavbarMobile from '../navbar/NavbarMobile';
import Header from '../Header/Header';
import Section from '../section/Section';
import FederationCard from '../cards/FederationCard'
import Footer from '../footer/Footer'
//import FooterNavigation from '../cards/FooterNavigation';
//var $ = require('jquery');

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
             <div className='section-bg-info'>
              <div className="section-bg-info-image">
                <img src={process.env.PUBLIC_URL + '/images/refereeder_website.png'}></img>
              </div>
              <div className="section-bg-info-content">
                <div style={{width:400}}>
                  <p>Refereeder is an E-learning platform for handball referees. You can view all the rules for the game in a convenient way, even during an ongoing match. We focused on creating an easy to use interface so it takes the smallest amount of clicks to find what you need. When you feel confident with your knowledge take tests and compete with others in quizzes!</p>
                </div>
              </div>
             </div>
          </div>
          <div className="section-nobg">
            <div className='home-bottom-info'>
              <div className='home-bottom-info-content'>
                <div style={{width:400}}>
                  <p>Are you a handball referee and looking for a good place to learn, test yourself or are you just looking to be part of the best handball referee community available? Don't hesitate, you are here!</p>
                </div>
              </div>
              <div className='home-bottom-info-image'>
                <img src={process.env.PUBLIC_URL + '/images/ball_homepage.png'}></img>
              </div>
              
            </div>
          </div>
        </Section>
        <Footer>
        </Footer>
      </div>
    );
  }
}

export default Home;
