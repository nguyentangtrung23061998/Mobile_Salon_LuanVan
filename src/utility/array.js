import Lodash from 'lodash';

export const deleteAt = (array, index) => {
  let tmp = array;
  tmp.splice(index, 1);
  return tmp;
};
// object array
export const getIndexByCondition = (array, arrayElementProp, value) => {
  return Lodash.findIndex(array, {[arrayElementProp]: value});
  /*
  const data = [{id:1, name:'a'}, {id: 2, name: 'b'}];
  getIndexByCondition(data, 'id', '1'); // output: 0
   */
};

export const arrayLength = (arr) => {
  if (Array.isArray(arr)) {
    return arr.length;
  }
  return 0;
};

export const isArrayEmpty = (arr) => {
  if (arrayLength(arr) === 0) {
    return true;
  }
  return false;
};

export const getSafeArrayValue = (arr, defaultArray) => {
  if (arr === undefined || arr === null) {
    return defaultArray;
  }
  return arr;
};

export const sumArray = (arr) => {
  const sum = arr.reduce((pv, cv) => pv + cv, 0);
  return sum;
};
