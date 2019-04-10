import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import NavbarMobile from '../navbar/NavbarMobile';
import Header from '../Header/Header.js';
import Section from '../section/Section.js';

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <NavbarMobile></NavbarMobile>
        <Header></Header>
        <Section></Section>
      </div>
    );
  }
}

export default Home;
