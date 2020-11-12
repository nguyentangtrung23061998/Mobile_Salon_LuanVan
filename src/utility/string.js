import Lodash from 'lodash';
import reactotron from 'reactotron-react-native';
import validator from 'validator';

export const convertToSingleSpace = (str) => {
  return str.replace(/  +/g, ' ');
  // 'a  b' => 'a b'
};

export const noSpaceAtEntry = (str) => {
  return str.replace(/^\s*\s*$/, '');
  // ' abc' => 'abc'
};

export const noSpaceAtAll = (str) => {
  return str.replace(/\s/g, '');
  // ' a b c ' => 'abc'
};

export const isStringEmpty = (str) => {
  return Lodash.isEmpty(str);
};

export const isTwoStringEqual = (str0, str1) => {
  return Lodash.isEqual(str0, str1);
};

export const areTwoStringsEqual = (str0, str1) => {
  return Lodash.isEqual(str0, str1);
};

export const getStringFromIndexRange = (str, startIndex, endIndex) => {
  // return str.substring(startIndex, endIndex);
  // const str =  'abcdef'
  // getStringFromIndexRange(str,1,3) => 'bcd'
};

export const isUrl = (str) => {
  const isEmpty = Lodash.isEmpty(str);
  if (isEmpty) {
    return false;
  }
  return validator.isURL(str);
};

export const getDDFormat = (day) => {
  if (day < 10) {
    return '0' + day;
  }
  return day;
};

export const getMMFormat = (month) => {
  if (month < 10) {
    return '0' + month;
  }
  return month;
};

export const getSafeStringValue = (str, defaultValue) => {
  if (
    (str === undefined || str === null || Lodash.isEmpty(str)) &&
    !Lodash.isNumber(str)
  ) {
    return defaultValue;
  }
  return str + '';
};

export const getStringLength = (str) => {
  if (str === undefined || str === null) {
    return 0;
  }
  return str.length;
};

export const getSafeString = (str, defaultString) => {
  if (str === undefined || str === null) {
    return '';
  }
  return str + '';
};

export const numberOnly = (str) => {
  return str.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
};

export const noSpaceAtStartAndEnd = (str) => {
  return str.trimStart().trimEnd();
};
