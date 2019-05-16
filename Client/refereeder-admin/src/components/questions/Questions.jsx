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
      questions:[],
      modalOpen:false,
    }
  }
  componentDidMount()
  {
    this.refreshList();
  }
  deleteQuestion=(id)=>{
    let val=window.confirm('Do you really want to delete this question?');
    if(val){
      $.ajax({
        url:`/api/questions/${id}`,
        type:'DELETE',
        success:()=>{
          this.refreshList();
        }
      })
    }
  }
  addQuestion=()=>{
    var body=$('#add-question-form').serialize();
    $.ajax({
      url:`/api/questions`,
      type:'POST',
      data:body,
      success:()=>{
        document.getElementById('add-question-form').reset();
        this.refreshList();
        this.setState({modalOpen:false});
      }
    })
  }
  refreshList=()=>{
    fetch('/api/questions').then(x=>x.json()).then(x=>{
      this.setState({questions:x});
    })
  }
  openAddModal=()=>{
    this.setState({modalOpen:true});
  }
  render() {
    return (
      <div>
        <Navbar/>
        <ModalBase title="Add new question" onCloseClick={()=>{this.setState({modalOpen:false})}} open={this.state.modalOpen}>
          <div style={{flex:1,padding:25,height:'100%',overflowX:'auto'}}>
            <form id="add-question-form">
              <div className="form-group">
                <label htmlFor="ruleNumber">Rule number</label>
                <input type="text" className="form-control" id="ruleNumber" name="ruleNumber" placeholder="Num of rule"/>
              </div>
              <div className="form-group">
                <label htmlFor="questionNumber">Question number</label>
                <input type="text" className="form-control" id="questionNumber" name="questionNumber" placeholder="Num of question"/>
              </div>
              <div className="form-group">
                <label htmlFor="question">Text</label>
                <textarea rows={3} className="form-control" id="question" name="question" placeholder="Question"></textarea>
              </div>
            </form>
            <div className="form-group" style={{paddingTop:20}}>
                <button onClick={this.addQuestion} style={{fontWeight:'bold',transition:'.6s'}} className="form-control btn-primary">Submit</button>
            </div>
          </div>
        </ModalBase>
        <Topbar title="Questions management"/>
        <div className='content'>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Question number</th>
                  <th scope="col">Question</th>
                  <th scope="col">Answers</th>
                  <th scope="col">Rule number</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {this.state.questions.map(question=>{
                  return(
                    <tr key={question.questionNumber}>
                      <th scope="row">{question.number}</th>
                      <td>{question.question}</td>
                      <td><a href={`/questions/${question._id}/answers`}>{question.answers.length}</a></td>
                      <td>{question.ruleNumber}</td>
                      <td><button className='btn btn-danger' onClick={()=>{this.deleteQuestion(question._id)}}>Delete</button>&emsp;<button className='btn btn-primary'>Edit</button></td>
                    </tr>
                  )
                })}
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
