import React, { Component } from 'react';
import Home from './components/home/Home.js';
import UserMain from './components/user/UserMain'
import TestMain from './components/test/TestMain'

class App extends Component {
  render() {
    if(window.location.pathname=='/home')
    {
      return (
          <div>
            <Home></Home>
          </div>
      );
    }
    else if(window.location.pathname=='/user'){
      return(
        <div>
          <UserMain></UserMain>
        </div>
      )
    }
    else if(window.location.pathname=='/test'){
      return(
        <div>
          <TestMain></TestMain>
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
