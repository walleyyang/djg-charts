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
      this.createData(this.props.flowData[0].strikes);
    }
  }

  createData = (strikes) => {
    const labels = [];
    const callsValue = [];
    const putsValue = [];

    for (let strike of strikes) {
      labels.push(strike.strike);
      callsValue.push(strike.callsValue);
      putsValue.push(strike.putsValue);
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Bullish Sentiment',
          data: callsValue,
          backgroundColor: ['Green'],
        },
        {
          label: 'Bearish Sentiment',
          data: putsValue,
          backgroundColor: ['Red'],
        },
      ],
    };

    this.setState({ strikes: data });
  };

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
        <Bar data={this.state.strikes} options={options} />
      </div>
    );
  }
}

export default Strikes;
