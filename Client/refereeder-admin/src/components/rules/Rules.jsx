import React, { Component } from 'react';
import Navbar from '../navbar/Navbar'
import Topbar from '../navbar/Topbar'

class Rules extends Component {
  constructor(){
    super();
    this.state={
      rules:[],
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
  render() {
    return (
      <div>
        <Navbar/>
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
      </div>
    );
  }
}

export default Rules;
