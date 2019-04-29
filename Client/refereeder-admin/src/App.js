import React, { Component } from 'react';
import Home from './components/home/Home';
import Rules from './components/rules/Rules';
import SubRules from './components/rules/SubRules';
class App extends Component {
  render() {
    if(window.location.pathname==='/rules')
    {
      return(
        <Rules/>
      )
    }
    else if(window.location.pathname==='/subrules')
    {
      const urlParams = new URLSearchParams(window.location.search);
      return(
        <SubRules id={urlParams.get('id')}></SubRules>
      )
    }
    /*else if(window.location.pathname=='/users')
    {
      return(
        <Users/>
      )
    }
    else if(window.location.pathname=='/quizzes')
    {
      return(
        <Quizzes/>
      )
    }
    else if(window.location.pathname=='/test')
    {
      return(
        <Test/>
      )
    }*/
    else{
      return (
        <Home/>
      );
    } 
  }
}

export default App;
