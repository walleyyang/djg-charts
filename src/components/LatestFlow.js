import { React, Component } from 'react';

import './components.styles.css';

class LatestFLow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalFlow: 0,
      latestFlow: [],
      flow: {},
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.flowData.length === 0) {
      const flow = this.props.flowData[0].flow;
      this.setState({
        totalFlow: flow.length,
        latestFlow: this.getRows(flow),
        flow: flow,
      });
    }
  }

  getRows = (flow) => {
    let rows = [];
    const bullIcon = 'https://i.imgur.com/GobRl44.png';
    const bearIcon = 'https://i.imgur.com/OWXP4Yv.png';
    const maxLatestToDisplay = 10;

    for (let i = 0; i < maxLatestToDisplay; i++) {
      const sentiment = flow[i].sentiment;
      const icon = sentiment === 'BULLISH' ? bullIcon : bearIcon;
      rows.unshift(
        <tr key={i}>
          <td>
            <img className="icon" src={icon} alt={sentiment} />
            {sentiment}
          </td>
          <td>{flow[i].value}</td>
          <td>{flow[i].position}</td>
          <td>{flow[i].details}</td>
          <td>{flow[i].type}</td>
          <td>{flow[i].strike}</td>
          <td>{flow[i].expiration}</td>
          <td>{flow[i].time}</td>
        </tr>
      );
    }

    return rows;
  };

  render() {
    return (
      <div className="flow-description">
        <div>Latest 10 Flow | Total Flow : {this.state.totalFlow}</div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Sentiment</th>
                <th>Value</th>
                <th>Position</th>
                <th>Details</th>
                <th>Type</th>
                <th>Strike</th>
                <th>Expiration</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>{this.state.latestFlow}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default LatestFLow;
