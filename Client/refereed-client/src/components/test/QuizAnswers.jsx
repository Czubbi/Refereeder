import React,{Component} from 'react';

class QuizAnswer extends Component{
    constructor()
    {
        super();
        this.state={
            correct:false,
            selected:false,
        }
    }
    componentDidMount(){
        this.setState({correct:this.props.correct});
        console.log(this.props.onSelect);
    }
    selectAnswer=()=>{
        return new Promise((resolve,reject)=>{
            if(this.props.didSelect)
            {
                reject();
            }
            else
            {
                document.getElementById(this.props.id).classList.add('selected-answer');
                console.log("SELECTED");
                resolve();
            }
        })
    }
    render()
    {
        return(
            <div onClick={()=>{this.selectAnswer().then(()=>this.props.onSelect(this.props.answer))}} className={this.state.selected?"quiz-answer selected-answer":"quiz-answer"} id={this.props.id}>
                {this.props.answer.answer}
            </div>
        )
    }
}

export default QuizAnswer;