import styles from './style';
import React from 'react';
import {Header} from 'react-native-elements';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import back from 'app/src/assets/icon/back/back.png';
import arrowDown from 'app/src/assets/icon/arrow_down/arrow_down.png';
import calendar from 'app/src/assets/icon/calendar_header/calendar.png';
import search from 'app/src/assets/icon/searchGreen/search.png';
const HeaderNav = ({onPressLeft, onPressCenter, centerTitle}) => {
  const _leftComponent = () => {
    return (
      <TouchableOpacity
        style={[styles.touchableOpacity0]}
        onPress={onPressLeft}>
        <Image source={back} />
      </TouchableOpacity>
    );
  };
  const _centerComponent = () => {
    return (
      <TouchableOpacity onPress={onPressCenter}>
        <View style={[styles.view0]}>
          <Text style={[styles.text0]}>{centerTitle}</Text>
          <Image source={arrowDown} style={[styles.image0]} />
        </View>
      </TouchableOpacity>
    );
  };
  const _rightComponent = () => {
    return (
      <View style={[styles.view1]}>
        <Image source={calendar} />
        <View style={[styles.view2]} />
        <Image source={search} />
      </View>
    );
  };
  return (
    <Header
      containerStyle={[styles.header0]}
      leftComponent={_leftComponent}
      centerComponent={_centerComponent}
      rightComponent={_rightComponent}
    />
  );
};

export default HeaderNav;
