import React from 'react';
import styles from './style';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import back from '../../assets/icon/back/back.png';
const HeaderNav = ({
  title,
  hasLeftIcon,
  leftTitle,
  leftTitleStyle,
  containerStyle,
  titleStyle,
  rightIconSource,
  homeHeader,
  rightStyle,
  onPressLeft,
  leftStyle,
  onPressRightImage,
  rightTitle,
  rightTitleStyle,
  onPressRightItem,
}) => {
  return (
    <View style={[styles.view0, containerStyle]}>
      {homeHeader && (
        <View style={[styles.view4]}>
          <Text style={[styles.text3]}>{homeHeader}</Text>
        </View>
      )}
      <TouchableOpacity onPress={onPressLeft}>
        <View style={[styles.view1, leftStyle]}>
          {hasLeftIcon && <Image source={back} />}
          {leftTitle && (
            <Text style={[styles.text1, leftTitleStyle]}>{leftTitle}</Text>
          )}
        </View>
      </TouchableOpacity>
      <View style={[styles.view2]}>
        <Text style={[styles.text0, titleStyle]}>{title}</Text>
      </View>
      <View style={[styles.view3, rightStyle]}>
        <TouchableOpacity onPress={onPressRightImage}>
          <Image source={rightIconSource} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressRightItem}>
          {rightTitle && (
            <Text style={[styles.text1, rightTitleStyle]}>{rightTitle}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderNav;
