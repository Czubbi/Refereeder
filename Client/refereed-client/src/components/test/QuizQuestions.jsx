import React, {Component} from 'react';
import $ from 'jquery';

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
                <div className='quiz-question-container' id="quiz-question-container">
                    <div className="quiz-question" id="quiz-question" >
                        <h5>{this.state.questions[this.state.counter].number} - {this.state.questions[this.state.counter].question}</h5>
                    </div>
                    <div className="quiz-answers-container" id="quiz-answers-container">
                        <div>
                            {this.state.questions[this.state.counter].answers.map(answer=>
                            /*<div className="quiz-answer" style={{height:($('#quiz-answers-container').height()/this.state.questions[this.state.counter].answers.length)}} id={`quiz-answer-${this.state.questions[this.state.counter].answers[0]._id}`}>
                                {this.state.questions[this.state.counter].answers[0].answer}
                            </div>*/
                                <div className="quiz-answer" style={{height:($('#quiz-answers-container').height()/this.state.questions[this.state.counter].answers.length)-10}} id={`quiz-answer-${answer._id}`}>
                                    {answer.answer}
                                </div>
                            )}
                            </div>
                    </div>
                </div>
            )
        }
        else return null;
    }
}
export default QuizQuestions;