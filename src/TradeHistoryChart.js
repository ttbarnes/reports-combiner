import React, { Component } from 'react';
import {
  RadialChart,
  DiscreteColorLegend
} from 'react-vis';
import '../node_modules/react-vis/dist/style.css';

const DONUT_DATA = [
  {
    label: 'Exchange A',
    name: 'Exchange A',
    angle: 2
  },
  {
    label: 'Exchange B',
    name: 'Exchange B',
    angle: 6
  },
  {
    label: 'Exchange C',
    name: 'Exchange C',
    angle: 2
  }
]

const TEMP_LEGEND = [ 'exchange A', 'exchange B', 'exchange C'];

class TradeHistoryChart extends Component {
  render() {

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
              data={DONUT_DATA}
              width={300}
              height={350}
            />
          </div>

          <div className="legend-container">
            <DiscreteColorLegend
              items={TEMP_LEGEND}
            />
          </div>

        </div>

      </div>
    )
  }
}

export default TradeHistoryChart;
