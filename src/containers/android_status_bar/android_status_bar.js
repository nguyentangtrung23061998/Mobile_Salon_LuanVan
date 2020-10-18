import React from 'react';
import {Header} from 'react-native-elements';
import styles from './style';
import {Platform} from 'react-native';

export const AndroidStatusBar = React.memo(
  ({
    barStyle = 'dark-content',
    backgroundColor = 'transparent',
    containerStyle,
  }) => {
    if (Platform.OS === 'android') {
      return (
        <Header
          containerStyle={[containerStyle, styles.header0]}
          barStyle={barStyle}
          statusBarProps={{backgroundColor: backgroundColor}}
        />
      );
    }
    return <></>;
  },
);
