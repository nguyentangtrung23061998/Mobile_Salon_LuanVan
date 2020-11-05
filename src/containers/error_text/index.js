import styles from './style';
import {Text} from 'react-native';
import React from 'react';
export const ErrorText = ({errorMessage}) => {
  return <Text style={[styles.text0]}>{errorMessage}</Text>;
};
