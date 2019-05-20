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
<<<<<<< HEAD
                                <div className={this.state.rulePicked?"rule-content":"rule-content no-selection"}>
                                    {this.state.rulePicked?(this.state.rulePicked.type=='rule'?this.state.rulePicked.rule.lang.eng.text:this.state.rulePicked.rule. text):<div><i className="fas fa-bookmark"></i><p>Please select a rule</p></div>}
=======
                                <div className="rule-content">
                                    {this.state.rulePicked?(this.state.rulePicked.type=='rule'?(
                                        <div>{this.state.rulePicked.rule.lang.eng.title} - {this.state.rulePicked.rule.lang.eng.name} <br/><br/>
                                        <div>{this.state.rulePicked.rule.lang.eng.text}<br/><br/></div>
                                        <div>{(this.state.rulePicked.rule.lang.eng.subRules.map(subrule=>{
                                            return(<div>{subrule.number}<br/>{subrule.text}<br/><br/></div>)
                                        }))}</div></div>
                                        ):
                                        (<div>{this.state.rulePicked.rule.title}<br/><br/>
                                         <div>{this.state.rulePicked.rule.number} - {this.state.rulePicked.rule.name}<br/><br/>
                                         <div>{this.state.rulePicked.rule.text}</div></div></div>)):'Please select a rule'}
>>>>>>> 1825010e18ffbc89f02a4fe1797ffb99558f1570
                                </div>
                                <div className="rule-content-handler">
                                    <i onClick={(e)=>{window.alert('Hi!')}} className="fas fa-chevron-circle-left"></i>
                                    <i className="fas fa-sticky-note" style={{borderRadius:''}}></i>
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