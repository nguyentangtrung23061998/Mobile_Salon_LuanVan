import styles from './style';
import React from 'react';
import {Header} from 'react-native-elements';
import back from '../../assets/icon/back/back.png';
import {TouchableOpacity, View, Text} from 'react-native';
import {MTPImage0} from '../mtp_image';
import {useNavigation} from '@react-navigation/native';

export const HeaderNavigation = React.memo(
  ({
    containerStyle,
    centerComponent,
    title,
    onPressLeftComponent = () => {},
  }) => {
    const _navigation = useNavigation();

    const _leftComponent = () => (
      <TouchableOpacity
        onPress={() => {
          _navigation.goBack();
          onPressLeftComponent();
        }}>
        <View style={styles.view0}>
          <MTPImage0 source={back} />
        </View>
      </TouchableOpacity>
    );

    const _centerComponent = () => <Text style={styles.text0}>{title}</Text>;
    return (
      <Header
        containerStyle={[styles.header0, containerStyle]}
        leftComponent={_leftComponent}
        centerComponent={centerComponent ? centerComponent : _centerComponent}
      />
    );
  },
);
