import React, { Component } from 'react';
import FooterNavigation from '../cards/FooterNavigation';

class Footer extends Component{
  render() {
    return (
      <div>
        <div className="footer">
        <div className='footer-wrapper'>
            <div className='footer-content-left'>
              <a href="/"><img src={process.env.PUBLIC_URL+'images/logo.png'}></img></a>
            </div>
            <div className='footer-content-right'>
              <div className='footer-card-container'>
                <FooterNavigation>
                  <h6>CONTACT</h6>
                    <ul>
                      <li><a href='javascript:void(0)'>Something</a></li>
                      <li><a href='javascript:void(0)'>Something</a></li>
                      <li><a href='javascript:void(0)'>Something</a></li>
                      <li><a href='javascript:void(0)'>Something</a></li>
                      <li><a href='javascript:void(0)'>Something</a></li>
                    </ul>
                </FooterNavigation>
                <FooterNavigation>
                  <h6>ABOUT</h6>
                    <ul>
                      <li><a href='javascript:void(0)'>Something</a></li>
                      <li><a href='javascript:void(0)'>Something</a></li>
                      <li><a href='javascript:void(0)'>Something</a></li>
                    </ul>
                </FooterNavigation>
                <FooterNavigation>
                  <h6>HELP</h6>
                    <ul>
                      <li><a href='javascript:void(0)'>Something</a></li>
                      <li><a href='javascript:void(0)'>Something</a></li>
                    </ul>
                </FooterNavigation>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
