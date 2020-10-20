import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MTPImage0} from '../../../../component/mtp_image';
import styles from './style';
const MyIcon = ({startColor, endColor, imageSource, label, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.view0]}>
        <View style={[styles.view1]}>
          <LinearGradient
            colors={[startColor, endColor]}
            locations={[0, 1]}
            style={[styles.linearGradient0]}
          />
          <MTPImage0 source={imageSource} style={[styles.image0]} />
        </View>
        <Text style={[styles.text0]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MyIcon;
