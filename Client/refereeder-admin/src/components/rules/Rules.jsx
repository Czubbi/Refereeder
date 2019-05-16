import React, { Component } from 'react';
import Navbar from '../navbar/Navbar'
import Topbar from '../navbar/Topbar'
import AddButton from '../buttons/AddButton';
import ModalBase from '../modals/ModalBase';
var $ = require('jquery');

class Rules extends Component {
  constructor(){
    super();
    this.state={
      rules:[],
      modalOpen:false,
    }
  }
  componentDidMount()
  {
    this.refreshList();
  }
  deleteRule=(id)=>{
    let val=window.confirm('Do you really want to delete this rule?');
    if(val){
      $.ajax({
        url:`/api/rules/${id}`,
        type:'DELETE',
        success:()=>{
          this.refreshList();
        }
      })
    }
  }
  addRule=()=>{
    var body=$('#add-rule-form').serialize();
    $.ajax({
      url:`/api/rules`,
      type:'POST',
      data:body,
      success:()=>{
        document.getElementById('add-rule-form').reset();
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
        <ModalBase title="Add new rule" onCloseClick={()=>{this.setState({modalOpen:false})}} open={this.state.modalOpen}>
          <div style={{flex:1,padding:25,height:'100%',overflowX:'auto'}}>
            <form id="add-rule-form">
              <div className="form-group">
                <label htmlFor="number">#</label>
                <input type="text" className="form-control" id="number" name="number" placeholder="Num of rule"/>
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" name="name" placeholder="Name"/>
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" name="title" placeholder="Title"/>
              </div>
              <div className="form-group">
                <label htmlFor="text">Text</label>
                <textarea rows={3} className="form-control" id="text" name="text" placeholder="Text description of the rule"></textarea>
              </div>
            </form>
            <div className="form-group" style={{paddingTop:20}}>
                <button onClick={this.addRule} style={{fontWeight:'bold',transition:'.6s'}} className="form-control btn-primary">Submit</button>
            </div>
          </div>
        </ModalBase>
        <Topbar title="Rules management"/>
        <div className='content'>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Subrules</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rules.map(rule=>{
                  return(
                    <tr key={rule.number}>
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

export default Rules;
