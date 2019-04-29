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
      rule:null,
      modalOpen:false,
    }
  }
  componentDidMount()
  {
    this.refreshList();
  }
  deleteSubRule=(id)=>{
    let val=window.confirm('Do you really want to delete this rule?');
    if(val){
      $.ajax({
        url:`/api/rules/${this.props.id}/subrules/${id}`,
        type:'DELETE',
        success:()=>{
          this.refreshList();
        }
      })
    }
  }
  addSubRule=()=>{
    var body=$('#add-subrule-form').serialize();
    $.ajax({
      url:`/api/rules/${this.props.id}/subrules`,
      type:'POST',
      data:body,
      success:()=>{
        document.getElementById('add-subrule-form').reset();
        this.refreshList();
        this.setState({modalOpen:false});
      }
    })
  }
  refreshList=()=>{
    console.log(this.props.id);
    fetch(`/graphql/rules?query=query{one(id:"${this.props.id}"){_id,number,lang{eng{title,text,name,subRules{number,name,title}}}}}`).then(x=>x.json()).then(x=>{
        this.setState({rule:x.data.one});
    })
  }
  openAddModal=()=>{
    this.setState({modalOpen:true});
  }
  render() {
    return (
      <div>
        <Navbar/>
        <ModalBase title="Add new subrule" onCloseClick={()=>{this.setState({modalOpen:false})}} open={this.state.modalOpen}>
          <div style={{flex:1,padding:25,height:'100%',overflowX:'auto'}}>
            <form id="add-subrule-form">
              <input type="text" hidden name="ruleid" readOnly value={this.props.id}/>
              <div className="form-group">
                <label htmlFor="number">#</label>
                <input type="text" className="form-control" id="number" name="number" placeholder="Num of subrule"/>
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
                <textarea rows={3} className="form-control" id="text" name="text" placeholder="Text description of the subrule"></textarea>
              </div>
            </form>
            <div className="form-group" style={{paddingTop:20}}>
                <button onClick={this.addSubRule} style={{fontWeight:'bold',transition:'.6s'}} className="form-control btn-primary">Submit</button>
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
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rule?this.state.rule.lang.eng.subRules.map(rule=>{
                    console.log(rule);
                  return(
                    <tr key={rule.number}>
                      <th scope="row">{rule.number}</th>
                      <td>{rule.name}</td>
                      <td><button className='btn btn-danger' onClick={()=>{this.deleteSubRule(rule._id)}}>Delete</button>&emsp;<button className='btn btn-primary'>Edit</button></td>
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

export default Rules;
