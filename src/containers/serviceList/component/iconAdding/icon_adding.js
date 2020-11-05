import styles from './style';
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

const IconAdding = ({image, isActive, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <View style={[styles.view0, {borderWidth: isActive ? 3 : 0}]}>
          <Image style={[styles.image0]} source={image} resizeMode="contain" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default IconAdding;
