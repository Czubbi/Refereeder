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
      url:`/api/question`,
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
    fetch('/graphql/rules?query=query{all{_id,number,lang{eng{title,text,name,subRules{number,name,title}}}}}').then(x=>x.json()).then(x=>{
      this.setState({rules:x.data.all});
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
                <label htmlFor="ruleNumber">#</label>
                <input type="text" className="form-control" id="ruleNumber" name="ruleNumber" placeholder="Num of rule"/>
              </div>
              <div className="form-group">
                <label htmlFor="questionNumber">#</label>
                <input type="text" className="form-control" id="questionNumber" name="questionNumber" placeholder="Num of question"/>
              </div>
              <div className="form-group">
                <label htmlFor="question">Text</label>
                <textarea rows={3} className="form-control" id="question" name="question" placeholder="Question"></textarea>
              </div>
            </form>
            <div className="form-group" style={{paddingTop:20}}>
                <button onClick={this.addRule} style={{fontWeight:'bold',transition:'.6s'}} className="form-control btn-primary">Submit</button>
            </div>
          </div>
        </ModalBase>
        <Topbar title="Questions management"/>
        <div className='content'>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"># Rule</th>
                  <th scope="col"># Question</th>
                  <th scope="col">Question</th>
                  <th scope="col">Answers</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rules.map(question=>{
                  return(
                    <tr key={question.nuleNumber}>
                      <th scope="row">{rule.number}</th>
                      <td>{rule.lang.eng.name}</td>
                      <td><a href={`/subrules?id=${rule._id}`}> {rule.lang.eng.subRules?rule.lang.eng.subRules.length:0}</a></td>
                      <td><button className='btn btn-danger' onClick={()=>{this.deleteRule(rule._id)}}>Delete</button>&emsp;<button className='btn btn-primary'>Edit</button></td>
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
