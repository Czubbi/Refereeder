import React, {Component} from 'react';

class QuizQuestions extends Component{
    constructor()
    {
        super();
        this.state={
            questions:[],
            counter:0,
        }
    }
    componentDidMount()
    {
        console.log(this.props.questions);
        this.setState({questions:this.props.questions});
    }
    
    render(){
        if(this.state.questions.length>0){
            return(
                <div className='quiz-question-container'>
                    <div className="quiz-question">
                        <h5>{this.state.questions[this.state.counter].question}</h5>
                    </div>
                    <div className="quiz-answers-container">
                        <div>
                            <div className="quiz-answer">{this.state.questions[this.state.counter].answers[0].answer}</div>
                            <div className="quiz-answer">{this.state.questions[this.state.counter].answers[1].answer}</div>
                            <div className="quiz-answer">{this.state.questions[this.state.counter].answers[2].answer}</div>
                            <div className="quiz-answer">{this.state.questions[this.state.counter].answers[3].answer}</div>
                        </div>
                    </div>
                </div>
            )
        }
        else return null;
    }
}
export default QuizQuestions;