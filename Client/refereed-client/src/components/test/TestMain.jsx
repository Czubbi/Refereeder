import React, { Component } from 'react';
import Navbar from '../navbar/Navbar'
import NavbarMobile from '../navbar/NavbarMobile';
import Footer from '../footer/Footer'
import FooterNavigation from '../cards/FooterNavigation';
import Section from '../section/Section';
import TestCard from '../cards/TestCard'
import Cookies from 'js-cookie';
class TestMain extends Component {
  constructor()
  {
    super();
    this.state={
      loggedIn:false
    }
  }
  componentDidMount(){
    var uid=Cookies.get('uid');
    console.log(uid);
    if(uid){
      this.setState({loggedIn:true});
    }
  }
  render() {
    return (
      <div>
          <Navbar position="relative" backgroundColor="black">
          </Navbar>
          <NavbarMobile position='relative' backgroundColor='black'></NavbarMobile>
          <Section>
            <div className='test-content-wrapper'>
            <div className='test-card-holder'>
              <TestCard onClick={()=>{/**window.location.replace('/test?mode=selection')*/}} style={{width:'calc(25vw - 30px)',height:'calc(30vh - 30px)'}} cursor="not-allowed" bgcolor='#222222'>
              <div className="test-card-overlay construction"  style={{backgroundColor:'#ffd632',border:'5px solid black'}}>
                  <div>
                    <i style={{color:'black'}} className="fas fa-tools"></i><br></br>
                    <font color='black'>Under construction</font>
                  </div>
                </div>
                <div>
                  <i style={{color:'white'}} className="fas fa-clipboard-check"></i><br/>
                  <font color="white">Take a test in a selected topic</font>
                </div>
              </TestCard>
              <TestCard onClick={()=>{/*window.location.replace('/test?mode=all')*/}} cursor="not-allowed" bgcolor='#F1F1F1'>
              <div className="test-card-overlay construction" style={{backgroundColor:'#ffd632',border:'5px solid black'}}>
                  <div>
                    <i style={{color:'black'}} className="fas fa-tools"></i><br></br>
                    <font color='black'>Under construction</font>
                  </div>
                </div>
                <div>
                <i className="fas fa-envelope-open-text"></i><br/>
                  Test your knowledge broadly
                </div>
              </TestCard>
              <TestCard onClick={()=>{window.location.replace('/quiz?mode=single')}} bgcolor='#F1F1F1'>
                <div>
                  <i className="fas fa-question"></i><br/>
                  Take a quiz
                </div>
              </TestCard>
              <TestCard onClick={this.state.loggedIn?()=>{window.location.replace('/quiz?mode=compete')}:()=>{}} cursor={this.state.loggedIn?'pointer':'not-allowed'} bgcolor='#222222'>
                {this.state.loggedIn?null:<div className="test-card-overlay">
                  <div>
                    <i style={{color:'white'}} className="fas fa-lock"></i><br></br>
                    <font color='white'>{this.state.loggedIn?'':'You must be logged in to compete with others.'}</font>
                  </div>
                </div>}
                <div>
                  <i style={{color:'white'}} className="fas fa-flag-checkered"></i><br></br>
                  <font color="white"> Compete with other referees in a quiz</font><br></br>
                </div>
              </TestCard>
            </div>
            </div>
          </Section>
          <Footer>
        </Footer>
      </div>
    );
  }
}

export default TestMain;
