import React,{Component} from 'react';
import $ from 'jquery';
import QuizQuestions from './QuizQuestions';
import Cookies from 'js-cookie';
var io = require('socket.io-client');
var socket=null;
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
    connectToQuiz=()=>{
        if(this.state.opponent=='null'){
            socket=io('localhost:5000');
            socket.on('connectedToRoom',(x)=>{
                console.log('Connected to someone elses room: ' + x.id);
                this.setState({opponent:x.player1});
                this.setState({room:x});
            })
            socket.on('newRoom',(x)=>{
                console.log('I created a new room: ', x.id);
                this.setState({room:x});
                socket.on(`connectedToRoom_${x.id}`,(opponent)=>{
                    this.setState({opponent:opponent});
                })
            })
            window.addEventListener('beforeunload',()=>{
                socket.close();
                return null;
            });
            this.setState({loading:true})
        }
    }
    render(){
        return( <div>
            <div className="loading_div" style={{textAlign:'center',backgroundColor:'rgba(0,0,0,0.8)', display:this.state.loading?'flex':'none'}}>   
                <div>
                    <img src={process.env.PUBLIC_URL+'/images/loading.gif'}/>
                    <h3 style={{color:'white'}}>Please wait while we are finding you an opponent!</h3>
                    <h3 style={{color:'white'}}>{this.state.opponent=='null'?'':'Found opponent:' + this.state.opponent}</h3>
                </div>
            </div>
            <div className="quiz-container">
                <div>
                    <div className="logo-container">
                        <a href="/"><img style={{filter:'invert(100%)',marginBottom:30}} src={process.env.PUBLIC_URL+'images/logo.png'}></img></a>
                    </div>
                    {this.state.started?<QuizQuestions questions={this.state.gameQuestions}></QuizQuestions>:<span className='btn btn-lg btn-primary' onClick={this.connectToQuiz}>Start now</span>}
                </div>
            </div>
        </div>)
    }
}
export default QuizMulti;