import React, { Component } from 'react';
import Navbar from '../navbar/Navbar'
import NavbarMobile from '../navbar/NavbarMobile';
import Footer from '../footer/Footer'
import FooterNavigation from '../cards/FooterNavigation';
import Section from '../section/Section';
import RuleNavigator from './RuleNavigator';

class RulesMain extends Component
{
    constructor()
    {
        super();
        this.state={
            rules:[],
            rulePicked:null,
        }
    }
    componentDidMount(){
        fetch('/api/rules').then(x=>x.json()).then(x=>{
            this.setState({rules:x});
        })
    }
    selectRule=(rule)=>{
        this.setState({rulePicked:rule});
    }
    render()
    {
        if(this.state.rules.length>0){
            return(
                <div>
                    <Navbar position="relative" backgroundColor="black"></Navbar>
                    <NavbarMobile></NavbarMobile>
                    <Section>
                        <div className="rule-container">
                            <RuleNavigator onBtnClick={(rule)=>{this.selectRule(rule)}} rules={this.state.rules}></RuleNavigator>
                            <div className="rule-container-content">
                                <div className="rule-content">
                                    {this.state.rulePicked?(this.state.rulePicked.type=='rule'?this.state.rulePicked.rule.lang.eng.text:this.state.rulePicked.rule. text):'Please select a rule'}
                                </div>
                                <div className="rule-content-handler">
                                    <i onClick={(e)=>{window.alert('Hi!')}} className="fas fa-chevron-circle-left"></i>
                                    <i className="fas fa-check-circle" style={{color:'#28a745'}}></i>
                                    <i className="fas fa-chevron-circle-right"></i>
                                </div>
                            </div>
                        </div>
                    </Section>
                    <Footer>
                    </Footer>
                </div>
            )
        }
        else return null;   
    }
}
export default RulesMain;