import React, { Component } from 'react';
import Navbar from '../navbar/Navbar'
import Topbar from '../navbar/Topbar'

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Topbar title="Home page"/>
        <div className='content'>
          WELCOME IN OUR HOME PANEL
        </div>
      </div>
    );
  }
}

export default Home;
