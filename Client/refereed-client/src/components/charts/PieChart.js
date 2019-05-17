import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';


class PieChart extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
        chartData: {
            labels: ['Good answers', 'Bad Answers'],
            datasets:[
                {
                    data: [
                        props.user.goodAnswers,
                        props.user.badAnswers
                    ],
                    backgroundColor:[
                        'rgb(128,177,211)',
                        'rgb(253,180,98)',
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
