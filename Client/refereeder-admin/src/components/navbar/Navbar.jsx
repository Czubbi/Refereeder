import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <div className="my-navbar">
        <div className="placeholder"></div>  
          <div className="main-menu">
            <ul>
              <li><a href='/rules'><i className="fas fa-book"></i>&emsp;Rules</a></li>
              <li><a href='/users'><i className="fas fa-user"></i>&emsp;Users</a></li>
              <li><a href='/quizzes'><i className="fas fa-question"></i>&emsp;Quizzes</a></li>
              <li><a href='/tests'><i className="fas fa-poll-h"></i>&emsp;Tests</a></li>
            </ul>
          </div>
          <div className="placeholder"></div>
      </div>
    );
  }
}

export default Navbar;
