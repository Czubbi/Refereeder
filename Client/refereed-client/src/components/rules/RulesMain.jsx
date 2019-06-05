import React, { Component } from 'react';
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import FooterNavigation from '../cards/FooterNavigation';
import Section from '../section/Section';
import RuleNavigator from './RuleNavigator';
import Cookies from 'js-cookie';
import NoteModal from '../modals/NoteModal';
import TextTransition from 'react-text-transition';
import $ from 'jquery';

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
        });
    }
    componentDidUpdate(){
        document.getElementById("rule-content").addEventListener('scroll',()=>{this.topBarScroll()})
    }
    numMap = (num, in_min, in_max, out_min, out_max) => {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    topBarScroll() {
        var height=$('#rule-content').prop('scrollHeight') - $('#rule-content').innerHeight();
        var scroll = $('#rule-content')[0].scrollTop;
        var percent=this.numMap(scroll,0,height,0,100);
        document.getElementById('scroll-progress-bar').style.width=`${percent}%`;
    }
    
    selectRule=(rule)=>{
        console.log(rule);
        this.setState({rulePicked:rule});
    }

    nextRule(selected){
        //console.log(selected);
        selected.rule=this.state.rules[this.state.rules.indexOf(selected.rule)+1];
        selected.type="rule";
        //console.log(selected);
        this.selectRule(selected);
    }
    previousRule(selected){
        selected.rule=this.state.rules[this.state.rules.indexOf(selected.rule)-1];
        selected.type="rule";
        //console.log(selected);
        this.selectRule(selected);
    }
    evaluatePosition(selected){

        var position="";

        if(this.state.rules.indexOf(selected.rule)==0){
            position="first";
        }else if(this.state.rules.indexOf(selected.rule)==this.state.rules.length-1){
            position="last";
        }
        //console.log(position);
        return position;
    }
    highlightRule=(rule)=>{
        setTimeout(()=>{
            $('.subrule-content').removeClass('selected');
            $(`#subrule-${rule.id}`).addClass('selected');
            $('#rule-content').animate({scrollTop:$(`#subrule-${rule.id}`).position().top - ($('#rule-content').height() - $(`#subrule-${rule.id}`).height())/2 +15}, 800);
        },100)
    }
    goToTop(){
        document.getElementById('rule-content').scrollTop=0;
    }
    setRuleActive=(ruleFromFunction)=>{
        return new Promise((resolve,reject)=>{
            console.log(ruleFromFunction);
            var ruleNrFromSubrule=ruleFromFunction.number.split('.')[0];
            console.log(ruleNrFromSubrule)
            var rule = this.state.rules.filter(x=>x.number*1==ruleNrFromSubrule*1);
            this.setState({rulePicked:{rule:rule[0],type:'rule'}});
            resolve();
        })
    }
    handleSubruleSelect=(rule)=>{
        if(!this.state.rulePicked || this.state.rulePicked.rule.number*1!=rule.number.split('.')[0]*1)
        {
            this.setRuleActive(rule).then(this.highlightRule(rule));
        }
        else(this.highlightRule(rule));
    }
    takeNote=(e)=>{
        
    }
    render()
    {
        if(this.state.rules.length>0){
            return(
                <div>
                    <Navbar position="relative" backgroundColor="black"></Navbar>
                    <NoteModal modalVisible={this.state.modalVisible?'flex':'none'} modalPos={this.state.modalVisible?'0px':'-2000px'} onModalCloseClick={(e)=>{e.preventDefault();if(e.target==e.currentTarget){this.setState({modalVisible:false})}}}></NoteModal>
                    <Section>
                        <div className="rule-container" id="rule-container">
                            <RuleNavigator onSubBtnClick={this.handleSubruleSelect} onBtnClick={(rule)=>{this.selectRule(rule);this.goToTop()}} rules={this.state.rules}></RuleNavigator>
                            <div className="rule-container-content">
                            <div class="scroll-progress-bar" id="scroll-progress-bar"></div>
                                <div id='rule-content' className={this.state.rulePicked?"rule-content":"rule-content no-selection"}>       
                                    <TextTransition order={this.state.rules.indexOf(this.state.rulePicked?this.state.rulePicked.rule:0)} text={
                                    this.state.rulePicked?(this.state.rulePicked.type=='rule'?(
                                        <div><div className="main-rule-content" id={`rule-${this.state.rulePicked.rule._id}`}><p>{this.state.rulePicked.rule.lang.eng.title} - {this.state.rulePicked.rule.lang.eng.name}</p>
                                        <div><p>{this.state.rulePicked.rule.lang.eng.text}</p></div></div>
                                        <div>{(this.state.rulePicked.rule.lang.eng.subRules.map(subrule=>{
                                            return(<div className="subrule-content" id={`subrule-${subrule._id}`}><div className="subrule-content-number">{subrule.number}:&nbsp;&nbsp;</div> <div className="subrule-content-text">{subrule.text}</div></div>)
                                        }))}</div></div>
                                        ):null
                                    ):
                                         <div><img style={{width:'300px',height:'auto'}} src={process.env.PUBLIC_URL+'images/IHF_logo.jpg'}></img><p>IHF</p><p>IX - Rules Of The Game</p><p>Indoor Handball</p></div>}></TextTransition>
                                </div>
                                <div className="rule-content-handler">
                                    {this.state.rulePicked?(
                                    <div>{this.evaluatePosition(this.state.rulePicked)!="first"?<i onClick={(e)=>{this.previousRule(this.state.rulePicked);this.goToTop()}} className="fas fa-chevron-circle-left"></i>:null}
                                         {this.state.rulePicked?<i className="fas fa-sticky-note" onClick={(e)=>{this.setState({modalVisible:true})}}></i>:null}
                                         {this.evaluatePosition(this.state.rulePicked)!="last"?<i onClick={(e)=>{this.nextRule(this.state.rulePicked);this.goToTop()}} className="fas fa-chevron-circle-right"></i>:null}
                                    </div>
                                    ):
                                    <div>
                                        <i onClick={(e)=>{this.nextRule({rule:this.state.rules[-1],type:'rule'})}} className="fas fa-chevron-circle-right"></i>
                                    </div>}
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