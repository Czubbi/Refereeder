import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import Section from '../section/Section.js'

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Section></Section>
      </div>
    );
  }
}

export default Home;
