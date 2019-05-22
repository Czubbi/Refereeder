import React, { Component } from 'react';
import Home from './components/home/Home';
import UserMain from './components/user/UserMain';
import TestMain from './components/test/TestMain';
import Signup from './components/signuppage/Signup';
import RulesMain from './components/rules/RulesMain';
import Test from './components/test/Test';
import Quiz from './components/test/Quiz';
import Cookies from 'js-cookie';

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
      var uid=Cookies.get('uid');
      if(uid){
        return(
          <div>
            <UserMain></UserMain>
          </div>
        )
      }
      else window.location.replace('/');
    }
    else if(window.location.pathname=='/testorquiz'){
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
    else if(window.location.pathname=='/test'){
      var url_string = window.location.href;
      var url=new URL(url_string);
      var mode = url.searchParams.get('mode');
      return(
        <div>
          <Test mode={mode}></Test>
        </div>
      )
    }
    else if(window.location.pathname=='/quiz'){
      var url_string = window.location.href;
      var url=new URL(url_string);
      var mode = url.searchParams.get('mode');
      if(!Cookies.get('uid') && mode=='compete'){
        window.location.replace('/testorquiz');
      }
      else return(
        <div>
          <Quiz mode={mode}></Quiz>
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
