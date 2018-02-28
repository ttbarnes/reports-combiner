import React, { PureComponent } from 'react';

class TradeHistoryTableHead extends PureComponent {
  render() {
    const { headings } = this.props;
    return (
      <thead>
        <tr>
          {headings.map((field) => {
            return (
              <th key={field}>
                {field}
              </th>
            );
          })}
        </tr>
      </thead>
    )
  }
}

export default TradeHistoryTableHead;
