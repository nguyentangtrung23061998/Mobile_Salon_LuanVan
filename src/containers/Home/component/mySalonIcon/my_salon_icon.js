import styles from './style';
import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {MTPImage0} from '../../../mtp_image';

const MySalonIcon = ({imageSource, title, description, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{width: '49%', aspectRatio: 1 / 1}}>
      <View style={[styles.view0]}>
        <Image source={imageSource} />
        <Text style={[styles.text0]}>{title}</Text>
        <Text style={[styles.text1]}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MySalonIcon;

export const SalonIcon = ({
  source,
  titleText,
  descriptionText,
  onPress,
  imageStyle,
}) => {
  return (
    <View style={[styles.view1]}>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.view2]}>
          <MTPImage0
            source={source}
            style={[{marginTop: titleText === 'Đơn hàng' ? 25 : 0}, imageStyle]}
          />
          <Text style={[styles.text3]}>{titleText}</Text>
          <Text style={[styles.text4]}>{descriptionText}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
