import React, { Component } from 'react';
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import FooterNavigation from '../cards/FooterNavigation';
import Section from '../section/Section';
import PieChart from '../charts/PieChart'
import BarChart from '../charts/BarChart'

class UserMain extends Component {
  constructor()
  {
    super();
    this.state={
      chartDataBar:{},
      chartDataPie:{}
    }
  }

  componentWillMount(){
    this.setState({
      chartDataBar:{
        labels: ['Week: 1', 'Week: 2'],
        datasets:[
            {
                label: 'Label',
                data: [
                    
                    3,
                    6,
                ],
                backgroundColor:[
                    'rgba(54,162,235,0.6)',
                    'rgba(54,162,235,0.6)',
                ]
              }
          ]
      }
    });
    this.setState({
      chartDataPie: {
        labels: ['Good Answers', 'Bad Answers'],
        datasets:[
            {
                data: [
                    123,
                    620
                ],
                backgroundColor:[
                    'rgba(54,162,235,0.6)',
                    'rgba(255,99,132,0.6)',
                ]
            }
        ]
      }
    }) 
  }
  /* componentWillMount(){
    this.getChartData();
  } */

  getChartData(){
    this.setState({
      chartDataBar:{
        labels: ['Week: 1', 'Week: 2'],
        datasets:[
            {
                label: 'Label',
                data: [
                    
                    3,
                    6,
                ],
                backgroundColor:[
                    'rgba(54,162,235,0.6)',
                    'rgba(54,162,235,0.6)',
                ]
              }
          ]
      },
      chartDataPie: {
        labels: ['Good Answers', 'Bad Answers'],
        datasets:[
            {
                data: [
                    123,
                    620
                ],
                backgroundColor:[
                    'rgba(54,162,235,0.6)',
                    'rgba(255,99,132,0.6)',
                ]
            }
        ]
      }
    }) 
  }

  render() {
    return (
      <div>
          <Navbar position="relative" backgroundColor="black">
          <div>
              <ul>
                <li>Take a test</li>
                <li>See the rules</li>
                <li><div className="navbar-buttons"><a href="#" className="btn btn-outline-secondary btn-lg">Czubbi</a>
                <a href="#" onClick={()=>{this.setState({modalVisible:true})}} className="btn btn-outline-light btn-lg">Log out</a></div></li>
              </ul>
            </div>
          </Navbar>
          <Section>
            <div className='user-content-wrapper'>
              <div className='user-menu'>
                <div className='user-img'></div>
                <div className='user-menu-list'>
                <ul>
                <li>Profile</li>
                <li>Tests</li>
                <li>Statistics</li>
              </ul>
                </div>
              </div>
              <div className='user-info-wrapper'>
                <div className='user-info-top'>
                  <div className="user-info-placeholder"></div>
                  <div className="user-info-chartholder">
                    <div className="user-info-chartcard">
                      <BarChart chartDataBar={this.state.chartDataBar}></BarChart>
                    </div>
                    <div className="user-info-chartcard">
                      <PieChart chartDataPie={this.chartDataPie}></PieChart>
                    </div>
                  </div>
                  <div className="user-info-placeholder"></div>
                </div>
                <div className="user-info-bottom">

                </div>
              </div>
            </div>
            <div className="section-bg">
            </div>
            <div className="section-nobg">
            </div>
          </Section>
          <Footer>
          <div className='footer-wrapper'>
            <div className='footer-content-left'>
              <a href="/"><img src={process.env.PUBLIC_URL+'images/logo.png'}></img></a>
            </div>
            <div className='footer-content-right'>
              <div className='footer-card-container'>
                <FooterNavigation>
                  <h6>CONTACT</h6>
                    <ul>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                    </ul>
                </FooterNavigation>
                <FooterNavigation>
                  <h6>ABOUT</h6>
                    <ul>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                    </ul>
                </FooterNavigation>
                <FooterNavigation>
                  <h6>HELP</h6>
                    <ul>
                      <li><a href='#'>Something</a></li>
                      <li><a href='#'>Something</a></li>
                    </ul>
                </FooterNavigation>
              </div>
            </div>
          </div>
        </Footer>
      </div>
    );
  }
}

export default UserMain;
