import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export default StyleSheet.create({
  header0: {
    height: 0,
    marginTop: -getStatusBarHeight(),
  },
});
