import { React, Component } from 'react';

import Strikes from './components/Strikes';
import LatestFlow from './components/LatestFlow';
import FlowLineChart from './components/FlowLineChart';
import PieChart from './components/PieChart';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      symbol: '',
      datetime: new Date().toString(),
      flowData: [],
    };
  }

  componentDidMount() {
    const symbol = window.location.search.substring(1).toUpperCase();

    fetch(
      `${process.env.REACT_APP_SECRET_CHARTS}:${process.env.REACT_APP_SECRET_CHARTS_SERVER_PORT}/flow/${symbol}`
    )
      .then((res) => res.json())
      .then((flowData) => {
        console.log(flowData);
        this.setState({ symbol: symbol, flowData: flowData });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="symbol">{this.state.symbol}</div>
        <div className="datetime">{this.state.datetime}</div>
        <div>
          <div className="strikes-pie-chart-container">
            <div className="strikes-container">
              <Strikes flowData={this.state.flowData} />
            </div>
            <div className="pie-chart-container">
              <PieChart flowData={this.state.flowData} />
            </div>
          </div>

          <div className="latest-flow-line-chart-container">
            <div className="latest-flow-container">
              <LatestFlow flowData={this.state.flowData} />
            </div>
            <div className="line-chart-container">
              <FlowLineChart flowData={this.state.flowData} />
            </div>
          </div>
          <div className="disclaimer">
            Assumption: bid/below bid calls are bearish and puts are bullish.
            This can indicate possible closing or selling, but not all the time.
            We don't know if the person/entity is using advance strategies or
            hedging. Total value for strikes are estimated. Use at own risk
            because everything on here may be wrong.
          </div>
        </div>
      </div>
    );
  }
}

export default App;
