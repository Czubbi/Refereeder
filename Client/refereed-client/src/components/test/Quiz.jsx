import React, {Component} from 'react';
import Cookies from 'js-cookie';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import QuizQuestions from './QuizQuestions';
import LoginModal from '../modals/LoginModal';
import $ from 'jquery';
//import ProgressBar from 'react-bootstrap/ProgressBar'
class Quiz extends Component{
    constructor(){
        super();
        this.state={
            questions:[],
            started:false,
            loading:false,
            gameQuestions:[],
            loggedIn:"",
            modalVisible:false,
        }
    }
    componentDidMount(){
        fetch('/api/questions').then(x=>x.json()).then(x=>{
            this.setState({questions:x});
        });
        var uid=Cookies.get('uid');
        if(uid){
            this.setState({loggedIn:uid});
        }
        else{
            this.setState({loggedIn:null});
        }
    }
    componentDidUpdate(){
        $(window).blur(function() {
            alert("page left");
        });
          
    }
    checkIfValidQuizQuestion=(question)=>{
        var answers=question.answers;
        var falseCounter=0;
        answers.forEach(element => {
            if(element.correct==false){
                falseCounter++;
            }
        });
        return falseCounter>=3;
    }
    shuffleArray=(myArray)=>{
        var array=[...myArray];
        array=array.filter(question=>question.answers.length>3 && this.checkIfValidQuizQuestion(question));
        for (let i = array.length - 1; i > 0; i--)
        {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return(array);
    }
    getRandomQuestions=()=>{
        return new Promise((resolve,reject)=>{
            var shuffled = this.shuffleArray(this.state.questions);
            this.setState({gameQuestions:shuffled.slice(0,10)});
            resolve();
        }) 
    }
    startQuiz=()=>{
        this.setState({loading:true});
        this.getRandomQuestions().then(()=>{this.setState({started:true});this.setState({loading:false});});
    }
    render(){
        return(
            <div>
                <div className="loading_div" style={{display:this.state.loading?'flex':'none'}}>       
                    <div onClick={(e)=>window.location.replace('/')}><img src={process.env.PUBLIC_URL+'/images/loading.gif'}/></div>        
                </div>
                <div className="quiz-container">
                    <div>
                        <div className="logo-container">
                            <a href="/"><img style={{filter:'invert(100%)',marginBottom:30}} src={process.env.PUBLIC_URL+'images/logo.png'}></img></a>                          
                        </div>
                        <div className="quiz-question-container rules" id="explainig-rules">
                            <p><h5>The rules for the quizzes are the following:</h5></p>
                            <p>You have to answer 10 random questions.</p>
                            <p>You have 30 seconds to answer each question.</p>
                            <p>There's only one correct answer for each question.</p>
                            <p>If you leave the page the quiz will be disabled.</p>
                            {!this.state.loggedIn?<p>You can <a href="javascript:void(0)" onClick={()=>{this.setState({modalVisible:true})}}>log in</a> or <a href='/signup' onClick={(e)=>{window.location.replace('/signup')}}>sign up</a> to store your results.</p>:<p>Your results will be stored in your profile</p>}
                        </div>
                        {this.state.started?<QuizQuestions questions={this.state.gameQuestions}></QuizQuestions>:<span className='btn btn-lg btn-primary' onClick={()=>{$('#explainig-rules').hide();this.startQuiz()}}>Start now</span>}
                    </div>
                </div>
                <LoginModal modalVisible={this.state.modalVisible?'flex':'none'} modalPos={this.state.modalVisible?'0px':'-2000px'} onModalCloseClick={(e)=>{e.preventDefault();if(e.target==e.currentTarget){this.setState({modalVisible:false})}}}>
                </LoginModal>
            </div>
        )
    }
}
export default Quiz;