import React from 'react';
import { HISTORY_TABLE_FIELDS_DISALLOWED } from '../../constants';
import './styles.css';

const fieldShouldNotRender = (fieldName) => HISTORY_TABLE_FIELDS_DISALLOWED.includes(fieldName);

const TradeHistoryTrade = ({ trade }) => {
  const fields = Object.keys(trade);

  return (
    <ul className="trade-history-note-trade-summary">
      {fields.map((f) => {
        if (fieldShouldNotRender(f)) {
          return null;
        }
        return (
          <li key={f}><small><b>{f}</b> {trade[f]}</small></li>
        );
      })}
    </ul>
  );
}

export default TradeHistoryTrade;
