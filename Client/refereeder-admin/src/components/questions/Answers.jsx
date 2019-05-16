import React, { Component } from 'react';
import Navbar from '../navbar/Navbar'
import Topbar from '../navbar/Topbar'
import AddButton from '../buttons/AddButton';
import ModalBase from '../modals/ModalBase';
var $ = require('jquery');

class Questions extends Component {
  constructor(){
    super();
    this.state={
      question:null,
      modalOpen:false,
    }
  }
  componentDidMount()
  {
    this.refreshList();
  }
  deleteAnswer=(id)=>{
    let val=window.confirm('Do you really want to delete this answer?');
    if(val){
      $.ajax({
        url:`/api/questions/${this.props.id}/answers/${id}`,
        type:'DELETE',
        success:()=>{
          this.refreshList();
        }
      })
    }
  }
  addAnswer=()=>{
    var body=$('#add-answer-form').serialize();
    $.ajax({
      url:`/api/questions/${this.props.id}/answers`,
      type:'POST',
      data:body,
      success:()=>{
        document.getElementById('add-answer-form').reset();
        this.refreshList();
        this.setState({modalOpen:false});
      }
    })
  }
  refreshList=()=>{
    fetch(`/api/questions/${this.props.id}`).then(x=>x.json()).then(x=>{
      this.setState({question:x});
    })
  }
  openAddModal=()=>{
    this.setState({modalOpen:true});
  }
  render() {
    return (
      <div>
        <Navbar/>
        <ModalBase title="Add new answer" onCloseClick={()=>{this.setState({modalOpen:false})}} open={this.state.modalOpen}>
          <div style={{flex:1,padding:25,height:'100%',overflowX:'auto'}}>
            <form id="add-answer-form">
              <div className="form-group">
                <label htmlFor="answer">Answer</label>
                <input type="text" className="form-control" id="answer" name="answer" placeholder="Answer"/>
              </div>
              <div className="form-group">
                <label htmlFor="correct">Correct?</label>
                <input type="checkbox" className="form-control" id="correct" name="correct" placeholder="Correct" value="true"/>
              </div>
            </form>
            <div className="form-group" style={{paddingTop:20}}>
                <button onClick={this.addAnswer} style={{fontWeight:'bold',transition:'.6s'}} className="form-control btn-primary">Submit</button>
            </div>
          </div>
        </ModalBase>
        <Topbar title="Answers management"/>
        <div className='content'>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Answer</th>
                  <th scope="col">Correct</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {this.state.question&&this.state.question.answers.length>0?this.state.question.answers.map(answer=>{
                  return(
                    <tr key={answer._id}>
                      <th scope="row">{answer.answer}</th>
                      <td>{answer.correct}</td>
                      <td><button className='btn btn-danger' onClick={()=>{this.deleteAnswer(answer._id)}}>Delete</button>&emsp;<button className='btn btn-primary'>Edit</button></td>
                    </tr>
                  )
                }):null}
              </tbody>
            </table>
          </div>
        </div>
        <AddButton onBtnClick={()=>{this.openAddModal()}}></AddButton>
      </div>
    );
  }
}

export default Questions;
