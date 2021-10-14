import { React, Component } from 'react';
import { Line } from 'react-chartjs-2';

class FlowLineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flow: {},
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.flowData.length === 0) {
      this.createData(this.props.flowData[0].flow);
    }
  }

  createData = (flow) => {
    const labels = [];
    const sentiment = [];
    let sentimentCounter = 0;

    for (var i = flow.length - 1; i >= 0; i--) {
      labels.unshift(i + 1);

      if (flow[i].sentiment === 'BULLISH') {
        sentimentCounter += 1;
      } else {
        sentimentCounter -= 1;
      }

      sentiment.push(sentimentCounter);
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Flow',
          data: sentiment,
          backgroundColor: ['Blue'],
        },
      ],
    };

    this.setState({ flow: data });
  };

  render() {
    const options = {
      responsive: true,
      animation: {
        duration: 0,
      },
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Option Flow Sentiment Over Time',
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    return (
      <div className="flow-line-chart">
        <Line data={this.state.flow} options={options} />
      </div>
    );
  }
}

export default FlowLineChart;
