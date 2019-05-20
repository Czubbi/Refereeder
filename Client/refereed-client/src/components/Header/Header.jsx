import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <div id="header" className="header">
           <div className="header-content">
            <div className="header-login">
                <h2>The new standard within referee and federation contact</h2>
                <p>Become a member of the most prospering service for handball referees and their federations.</p>
                <p>We help thousands of qualified referees and federations with contact and stuff...</p>
                <h4><br/>Your Federation is not a partner yet? <br/>Let us know!</h4>
                <div className="header-buttons">
                  {/*<a href="#" className="btn btn-success btn-lg">Sign up</a>*/}
                  <a href="#" className="btn btn-primary btn-lg">Contact us!</a>
                  {/*<a href="#" className="btn btn-warning btn-lg">Test your knowledge</a>*/}
                </div>
            </div>
           </div>
           <div className="header-placeholder"></div>
        </div>
      </div>

    );
  }
}

export default Header;
