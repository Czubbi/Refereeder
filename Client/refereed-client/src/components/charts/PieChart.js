import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';


class PieChart extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
        chartData: {
            labels: ['Good Answers', 'Bad Answers'],
            datasets:[
                {
                    data: [
                        123,
                        620
                    ],
                    backgroundColor:[
                        'rgba(54,162,235,0.6)',
                        'rgba(255,99,132,0.6)',
                    ]
                }
            ]
          }
    }
  }
  render() {
    return (
      <div className='PieChart'>
          <Pie
                data={this.state.chartData}
                width={250}
                height={250}
                options={{ maintainAspectRatio: false }}
                />
      </div>
    );
  }
}

export default PieChart;