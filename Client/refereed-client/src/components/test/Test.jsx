import React, {Component} from 'react';
class Test extends Component{
    constructor(){
        super();
        this.state={
            questions:[],
            rules:[],
            selectedRules:{},
        }
    }
    componentDidMount(){
        fetch('/api/questions').then(x=>x.json()).then(x=>{
            this.setState({questions:x});
        });
        this.getRules();
    }
    getRules(){
            var rules = [];   
            for (let i = this.state.questions.length - 1; i >= 0; i--)
            {
                rules.push(this.state.questions[i].ruleNumber);
            }
            rules = rules.sort((a,b)=>{return parseFloat(b.number) - parseFloat(a.number*1)});
            var array = new Set(rules);
            this.state.rules= [...array];
            console.log(this.state.rules);
    }

    render(){
        return(
            <div>
                <div className="loading_div" style={{display:this.state.loading?'flex':'none'}}>        //console.log(hidden);
                    <div onClick={(e)=>window.location.replace('/')}><img src={process.env.PUBLIC_URL+'/images/loading.gif'}/></div>        //console.log(hidden);
                </div>
                <div className="quiz-container">
                    <div>
                        <div className="logo-container">
                            <a href="/"><img style={{filter:'invert(100%)',marginBottom:30}} src={process.env.PUBLIC_URL+'images/logo.png'}></img></a>
                        </div>                         
                        <div className="test-rule-selector-container">
                            <div><h5 style={{color:"#333333"}}>Select the rules for the test</h5></div>
                            {this.getRules()}
                            {this.state.rules.map(rule=>{
                                return(
                                    <div className="test-rule-selector">{rule}</div>
                                )
                            })}
                        </div>
                        <span className='btn btn-lg btn-primary' onClick={this.getRules()}>Start now</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Test;