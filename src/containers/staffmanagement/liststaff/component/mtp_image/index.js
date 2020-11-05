import Lodash from 'lodash';
import React from 'react';
import {Image} from 'react-native';
import {Image as RNEImage} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import validator from 'validator';
import {ActivityIndicator} from 'react-native';

export const MTPImage0 = React.memo(
  ({source, style, PlaceholderContent = <ActivityIndicator />}) => {
    if (source === undefined || source === null) {
      return <></>;
    }

    if (source && Lodash.isNumber(source)) {
      return <Image source={source} style={[style]} />;
    }

    if (source && validator.isURL(source) && !Lodash.isNumber(source)) {
      return (
        <RNEImage style={[style]} PlaceholderContent={PlaceholderContent}>
          <FastImage style={[style]} source={{uri: source}} />
        </RNEImage>
      );
    }
  },
);
