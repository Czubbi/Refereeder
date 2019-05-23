import React, {Component} from 'react';
import $ from 'jquery';
import Quiz from './Quiz';
import QuizAnswer from './QuizAnswers';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class QuizQuestions extends Component{
    constructor()
    {
        super();
        this.state={
            questions:[],
            counter:0,
            selected:false,
            answers:[],
            timeLeft:30,
            answered:false,
            lastQuestion:false,
            finished:false,
            timer:"",
        }
    }
    componentDidMount()
    {
        this.setState({questions:this.props.questions});
        this.startCounter();
    }
    startCounter=()=>{
        var timer=setInterval(()=>{
            if(this.state.timeLeft==0){
                this.selectAnswer({correct:false,answer:"time's up"});
            }
            else{
                this.setState({timeLeft:this.state.timeLeft-1});
            }
        },1000);
        this.setState({timer:timer});
    }
    stopCounter=()=>{
        clearInterval(this.state.timer);
    }
    selectAnswer=(answer)=>{
        this.stopCounter();
        var userAnswers = this.state.answers;
        userAnswers.push(answer);
        this.setState({answers:userAnswers});
        this.setState({selected:true});
        setTimeout(()=>{
            if(answer.correct){
                document.getElementById(`answer_${answer._id}`).classList.remove('selected-answer');
                document.getElementById(`answer_${answer._id}`).classList.add('good-answer');
            }
            else{
                var goodAnswer=this.state.questions[this.state.counter].answers.filter(x=>x.correct);
                if(answer.answer!="time's up"){
                    document.getElementById(`answer_${answer._id}`).classList.remove('selected-answer');
                    document.getElementById(`answer_${answer._id}`).classList.add('bad-answer');
                }
                Array.from(document.getElementsByClassName('quiz-answer')).forEach(x=>{
                    if(x.innerHTML==goodAnswer[0].answer){
                        x.classList.add('good-answer');
                    }
                })
            }
            this.setState({answered:true});
        },1000);
    }
    nextQuestion=()=>{
        this.setState({answered:false});
        this.setState({selected:false});
        this.setState({timeLeft:30});
        Array.from(document.getElementsByClassName('good-answer')).forEach(x=>{
            x.classList.remove('good-answer');
        })
        Array.from(document.getElementsByClassName('selected')).forEach(x=>{
            x.classList.remove('selected-answer');
        })
        Array.from(document.getElementsByClassName('bad-answer')).forEach(x=>{
            x.classList.remove('bad-answer');
        })
        if(this.state.counter+1==9){
            this.setState({lastQuestion:true});
        }
        this.setState({counter:this.state.counter+1});
        this.startCounter();
    }
    numMap = (num, in_min, in_max, out_min, out_max) => {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    render(){
        if(this.state.questions.length>0){
            var currentQuestion=this.state.questions[this.state.counter];
            var currentAnswers=currentQuestion.answers;
            var falseCounter=0;
            var trueCounter=0;
            var newAnswers=[];
            for(var i=0;i<currentAnswers.length;i++)
            {
                if(currentAnswers[i].correct && trueCounter<1)
                {
                    newAnswers.push(currentAnswers[i]);
                    trueCounter++
                }
                else if(!currentAnswers[i].correct && falseCounter<3){
                    newAnswers.push(currentAnswers[i]);
                    falseCounter++;
                }
            }
            currentQuestion.answers=newAnswers;
            if(this.state.finished){
                return(
                    <div className="quiz-question-container" id="quiz-question-container">
                        <h3>You have finished the quiz!<br/>See your results below:</h3>
                        <br></br>
                        <h4>
                            Correct answers: {this.state.answers.filter(x=>x.correct).length}
                        </h4>
                        <h4>
                            Incorrect answers: {this.state.answers.filter(x=>!x.correct).length}
                        </h4>
                    </div>
                )
            }
            else return(
                <div className='quiz-question-container' id="quiz-question-container">
                    <div style={{width:100,height:100}}><CircularProgressbar circleRatio={0.75} styles={buildStyles({ rotation: 1 / 2 + 1 / 8, strokeLinecap: "butt", trailColor: "#eee"})} value={this.numMap(this.state.timeLeft,0,30,0,100)} text={this.state.timeLeft}></CircularProgressbar></div>
                    <div className="quiz-question">
                        <h5>{currentQuestion.number} - {currentQuestion.question}</h5>
                    </div>
                    <div className="quiz-answers-container" id="quiz-answers-container">
                        <div>
                        {currentQuestion.answers.map(answer=>
                                <QuizAnswer id={`answer_${answer._id}`} didSelect={this.state.selected} answer={answer} correct={answer.correct} onSelect={(answer)=>{this.selectAnswer(answer)}}></QuizAnswer>
                            )}
                        </div>
                    </div>
                    <div onClick={this.state.lastQuestion?()=>{this.setState({finished:true})}:this.nextQuestion} style={{display:this.state.answered?"block":"none"}} className="quiz-next-button">
                        <i className={this.state.lastQuestion?"fas fa-check":"fas fa-chevron-right"}></i>
                    </div>

                </div>
            )
        }
        else return null;
    }
}
export default QuizQuestions;