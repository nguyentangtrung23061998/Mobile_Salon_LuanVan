import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import styles from './style';

export const PrimaryButton = ({
  disabled = false,
  title,
  onPress,
  containerStyle,
  buttonStyle,
}) => {
  return (
    <Button
      disabled={disabled}
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: [
          !disabled ? '#4db1e9' : '#e4e5e6',
          !disabled ? '#005eff' : '#e4e5e6',
        ],
        start: {x: 0, y: 1},
        end: {x: 0, y: 0},
      }}
      title={title}
      onPress={onPress}
      containerStyle={[styles.button0, containerStyle]}
      buttonStyle={[styles.button1, buttonStyle]}
    />
  );
};
