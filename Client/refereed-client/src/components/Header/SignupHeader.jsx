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
          passwordScore:0,
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
       var unitArray=[];
       for(var i =0;i<result.score;i++){
           unitArray.push({key:i,value:""});
       }
       this.setState({units:unitArray});
    }
    render() {
        return (
          <div>
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
                        <form>
                            <div className="form-group row">
                                <label htmlFor="firstname" className="col-sm-3 col-form-label">Firstname</label>
                                <div className="col-sm-9">
                                    <input type="text" id="firstname" name="firstname" className="form-control"></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="lastname" className="col-sm-3 col-form-label">Lastname</label>
                                <div className="col-sm-9">
                                    <input type="text" id="lastname" name="lastname" className="form-control"></input>
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
                                    <DatePicker name="dob" selected={this.state.startDate} onChange={this.handleChange} className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                                <div className="col-sm-9">
                                    <input type="email" id="email" name="email" className="form-control"></input>
                                </div>
                            </div>
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
                            <input type="submit" value="Sign up" className="btn btn-success col-sm-12" style={{marginTop:40}}></input>
                        </form>
                    </div>
                </div>
            </div>
          </div>
        );
    }
}

export default SignupHeader;
