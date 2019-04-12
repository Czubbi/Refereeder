import React, { Component } from 'react';
import NavbarUser from '../navbar/NavbarUser'

class Home extends Component {
  constructor()
  {
    super();
  }
  render() {
    return (
      <div>
          <NavbarUser></NavbarUser>
      </div>
    );
  }
}

export default Home;
