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
