import React, { Component } from 'react';
import Home from './components/home/Home';
import UserMain from './components/user/UserMain';
import TestMain from './components/test/TestMain';
import Signup from './components/signuppage/Signup';
import RulesMain from './components/rules/RulesMain';

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
    else if(window.location.pathname=='/signup'){
      return(
        <div>
          <Signup></Signup>
        </div>
      )
    }
    else if(window.location.pathname=='/rules'){
      return(
        <div>
          <RulesMain></RulesMain>
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
