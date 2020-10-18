import styles from './style';
import React from 'react';
import {Spinner} from 'native-base';
import {View} from 'react-native';
const Loading = ({containerStyle}) => {
  return (
    <View style={[styles.view0, containerStyle]}>
      <Spinner color={'#fff'} />
    </View>
  );
};

export default React.memo(Loading);
