import React from 'react';
import FastImage from 'react-native-fast-image';
import {Image as RNEImage} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';
import {Image as Image0} from 'react-native';
function Image({source, style}) {
  return (
    <RNEImage style={[style]} PlaceholderContent={<ActivityIndicator />}>
      <FastImage style={[style]} source={{uri: source}} />
    </RNEImage>
  );
}

export default React.memo(Image);

export const LocalImage = ({uri, style}) => {
  return <Image0 source={{uri: uri}} style={[style]} />;
};
