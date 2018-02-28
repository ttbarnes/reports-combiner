import {
  MAX_FREE_KEYS,
  HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL,
  HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL_REVERSE,
  HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL,
  HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL_REVERSE,
  HISTORY_TABLE_FILTERS_AMOUNT_ALPHABETICAL,
  HISTORY_TABLE_FILTERS_AMOUNT_ALPHABETICAL_REVERSE,
  HISTORY_TABLE_FILTERS_TIMESTAMP_ASCENDING,
  HISTORY_TABLE_FILTERS_TIMESTAMP_DESCENDING
} from '../constants';

// TODO: tidy up notes/docs
// TODO: make more functional :)

/*
returns a new array without duplicate values
*/
const uniqueArray = (arr) => arr.filter((v, i) => arr.indexOf(v) === i);

/*
* accepts: 
* * * array of arrays: [ [1, 2, 3], [1, 2, 3], [1, 2, 3] ]
* * * child array index
*
* returns:
* * * a new array of objects: each object has percentage/stats/values for the child arrays.
*
* EG: if there are 5 arrays with the same arrIndex value of 'exchangeNameA'
* * * the instances of exchangeNameA will be returned as a single object in an array with totalCount, percentage etc
* 
*/

export const getPercentagesObjFromArrayIndex = (arr, arrIndex) => {
  let percentages = [];
  let allFields = [];
  
  arr.filter((a) => {
    let index = arrIndex;
    let fieldValue;
    if (arrIndex === 'last') {
      fieldValue = a[a.length - 1];
      return allFields = [...allFields, fieldValue];
    }
    return allFields = [...allFields, a[index]];
  });

  const allFieldsUnique = uniqueArray(allFields);
  
  let allFieldsTotalCount = 0;

  allFieldsUnique.map((f) => {
    const fieldTotalCount = allFields.filter(field => field === f).length;
    allFieldsTotalCount = allFieldsTotalCount + fieldTotalCount
    return percentages.push({
      name: f,
      totalCount: fieldTotalCount
    });
  });

  percentages.map((p) =>
    p.percentage = p.totalCount / allFieldsTotalCount * 100
  );

  return percentages;
}

/*
* shouldShowSubscribe
* conditions for subscribe messages/modals
*/
export const shouldShowSubscribe = (profile) => {
  if (!profile.subscription && profile.keys.length >= MAX_FREE_KEYS) {
    return true;
  }
  return false;
}

// TODO: move sortTrade string/number logic into sortTrades
// so it's less heavy on performance - .sort args should be short/simple as possible

/*
* sortTrade (for use with .sort())
* given 2 trades, arrange by ascending or descending, depending on isReverse and fieldName params
*/
const sortTrade = (a, b, fieldName, isReverse = false) => {
  let fieldNameA = a[fieldName],
      fieldNameB = b[fieldName],
      isLessThan,
      isGreaterThan;

  const isNumericField = fieldName === 'amount';
  const isTimestampField = fieldName === 'timestamp';
  if (isNumericField) {
    fieldNameA = Number(fieldNameA);
    fieldNameB = Number(fieldNameB);
    isLessThan = fieldNameA < fieldNameB;
    isGreaterThan = fieldNameA > fieldNameB;
  } else if (isTimestampField) {
    if (isReverse) {
      return new Date(fieldNameB).getTime() < new Date(fieldNameA).getTime();
    }
    return new Date(fieldNameB).getTime() - new Date(fieldNameA).getTime();
    
  } else {
    isLessThan = fieldNameA.toUpperCase() < fieldNameB.toUpperCase();
    isGreaterThan = fieldNameA.toUpperCase() > fieldNameB.toUpperCase();
  }

  if (isReverse) {
    if (isLessThan) {
      return 1;
    }
    if (isGreaterThan) {
      return -1;
    }
    return 0;
  }
  if (isLessThan) {
    return -1;
  }
  if (isGreaterThan) {
    return 1;
  }
  return 0;
};

/*
* sortTradesByFieldName
* given an array of trades and a sortBy string (sortBy string is a human friendly string from table headings)
* declare the fieldName used in each trade object
* then sort the array by this fieldName. Can be A-Z or Z-A
*/
export const sortTrades = (trades, sortBy) => {
  let fieldName = '';
  if (sortBy === HISTORY_TABLE_FILTERS_TIMESTAMP_ASCENDING ||
      sortBy === HISTORY_TABLE_FILTERS_TIMESTAMP_DESCENDING) {
    fieldName = 'timestamp';
  } else if (sortBy === HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL ||
             sortBy === HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL_REVERSE) {
    fieldName = 'tradeType';
  } else if (sortBy === HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL ||
             sortBy === HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL_REVERSE) {
    fieldName = 'exchangeName';
  } else if (sortBy === HISTORY_TABLE_FILTERS_AMOUNT_ALPHABETICAL ||
             sortBy === HISTORY_TABLE_FILTERS_AMOUNT_ALPHABETICAL_REVERSE) {
    fieldName = 'amount';
  }

  return trades && trades.length && trades.sort((a, b) => {
    // ascending
    if (sortBy === HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL ||
        sortBy === HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL ||
        sortBy === HISTORY_TABLE_FILTERS_AMOUNT_ALPHABETICAL ||
        sortBy === HISTORY_TABLE_FILTERS_TIMESTAMP_ASCENDING) {
      return sortTrade(a, b, fieldName);
    }

    // descending
    else if (sortBy === HISTORY_TABLE_FILTERS_TRADE_TYPE_ALPHABETICAL_REVERSE ||
             sortBy === HISTORY_TABLE_FILTERS_EXCHANGE_NAME_ALPHABETICAL_REVERSE ||
             sortBy === HISTORY_TABLE_FILTERS_AMOUNT_ALPHABETICAL_REVERSE ||
             sortBy === HISTORY_TABLE_FILTERS_TIMESTAMP_DESCENDING) {
      return sortTrade(a, b, fieldName, true);
    }
    return 0;
  });
}

