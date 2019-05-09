import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class SignupHeader extends Component {
    constructor() {
        super();
        this.state = {
          startDate: new Date()
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
                                <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                                <div className="col-sm-9">
                                    <input type="email" id="email" name="email" className="form-control"></input>
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
                            <input type="submit" value="Sign up" className="btn btn-success col-sm-12" style={{marginTop:40}}></input>
                            {

                            }
                        </form>
                    </div>
                </div>
            </div>
          </div>
        );
    }
}

export default SignupHeader;
