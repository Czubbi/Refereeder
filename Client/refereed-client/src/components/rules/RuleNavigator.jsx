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
        console.log(hidden);
        this.setState({hidden:hidden});
    }
    render()
    {
        return(
            <div className="rule-container-selector">
                {this.state.rules.map(rule=>{
                    return(
                        <div>
                            <div className="rule-button-container" data-toggle="collapse" data-target={`#collapse_${rule._id}`} onClick={()=>{this.changeHidden(rule._id)}}>
                            <div onClick={()=>{this.props.onBtnClick({rule:rule,type:'rule'})}}  className="rule-button">
                                <a href='#' title={rule.lang.eng.name} data-toggle="tooltip">{rule.number}. {rule.lang.eng.name.length>25?rule.lang.eng.name.substring(0,25)+'...':rule.lang.eng.name}</a>
                            </div>
                                {rule.lang.eng.subRules.length>0?<div  className="rule-collapse-button" >{/*data-toggle="collapse" data-target={`#collapse_${rule._id}`}>*/}
                                    {/*$((`#collapse_${rule._id}`)).is(':hidden')?<i className="fas fa-arrow-down"></i>:<i className="fas fa-arrow-down open"></i>*/}
                                    {!this.state.hidden[`${rule._id}`]?<i className="fas fa-arrow-down"></i>:<i className="fas fa-arrow-down open"></i>}
                                </div>:null}
                            </div>
                            {rule.lang.eng.subRules.length>0?<div className="collapse" id={`collapse_${rule._id}`}>
                                {rule.lang.eng.subRules.map(subrule=>{
                                    return(<div onClick={()=>{this.props.onBtnClick({rule:subrule,type:'subrule'})}} className="rule-button-sub">
                                        <a href='#' title={subrule.name} data-toggle="tooltip">{subrule.name.length>25?subrule.name.substring(0,25)+'...':subrule.name}</a>
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