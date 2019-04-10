import React, { Component } from 'react';
import Home from './components/home/Home.js';

class App extends Component {
  render() {
    if(window.location.href.includes('home'))
    {
      return (
          <div>
            <Home></Home>
          </div>
      );
    }
  }
}

export default App;
