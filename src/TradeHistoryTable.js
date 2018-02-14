import React, { Component } from 'react';
// import moment from 'moment';

// const MOMENT_DATE_FORMAT = 'Do MMM YYYY @ HH:mma';

class TradeHistoryTable extends Component {

  // cryptopia provides dates with this formatting: DD/MM/YYYY HH:mm:ssa
  // we want: Do MMM YYYY @ HH:mma
  // handleCryptopiaDateFormat(date) {
  //   return moment(date, 'DD/MM/YYYY HH:mm:ssa').format(MOMENT_DATE_FORMAT)
  // }

  render() {
    const { tradeHistory } = this.props;

    return (
      <div className="row">
        <h4 className="heading-with-bg">All Trade History</h4>
        {tradeHistory && tradeHistory.length ?
          <table>
            <thead>
              <tr>
                {Object.keys(tradeHistory[0]).map((field) => {
                  return (
                    <th key={field}>
                      {field}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {tradeHistory.map((cell, cellIndex) => {
                const cellKeys = Object.keys(cell);
                return (
                  <tr key={cellIndex}>
                    {cellKeys.map((field) => {
                      return (
                        <td key={field + cellIndex}>
                          {cell[field]}
                        </td>
                      );
                    }
                  )}
                  </tr>
                );

              })}
            </tbody>
          </table>
        : null }
      </div>
    )
  }
}

export default TradeHistoryTable;
