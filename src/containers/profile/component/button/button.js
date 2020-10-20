import styles from './style';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const Button = ({
  leftImg,
  rightImg,
  title,
  containerStyle,
  onPress,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.touchableOpacity0, containerStyle]}>
      <View style={[styles.view0]}>
        <Image source={leftImg} />
        <View style={[styles.view1]}>
          <Text style={[styles.text0, textStyle]}>{title}</Text>
          <Image source={rightImg} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
