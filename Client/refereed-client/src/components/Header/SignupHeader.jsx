import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
var passChecker = require('zxcvbn');
var $ = require('jquery');

class SignupHeader extends Component {
    constructor() {
        super();
        this.state = {
          startDate: new Date(),
          passwordStrength: "Empty",
          units:[],
          loading:false,
          passwordScore:0,
          passwordTooWeak:false,
          passwordFeedback:"",
          formInvalid:false,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(date) {
      this.setState({
        startDate: date
      });
    }    
    componentDidMount(){
    }
    signupUser=(e)=>{
        e.preventDefault();
        this.setState({loading:true});
        var data=$('#signupform').serialize();
        if(this.state.passwordScore>=3)
        {
            let formValid=true;
            $('#signupform input').each(function(){
                if($(this).val()===''){
                    formValid=false;
                }
            });
            if(formValid){
                $.ajax({
                    data:data,
                    method:'post',
                    success:()=>{window.location.replace('/')},
                    url:'/api/users'
                })
            }
            else this.setState({formInvalid:true});
        }
        else this.setState({passwordTooWeak:true});
    }
    passwordchange=()=>{
       var result=passChecker($('#password').val());
       var passText;
       switch(result.score){
           case 0:{
            passText="Very weak";
            break;
           }
           case 1:{
            passText="Weak";
            break;
           }
           case 2:{
            passText="Fair";
            break;
           }
           case 3:{
            passText="Good";
            break;
           }
           case 4:{
            passText="Strong";
            break;
           }
       }
       if($('#password').val()==""){
           passText="Empty";
       }
       this.setState({passwordStrength:passText});
       this.setState({passwordScore:result.score});
       this.setState({passwordFeedback:result.feedback});
       var unitArray=[];
       for(var i =0;i<result.score;i++){
           unitArray.push({key:i,value:""});
       }
       this.setState({units:unitArray});
    }
    render() {
        return (
          <div>
            <div className="loading_div" style={{display:this.state.loading?'flex':'none'}}>
                <img src={process.env.PUBLIC_URL+'/images/loading.gif'}></img>
            </div>
            <div id="signup-header" className="signup-header">
                <div className="signup-header-left">
                    <div className="take-a-photo">
                        <div style={{textAlign:'center'}}>
                            <i className="fas fa-file-image"></i>
                            <p>Upload an image of yourself</p>
                        </div>
                    </div>
                </div>
                <div className="signup-header-right">
                    <div>
                        <form id="signupform">
                            <div className="form-group row">
                                <label htmlFor="firstname" className="col-sm-3 col-form-label">Firstname</label>
                                <div className="col-sm-9">
                                    <input type="text" id="firstName" name="firstName" className="form-control"></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="lastname" className="col-sm-3 col-form-label">Lastname</label>
                                <div className="col-sm-9">
                                    <input type="text" id="lastName" name="lastName" className="form-control"></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="phone" className="col-sm-3 col-form-label">Phone</label>
                                <div className="col-sm-9">
                                    <input type="tel" id="phone" name="phone" className="form-control"></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="city" className="col-sm-3 col-form-label">City</label>
                                <div className="col-sm-9">
                                    <input type="text" id="city" name="city" className="form-control"></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="dob" className="col-sm-3 col-form-label">Birthday</label>
                                <div className="col-sm-9">
                                    <DatePicker name="dateOfBirth" selected={this.state.startDate} onChange={this.handleChange} className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                                <div className="col-sm-9">
                                    <input type="email" id="email" name="email" className="form-control"></input>
                                </div>
                            </div>
                            <h2 style={{fontSize:16,fontWeight:'bold',color:'red'}}>{this.state.passwordFeedback.warning}</h2>
                            <div className="form-group row">
                                
                                <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                                <div className="col-sm-9">
                                    <input type="password" id="password" name="password" onChange={this.passwordchange} className="form-control"></input>
                                </div>
                            </div>
                            <div className="passwordMeterContainer">
                                <div className="passwordMeter">
                                    {
                                        this.state.units.map(x=>{
                                            return <div className="passwordMeterUnit"></div>
                                        })
                                    }
                                </div>
                                <div className="passwordStrength">
                                    {this.state.passwordStrength}
                                </div>
                            </div>
                            <div style={{wordWrap:'normal'}}>
                                <p style={{fontSize:14,marginTop:15}}>A strong password must contain at least 6 characters<br/> including lowercase and uppercase letters, at least<br/> one number and at least one non alphanumeric character.</p>
                            </div>
                            <h5 style={{color:'red',display:this.state.formInvalid?'block':'none'}}>No field can be empty!</h5>
                            <input type="submit" disabled={this.state.passwordScore>=3?false:true} value="Sign up" onClick={(e)=>{this.signupUser(e)}} className="btn btn-success col-sm-12" style={{marginTop:40}}></input>
                        </form>
                    </div>
                </div>
            </div>
          </div>
        );
    }
}

export default SignupHeader;
