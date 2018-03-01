import React from 'react';
import TradeHistoryTableHeadCell from './TradeHistoryTableHeadCell';

const TradeHistoryTableHead = ({ headings, activeSortBy, onSetSortBy}) => (
  <thead>
    <tr>
      {headings.map((field) =>
        <TradeHistoryTableHeadCell
          key={field}
          field={field.toLowerCase()}
          activeSortBy={activeSortBy}
          onSetSortBy={onSetSortBy}
        />
      )}
    </tr>
  </thead>
);

export default TradeHistoryTableHead;
