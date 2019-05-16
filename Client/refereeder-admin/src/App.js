import React, { Component } from 'react';
import Home from './components/home/Home';
import Rules from './components/rules/Rules';
import SubRules from './components/rules/SubRules';
import Questions from './components/questions/Questions';
import Answers from './components/questions/Answers';
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
    else if(window.location.pathname==='/questions')
    {
      return(
        <Questions/>
      )
    }
    else if(window.location.pathname==='/answers')
    {
      const urlParams = new URLSearchParams(window.location.search);
      return(
        <Answers id={urlParams.get('id')}></Answers>
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
    }*/
    else{
      return (
        <Home/>
      );
    } 
  }
}

export default App;
