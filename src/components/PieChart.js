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
      this.setState({
        totalBullish:
          this.props.flowData[0].chartData.sentimentCount.totalBullish,
        totalBearish:
          this.props.flowData[0].chartData.sentimentCount.totalBearish,
        data: this.props.flowData[0].chartData.sentimentCount.data,
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
