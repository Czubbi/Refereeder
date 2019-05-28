import React, { Component } from 'react';
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
//import FooterNavigation from '../cards/FooterNavigation';
import Section from '../section/Section';
import PieChart from '../charts/PieChart';
import BarChart from '../charts/BarChart';
import Cookies from 'js-cookie';

class UserMain extends Component {
  constructor()
  {
    super();
    this.state={
      user:null,
      chartDataBar:{},
      chartDataPie:{}
    }
  }
  getUser=()=>{
    return new Promise((resolve,reject)=>{
      var uid=Cookies.get('uid');
      fetch(`/api/users/${uid}`).then(x=>x.json()).then(x=>{
        resolve(x);
      }).catch(err=>{
        reject(err);
      });
    })
  }
  componentDidMount(){
    this.getUser().then(x=>{
      this.setState({user:x})
    }).catch(err=>{
      console.log(err);
    });
  }
  render() {
    if(this.state.user){
    return (
      <div>
          <Navbar position="relative" backgroundColor="black">
          </Navbar>
          <Section>
            <div className='user-content-wrapper'>
              <div className='user-menu'>
                <div className='user-img'>

                </div>
                <div className='user-menu-list'>
                <ul>
                <li>{this.state.user.firstName+' '+this.state.user.lastName}</li>
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
                      <BarChart user={this.state.user}></BarChart>
                    </div>
                    <div className="user-info-chartcard">
                      <PieChart user={this.state.user}></PieChart>
                    </div>
                  </div>
                  <div className="user-info-placeholder"></div>
                </div>
                <div className="user-info-bottom">
                    <div className="user-info-bigcard">
                      <div className="user-info-bigcard-grid">
                        
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </Section>
          <Footer>
        </Footer>
      </div>
    );}
    else return null;
  }
}

export default UserMain;
