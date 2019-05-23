import React, {Component} from 'react';
import Navbar from '../navbar/Navbar';
import NavbarMobile from '../navbar/NavbarMobile';
import Footer from '../footer/Footer';
import QuizQuestions from './QuizQuestions';
//import ProgressBar from 'react-bootstrap/ProgressBar'
class Quiz extends Component{
    constructor(){
        super();
        this.state={
            questions:[],
            started:false,
            loading:false,
            gameQuestions:[],
        }
    }
    componentDidMount(){
        fetch('/api/questions').then(x=>x.json()).then(x=>{
            this.setState({questions:x});
        })
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
                        {/*<ProgressBar now={60} />*/}
                        {/*<div className="logo-container">
                            <a href="/"><img style={{filter:'invert(100%)',marginBottom:30}} src={process.env.PUBLIC_URL+'images/logo.png'}></img></a>
                        </div> */}
                        {this.state.started?<QuizQuestions questions={this.state.gameQuestions}></QuizQuestions>:<span className='btn btn-lg btn-primary' onClick={this.startQuiz}>Start now</span>}
                    </div>
                </div>
            </div>
        )
    }
}
export default Quiz;