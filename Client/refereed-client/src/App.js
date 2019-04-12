import React, { Component } from 'react';
import Home from './components/home/Home.js';
import UserMain from './components/user/UserMain'

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
    else if(window.location.href.includes('user')){
      return(
        <div>
          <UserMain></UserMain>
        </div>
      )
    }
    else{
      return (<div>
        <Home></Home>
      </div>);
    }
  }
}

export default App;
