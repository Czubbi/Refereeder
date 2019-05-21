import React, { Component } from 'react';
import Navbar from '../navbar/Navbar'
import NavbarMobile from '../navbar/NavbarMobile';
import Footer from '../footer/Footer'
import FooterNavigation from '../cards/FooterNavigation';
import Section from '../section/Section';
import RuleNavigator from './RuleNavigator';
import Cookies from 'js-cookie';
import NoteModal from '../modals/NoteModal';
import TextTransition from 'react-text-transition';

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
        console.log(rule);
        this.setState({rulePicked:rule});
    }

    nextRule(selected){
        console.log(selected);
        if(selected.type=="rule"){
            selected.rule=this.state.rules[this.state.rules.indexOf(selected.rule)+1];
            selected.type="rule";
            //console.log(selected);
            this.selectRule(selected);
        }else{
            console.log(this.state.rules[0]);
            /*selected.rule=this.state.rules[this.state.rules.indexOf(selected.rule)+1];
            selected.type="subrule";
            //console.log(selected);
            this.selectRule(selected);*/
        }
    }
    previousRule(selected){
        if(selected.type=="rule"){
            selected.rule=this.state.rules[this.state.rules.indexOf(selected.rule)-1];
            selected.type="rule";
            //console.log(selected);
            this.selectRule(selected);
        }
    }
    evaluatePosition(selected){

        var position="";
        //console.log(this.state.rules)
        //console.log(selected.rule.lang.eng.subRules.length);
        if(selected.type=="rule"){
            if(this.state.rules.indexOf(selected.rule)==0){
                position="first";
            }else if(this.state.rules.indexOf(selected.rule)==this.state.rules.length-1){
                position="last";
            }
        }else{
             /*if(this.state.rules.indexOf(selected)==0){
                position="first";
             }else if(selected.rule.number===this.state.rulePicked.rule.lang.eng.subRules[this.state.rulePicked.rule.lang.eng.subRules.length-1].number){
                position="last";
            }*/
        }
        //console.log(position);
        return position;
    }

    takeNote=(e)=>{
        
    }
    render()
    {
        if(this.state.rules.length>0){
            return(
                <div>
                    <Navbar position="relative" backgroundColor="black"></Navbar>
                    <NavbarMobile position='relative' backgroundColor='black'></NavbarMobile>
                    <NoteModal modalVisible={this.state.modalVisible?'flex':'none'} modalPos={this.state.modalVisible?'0px':'-2000px'} onModalCloseClick={(e)=>{e.preventDefault();if(e.target==e.currentTarget){this.setState({modalVisible:false})}}}></NoteModal>
                    <Section>
                        <div className="rule-container">
                            <RuleNavigator onBtnClick={(rule)=>{this.selectRule(rule)}} rules={this.state.rules}></RuleNavigator>
                            <div className="rule-container-content">
                                <div className={this.state.rulePicked?"rule-content":"rule-content no-selection"}>
                                    <TextTransition text={
                                    this.state.rulePicked?(this.state.rulePicked.type=='rule'?(
                                        <div><div className="main-rule-content"><p>{this.state.rulePicked.rule.lang.eng.title} - {this.state.rulePicked.rule.lang.eng.name}</p>
                                        <div><p>{this.state.rulePicked.rule.lang.eng.text}</p></div></div>
                                        <div>{(this.state.rulePicked.rule.lang.eng.subRules.map(subrule=>{
                                            return(<div className="subrule-content"><div className="subrule-content-number">{subrule.number}:</div> <div className="subrule-content-text">{subrule.text}</div></div>)
                                        }))}</div></div>
                                        ):
                                        (<div><p>{this.state.rulePicked.rule.title}</p>
                                         <div><p>{this.state.rulePicked.rule.number} - {this.state.rulePicked.rule.name}</p>
                                         <div>{this.state.rulePicked.rule.text}</div></div></div>)
                                    ):
                                         <div><img style={{width:'300px',height:'auto'}} src={process.env.PUBLIC_URL+'images/IHF_logo.jpg'}></img><p>IHF</p><p>IX - Rules Of The Game</p><p>Indoor Handball</p></div>}></TextTransition>
                                </div>
                                <div className="rule-content-handler">
                                    {this.state.rulePicked?(
                                    /*onClick next rule, rule n1 if rulePicked == null */
                                    <div>{this.evaluatePosition(this.state.rulePicked)!="first"?<i onClick={(e)=>{this.previousRule(this.state.rulePicked)}} className="fas fa-chevron-circle-left"></i>:null}
                                    {this.state.rulePicked?<i className="fas fa-sticky-note" onClick={(e)=>{this.setState({modalVisible:true})}}></i>:null}
                                    {/*onClick previous rule */}
                                    {this.evaluatePosition(this.state.rulePicked)!="last"?<i onClick={(e)=>{this.nextRule(this.state.rulePicked)}} className="fas fa-chevron-circle-right"></i>:null}
                                    </div>
                                    ):null}
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