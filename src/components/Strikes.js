import { React, Component } from 'react';
import { Bar } from 'react-chartjs-2';

class Strikes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      strikes: {},
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.flowData.length === 0) {
      this.setState({ strikes: this.props.flowData[0].chartData.strikes });
    }
  }

  render() {
    const options = {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0,
      },
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Option Flow Sentiment by Strike',
        },
      },
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    return (
      <div className="strikes">
        <Bar id="strikes-chart" data={this.state.strikes} options={options} />
      </div>
    );
  }
}

export default Strikes;
