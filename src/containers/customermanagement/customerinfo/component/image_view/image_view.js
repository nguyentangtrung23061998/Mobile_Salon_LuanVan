import React from 'react';
import {Image, View} from 'react-native';
import styles from './style';
const ImageView = ({imageUri, styleImage}) => {
  return (
    <View style={[styles.view0]}>
      <Image style={[styles.image0, styleImage]} source={{uri: imageUri}} />
    </View>
  );
};

export default ImageView;
