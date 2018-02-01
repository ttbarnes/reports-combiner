import React, { Component } from 'react';
import { RadialChart } from 'react-vis';
import '../node_modules/react-vis/dist/style.css';
import MOCK_DATA from './mockData';
import { getPercentagesObjFromArrayIndex } from './utils';

class TradeHistoryChart extends Component {

  render() {

    const exchanges = getPercentagesObjFromArrayIndex(MOCK_DATA.rows, 'last');

    // rename required field names for chrat
    exchanges.map((e) => {
      e.angle = e.percentage;
      e.label = e.name;
      return e;
    });

    return (
      <div className="row">
        <h4>WIP Chart</h4>

        <div className="chart-container">

          <div>
            <RadialChart
              className={'donut-chart-example'}
              innerRadius={0}
              radius={150}
              getAngle={d => d.angle}
              data={exchanges}
              width={300}
              height={350}
              showLabels
            />
          </div>

          <div className="legend-container">
            {exchanges.map((i) =>
              <li key={i.name}>
                {i.name} {i.percentage.toString().substr(0, 2)}{'%'}
              </li>
            )}

          </div>

        </div>

      </div>
    )
  }
}

export default TradeHistoryChart;
