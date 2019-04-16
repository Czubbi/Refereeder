import React, { Component } from 'react';

class Topbar extends Component {
    constructor(){
        super();
        this.state={
            user:{username:'Test',initial:'T',color:'#F5820B'}
        }
    }
  render() {
    return (
      <div className="my-topbar">
        <div className="topbar-user">
            {this.state.user.username}
            <div className="user-circle" style={{backgroundColor:this.state.user.color}}>{this.state.user.initial}</div>
        </div>
        <div className="topbar-name">
            {this.props.title}
        </div>
      </div>
    );
  }
}

export default Topbar;
