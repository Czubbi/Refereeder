import React, { Component } from 'react';
var $ = require('jquery');

class RuleNavigator extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            rules:props.rules,
            hidden:{},
            selected:{},
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
        //console.log(hidden);
        this.setState({hidden:hidden});
    }
    render()
    {
        return(
            <div className="rule-container-selector">
                {this.state.rules.map(rule=>{
                    return(
                        <div>
                            <div className={this.state.selected[`${rule._id}`]?"rule-button-container selected":"rule-button-container"}>
                            <div onClick={()=>{this.props.onBtnClick({rule:rule,type:'rule'});this.state.selected={};this.state.selected[`${rule._id}`]=true}}  className={this.state.selected[`${rule._id}`]?"rule-button selected":"rule-button"}>
                                <a href='#' style={this.state.selected[`${rule._id}`]?{color:"#222222"}:{color:"white"}} title={rule.lang.eng.name} data-toggle="tooltip">{rule.number}. {rule.lang.eng.name.length>25?rule.lang.eng.name.substring(0,25)+'...':rule.lang.eng.name}</a>
                            </div>
                                {rule.lang.eng.subRules.length>0?<div  className="rule-collapse-button" data-toggle="collapse" data-target={`#collapse_${rule._id}`} onClick={()=>{this.changeHidden(rule._id);}}>
                                    {!this.state.hidden[`${rule._id}`]?
                                    (this.state.selected[`${rule._id}`]?<i className="fas fa-arrow-down selected"></i>:<i className="fas fa-arrow-down"></i>):
                                    (this.state.selected[`${rule._id}`]?<i className="fas fa-arrow-down open selected"></i>:<i className="fas fa-arrow-down open"></i>)}
                                </div>:null}
                            </div>
                            {rule.lang.eng.subRules.length>0?<div className="collapse" id={`collapse_${rule._id}`}>
                                {rule.lang.eng.subRules.sort((a,b)=>{return a.number.split('.')[1]*1 - b.number.split('.')[1]*1}).map(subrule=>{
                                    return(<div onClick={()=>{this.props.onSubBtnClick({id:subrule._id,number:subrule.number});this.state.selected={};this.state.selected[`${rule._id}`]=true}} className="rule-button-sub">
                                        <a href='#' style={this.state.selected[`${subrule._id}`]?{color:"#111111"}:{color:"white"}} title={subrule.number} data-toggle="tooltip">{subrule.number}</a>
                                    </div>)
                                })}
                            </div>:null}
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default RuleNavigator;