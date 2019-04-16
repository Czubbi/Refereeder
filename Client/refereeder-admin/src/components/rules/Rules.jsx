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
    fetch('/graphql/rules{}')
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
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td><button className='btn btn-danger'>Delete</button>&emsp;<button className='btn btn-primary'>Edit</button></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Rules;
