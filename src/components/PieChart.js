import { React, Component } from 'react';
import { Pie } from 'react-chartjs-2';

import './components.styles.css';

class PieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalBullish: 0,
      totalBearish: 0,
      data: {},
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.flowData.length === 0) {
      const flow = this.props.flowData[0].flow;
      let bullish = 0;
      let bearish = 0;

      for (let f of flow) {
        f.sentiment === 'BULLISH' ? (bullish += 1) : (bearish += 1);
      }

      const data = {
        labels: [`Bullish (${bullish})`, `Bearish (${bearish})`],
        datasets: [
          {
            label: 'Bullish/Bearish Sentiment',
            data: [bullish, bearish],
            backgroundColor: ['Green', 'Red'],
          },
        ],
      };

      this.setState({
        totalBullish: bullish,
        totalBearish: bearish,
        data: data,
      });
    }
  }

  render() {
    const options = {
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
          text: 'Sentiment by Count',
        },
      },
    };

    return (
      <div className="pie-chart">
        <Pie data={this.state.data} options={options} />
      </div>
    );
  }
}

export default PieChart;
