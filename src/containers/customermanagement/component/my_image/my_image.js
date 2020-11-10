import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Image as RNEImage} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';

export const MyImage0 = ({source, style}) => {
  const [err, setErr] = useState(false);
  const _onError = () => {
    setErr(true);
  };
  return (
    <RNEImage
      style={[style]}
      PlaceholderContent={err ? <></> : <ActivityIndicator />}>
      <FastImage onError={_onError} style={[style]} source={{uri: source}} />
    </RNEImage>
  );
};
