import {
  MAX_FREE_KEYS,
  FILTERS_TRADE_TYPE_ASCENDING,
  FILTERS_TRADE_TYPE_DESCENDING,
  FILTERS_EXCHANGE_NAME_ASCENDING,
  FILTERS_EXCHANGE_NAME_DESCENDING,
  FILTERS_AMOUNT_ASCENDING,
  FILTERS_AMOUNT_DESCENDING,
  FILTERS_TIMESTAMP_ASCENDING,
  FILTERS_TIMESTAMP_DESCENDING,
  FILTERS_FEE_ASCENDING,
  FILTERS_FEE_DESCENDING
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
* given 2 trades, arrange by ascending or descending.
* several isReverse/fieldName specifics/gotchas here due to values from apis
*/
const sortTrade = (a, b, fieldName, isReverse = false) => {
  let fieldNameA = a[fieldName],
      fieldNameB = b[fieldName],
      isLessThan,
      isGreaterThan;

  const isNumericField = fieldName === 'amount' ||
                         fieldName === 'fee';
  const isTimestampField = fieldName === 'timestamp';
  if (isNumericField) {
    // isNaN check for 'n/a' string values
    if (Number.isNaN(Number(fieldNameA))) {
      fieldNameA = 0.00000000;
    }
    if (Number.isNaN(Number(fieldNameB))) {
      fieldNameB = 0.00000000;
    }
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
* then sort the array by this fieldName.
*
* NOTE, to be clear:
* sortBy is the selected sortBy field.
* tradeFieldName is the field name in a single trade object.
*/
export const sortTrades = (trades, sortBy) => {

  let tradeFieldName = '';
  if (sortBy === FILTERS_TIMESTAMP_ASCENDING ||
      sortBy === FILTERS_TIMESTAMP_DESCENDING) {
    tradeFieldName = 'timestamp';
  } else if (sortBy === FILTERS_TRADE_TYPE_ASCENDING ||
             sortBy === FILTERS_TRADE_TYPE_DESCENDING) {
    tradeFieldName = 'tradeType';
  } else if (sortBy === FILTERS_EXCHANGE_NAME_ASCENDING ||
             sortBy === FILTERS_EXCHANGE_NAME_DESCENDING) {
    tradeFieldName = 'exchangeName';
  } else if (sortBy === FILTERS_AMOUNT_ASCENDING ||
             sortBy === FILTERS_AMOUNT_DESCENDING) {
    tradeFieldName = 'amount';
  } else if (sortBy === FILTERS_FEE_ASCENDING ||
             sortBy === FILTERS_FEE_DESCENDING) {
    tradeFieldName = 'fee';
  }

  return trades && trades.length && trades.sort((a, b) => {
    // ascending
    if (sortBy === FILTERS_TRADE_TYPE_ASCENDING ||
        sortBy === FILTERS_EXCHANGE_NAME_ASCENDING ||
        sortBy === FILTERS_AMOUNT_ASCENDING ||
        sortBy === FILTERS_TIMESTAMP_ASCENDING ||
        sortBy === FILTERS_FEE_ASCENDING) {
      return sortTrade(a, b, tradeFieldName);
    }

    // descending
    else if (sortBy === FILTERS_TRADE_TYPE_DESCENDING ||
             sortBy === FILTERS_EXCHANGE_NAME_DESCENDING ||
             sortBy === FILTERS_AMOUNT_DESCENDING ||
             sortBy === FILTERS_TIMESTAMP_DESCENDING ||
             sortBy === FILTERS_FEE_DESCENDING) {
      return sortTrade(a, b, tradeFieldName, true);
    }
    return 0;
  });
}

