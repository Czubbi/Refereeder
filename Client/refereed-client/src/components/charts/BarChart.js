import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';


class BarChart extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
        chartData: props.chartDataBar
    }
  }
  render() {
    return (
      <div className='BarChart'>
          <Bar
                data={this.state.chartData}
                width={250}
                height={250}
                options={{ 
                    responsive: true,
                    title:{
                        display: true,
                        text: 'Tests taken by you',
                        fontSize: 15,
                    },
                    legend:{
                        display: false,
                    },
                    scales: {
                      yAxes: [{
                        ticks:{
                          beginAtZero: true
                        }
                      }]
                    }
                 }}
                />
      </div>
    );
  }
}

export default BarChart;
