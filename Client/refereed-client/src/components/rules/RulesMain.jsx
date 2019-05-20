import React, { Component } from 'react';
import Navbar from '../navbar/Navbar'
import NavbarMobile from '../navbar/NavbarMobile';
import Footer from '../footer/Footer'
import FooterNavigation from '../cards/FooterNavigation';
import Section from '../section/Section';
import RuleNavigator from './RuleNavigator';
import Cookies from 'js-cookie';
import NoteModal from '../modals/NoteModal';

class RulesMain extends Component
{
    constructor()
    {
        super();
        this.state={
            rules:[],
            rulePicked:null,
            modalVisible:false,
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
    takeNote=(e)=>{
        
    }
    render()
    {
        if(this.state.rules.length>0){
            return(
                <div>
                    <Navbar position="relative" backgroundColor="black"></Navbar>
                    <NavbarMobile></NavbarMobile>
                    <NoteModal modalVisible={this.state.modalVisible?'flex':'none'} modalPos={this.state.modalVisible?'0px':'-2000px'} onModalCloseClick={(e)=>{e.preventDefault();if(e.target==e.currentTarget){this.setState({modalVisible:false})}}}></NoteModal>
                    <Section>
                        <div className="rule-container">
                            <RuleNavigator onBtnClick={(rule)=>{this.selectRule(rule)}} rules={this.state.rules}></RuleNavigator>
                            <div className="rule-container-content">
                                <div className={this.state.rulePicked?"rule-content":"rule-content no-selection"}>
                                    {this.state.rulePicked?(this.state.rulePicked.type=='rule'?(
                                        <div><p>{this.state.rulePicked.rule.lang.eng.title} - {this.state.rulePicked.rule.lang.eng.name}</p>
                                        <div><p>{this.state.rulePicked.rule.lang.eng.text}</p></div>
                                        <div>{(this.state.rulePicked.rule.lang.eng.subRules.map(subrule=>{
                                            return(<div><p>{subrule.number}<br/>{subrule.text}</p></div>)
                                        }))}</div></div>
                                        ):
                                        (<div><p>{this.state.rulePicked.rule.title}</p>
                                         <div><p>{this.state.rulePicked.rule.number} - {this.state.rulePicked.rule.name}</p>
                                         <div>{this.state.rulePicked.rule.text}</div></div></div>)):<div><img style={{width:'300px',height:'auto'}} src={process.env.PUBLIC_URL+'images/IHF_logo.jpg'}></img><p>IHF Handball - Rules Of The Game</p><p>Indoor Handball</p></div>}
                                </div>
                                <div className="rule-content-handler">
                                    <i onClick={(e)=>{window.alert('Hi!')}} className="fas fa-chevron-circle-left"></i>
                                    <i className="fas fa-sticky-note" onClick={(e)=>{this.setState({modalVisible:true})}}></i>
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