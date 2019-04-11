import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import NavbarMobile from '../navbar/NavbarMobile';
import Header from '../Header/Header.js';
import Section from '../section/Section.js';
import LoginModal from '../modals/LoginModal';

class Home extends Component {
  constructor()
  {
    super();
    this.state={
      modalVisible:false,
    }
  }
  render() {
    return (
      <div>
        <Navbar loginButtonClick={()=>{this.setState({modalVisible:true})}}></Navbar>
        <NavbarMobile loginButtonClick={()=>{this.setState({modalVisible:true})}}></NavbarMobile>
        <Header></Header>
        <Section></Section>
        <LoginModal modalVisible={this.state.modalVisible?'flex':'none'} modalPos={this.state.modalVisible?'0px':'-2000px'} onModalCloseClick={()=>{this.setState({modalVisible:false})}}>
        </LoginModal>
      </div>
    );
  }
}

export default Home;
