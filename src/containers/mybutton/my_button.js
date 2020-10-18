import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';

const MyButton = ({
  height,
  title,
  borderRadius,
  containerStyle,
  bgColor,
  leftIconSource,
  colorType,
  startColor,
  endColor,
  titleStyle,
  onPress,
  disabled,
  leftTitleIcon,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        containerStyle,
        styles.view0,
        {
          height: height ?? 40,
          borderRadius: borderRadius ?? 20,
          backgroundColor: bgColor,
        },
      ]}
      disabled={disabled}>
      <View>
        {colorType === 'topToBottom' && (
          <LinearGradient
            colors={[startColor, endColor]}
            locations={[0, 1]}
            style={[
              styles.linearGradient0,
              {
                borderRadius: borderRadius ?? 20,
              },
            ]}
          />
        )}

        {colorType === 'leftToRight' && (
          <LinearGradient
            colors={[startColor, endColor]}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            locations={[0, 1]}
            style={[
              styles.linearGradient0,
              {
                borderRadius: borderRadius ?? 20,
              },
            ]}
          />
        )}

        <View style={[styles.view1]}>
          <Image source={leftIconSource} />
          <View style={[styles.view2]} />
          <View style={[styles.view3]}>
            {leftTitleIcon && <Image source={leftTitleIcon} />}
            <Text style={[styles.text0, titleStyle]}> {title}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyButton;
