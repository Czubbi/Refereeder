import React,{Component} from 'react';
import $ from 'jquery';
import QuizQuestions from './QuizQuestions';
import Cookies from 'js-cookie';
var io = require('socket.io-client');
var socket=null;
var counterId;
class QuizMulti extends Component{
    constructor(){
        super();
        this.state={
            user:{},
            opponent:'null',
            messages:[],
            started:false,
            loading:false,
            userReady:true,
            room:{},
            questions:[],
            countDown:null,
        }
    }
    componentWillUnmount() {
        this.componentCleanup();
        window.removeEventListener('beforeunload', this.componentCleanup);
    }
    componentCleanup(){
        socket.emit('disconnect',socket.id);
    }
    componentDidMount(){
        fetch(`/api/users/${Cookies.get('uid')}`).then(x=>x.json()).then(x=>{
            this.setState({user:x});
        })
    }
    startCountDown=()=>{
        counterId=setInterval(()=>{
            if(this.state.countDown-1<0){
                this.stopCountDown();
                this.setState({started:true});
                this.setState({loading:false});
                sessionStorage.setItem('roomid',`${this.state.room.id}`);
                socket.emit(`listen_room`,this.state.room.id);
            }
            this.setState({countDown:this.state.countDown-1})
        },1000);
    }
    stopCountDown=()=>{
        clearInterval(counterId);
    }
    connectToQuiz=()=>{
        if(this.state.opponent=='null'){
            socket=io('localhost:5000',{query:`uid=${Cookies.get('uid')}`});
            socket.on('connectedToRoom',(x)=>{
                console.log('Connected to someone elses room: ' + x.id);
                this.setState({opponent:x.player1});
                this.setState({room:x});
                this.setState({questions:x.questions});
                this.setState({countDown:5});
                this.startCountDown();
            })
            socket.on('playerLeft',(x)=>{
                if(x===1){
                    this.setState({opponent:'null'});
                    socket.on(`connectedToRoom_${this.state.room.id}`,(opponent)=>{
                        this.setState({opponent:opponent});
                        this.setState({countDown:5});
                        this.startCountDown();
                    })
                    this.setState({countDown:null});
                    this.stopCountDown();
                    socket.emit('stopTimer','')
                }
                else if(x===2){
                    this.setState({opponent:'null'});
                    this.setState({countDown:null});
                    this.stopCountDown();
                }
            })
            socket.on('newRoom',(x)=>{
                console.log('I created a new room: ', x);
                this.setState({room:x});
                this.setState({questions:x.questions});
                socket.on(`connectedToRoom_${x.id}`,(opponent)=>{
                    this.setState({opponent:opponent});
                    this.setState({countDown:5});
                    this.startCountDown();
                })
            })
            window.addEventListener('beforeunload',()=>{
                socket.close();
                return null;
            });
            this.setState({loading:true})
        }
    }
    cancelConnection=()=>{
        /*this.setState({started:false});
        this.setState({opponent:'null'});
        this.setState({room:{}});
        socket.emit('disconnect',socket.id);
        this.setState({loading:false});*/
    }
    render(){
        return( 
        <div>
            <div className="loading_div" style={{textAlign:'center',backgroundColor:'rgba(0,0,0,0.8)', display:this.state.loading?'flex':'none'}}>   
                <div>
                    <img src={process.env.PUBLIC_URL+'/images/loading.gif'}/>
                    <h3 style={{color:'white'}}>Please wait while we are finding you an opponent!</h3>
                    <h3 style={{color:'white'}}>{this.state.countDown?`Match starts in ${this.state.countDown} seconds`:''}</h3>
                    {this.state.opponent=='null'?<span className='btn btn-lg btn-danger' onClick={this.cancelConnection}>Cancel</span>:null}
                </div>
            </div>
            <div className="quiz-container">
                <div>
                    <div className="logo-container">
                        <a href="/"><img style={{filter:'invert(100%)',marginBottom:30}} src={process.env.PUBLIC_URL+'images/logo.png'}></img></a>
                    </div>
                    {this.state.started?<QuizQuestions multi={true} questions={this.state.questions} uid={this.state.user.uid}></QuizQuestions>:
                    <div>
                        <div className="quiz-question-container rules" id="explaining-rules">
                            <p><h5>The rules for the quizzes 1v1 are the following:</h5></p>
                            <p>You will compete against another player.</p>
                            <p>The player that click on the correct answer first wins the round.</p>
                            <p>To win you have to get more correct answers than your opponent.</p>
                            <p>In case of draw it will appear an extra question to break it.</p>
                            <p>You have to answer 10 random questions.</p>
                            <p>You have 30 seconds to answer each question.</p>
                            <p>There's only one correct answer for each question.</p>
                            <p>If you leave the page the quiz will be disabled.</p>
                        </div>
                        <span className='btn btn-lg btn-primary' onClick={this.connectToQuiz}>Start now</span>
                    </div>
                    }
                </div>
            </div>
        </div>)
    }
}
export default QuizMulti;