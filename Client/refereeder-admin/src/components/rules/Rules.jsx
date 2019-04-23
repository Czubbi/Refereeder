import React, { Component } from 'react';
import Navbar from '../navbar/Navbar'
import Topbar from '../navbar/Topbar'
import AddButton from '../buttons/AddButton';
import ModalBase from '../modals/ModalBase';

class Rules extends Component {
  constructor(){
    super();
    this.state={
      rules:[],
      modalOpen:true,
    }
  }
  componentDidMount()
  {
    fetch('/graphql/rules?query=query{all{_id,number,lang{eng{title,text,name,subRules{number,name,title}}}}}').then(x=>x.json()).then(x=>{
      this.setState({rules:x.data.all});
    })
  }
  deleteRule=(id)=>{

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
            <form>
              <div class="form-group">
                <label for="number">#</label>
                <input type="text" class="form-control" id="number" placeholder="Num of rule"/>
              </div>
              <div class="form-group">
                <label for="number">Name</label>
                <input type="text" class="form-control" id="number" placeholder="Name"/>
              </div>
              <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="number" placeholder="Title"/>
              </div>
              <div class="form-group">
                <label for="number">Text</label>
                <textarea rows={3} class="form-control" id="number" placeholder="Text description of the rule"></textarea>
              </div>
              <div class="form-group" style={{paddingTop:20}}>
                <input type="submit" style={{fontWeight:'bold',transition:'.6s'}} class="form-control btn-primary" value="Submit"/>
              </div>
            </form>
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
                  console.log(rule);
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
