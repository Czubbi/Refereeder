import React, { Component } from 'react';
import $ from 'jquery';
class RuleNavigator extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            rules:props.rules,
            hidden:{},
            selected:{},
            mobileShown:false,
        }
    }

    changeHidden(id){
        var hidden=this.state.hidden;
        if(hidden[`${id}`])
        {
            hidden[`${id}`]=false;
        }
        else
        {
            hidden[`${id}`]=true;
        }
        this.setState({hidden:hidden});
    }
    showMobileMenu=(value)=>{
        $('#rule-selector').css('left',value?'0px':'-85vw');
    }
    render()
    {
        return(
            <div>
                <div onClick={()=>{this.showMobileMenu(!this.state.mobileShown);this.setState({mobileShown:!this.state.mobileShown})}} style={{left:this.state.mobileShown?'80vw':0}} className="rule-selector-mobile-handle">
                    <i className={this.state.mobileShown?"fas fa-arrow-left":"fas fa-arrow-right"}></i>
                </div>
                <div id="rule-selector" className="rule-container-selector">
                    {this.state.rules.map(rule=>{
                        return(
                            <div>
                                <div className={this.state.selected[`${rule._id}`]?"rule-button-container selected":"rule-button-container"}>
                                <div onClick={()=>{
                                    this.props.onBtnClick({rule:rule,type:'rule'});
                                    var selected={};
                                    selected[`${rule._id}`]=true;
                                    this.setState({selected:selected})}} className={this.state.selected[`${rule._id}`]?"rule-button selected":"rule-button"}>
                                    <span style={this.state.selected[`${rule._id}`]?{color:"#222222"}:{color:"white"}} title={rule.lang.eng.name} data-toggle="tooltip">{rule.number}. {rule.lang.eng.name.length>25?rule.lang.eng.name.substring(0,25)+'...':rule.lang.eng.name}</span>
                                </div>
                                    {rule.lang.eng.subRules.length>0?<div  className="rule-collapse-button" data-toggle="collapse" data-target={`#collapse_${rule._id}`} onClick={()=>{this.changeHidden(rule._id);}}>
                                        {!this.state.hidden[`${rule._id}`]?
                                        (this.state.selected[`${rule._id}`]?<i className="fas fa-arrow-down selected"></i>:<i className="fas fa-arrow-down"></i>):
                                        (this.state.selected[`${rule._id}`]?<i className="fas fa-arrow-down open selected"></i>:<i className="fas fa-arrow-down open"></i>)}
                                    </div>:null}
                                </div>
                                {rule.lang.eng.subRules.length>0?<div className="collapse" id={`collapse_${rule._id}`}>
                                    {rule.lang.eng.subRules.sort((a,b)=>{return a.number.split('.')[1]*1 - b.number.split('.')[1]*1}).map(subrule=>{
                                        return(<div onClick={()=>{
                                            this.props.onSubBtnClick({id:subrule._id,number:subrule.number});
                                            var selected={};
                                            selected[`${rule._id}`]=true;
                                            this.setState({selected:selected})}} className="rule-button-sub">
                                            <span style={this.state.selected[`${subrule._id}`]?{color:"#111111"}:{color:"white"}} title={subrule.number} data-toggle="tooltip">{subrule.number}</span>
                                        </div>)
                                    })}
                                </div>:null}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default RuleNavigator;