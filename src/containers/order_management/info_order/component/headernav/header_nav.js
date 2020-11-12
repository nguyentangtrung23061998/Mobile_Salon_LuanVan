import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import back from '../../../../../assets/icon/back/back.png';
import styles from './style';
const HeaderNav = ({
  title,
  hasLeftIcon,
  containerStyle,
  titleStyle,
  rightStyle,
  onPressLeft,
  leftStyle,
  rightTitle,
  rightTitleStyle,
  onPressRightItem,
  timeCreate,
  day,
  status,
}) => {
  return (
    <View>
      <View style={[styles.view0, containerStyle]}>
        <TouchableOpacity onPress={onPressLeft}>
          <View style={[styles.view1, leftStyle]}>
            {hasLeftIcon && <Image source={back} />}
          </View>
        </TouchableOpacity>
        <View style={[styles.view2]}>
          <Text style={[styles.text0, titleStyle]}>{title}</Text>
        </View>
        <View style={[styles.view3, rightStyle]}>
          <TouchableOpacity onPress={onPressRightItem}>
            {rightTitle && (
              <Text style={[styles.text1, rightTitleStyle]}>{rightTitle}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.view5]}>
        <View style={[styles.view6]}>
          <View style={[styles.view7]}>
            <Text style={[styles.text4]}>TẠO LÚC:</Text>
            <Text style={[styles.text5]}>{timeCreate}</Text>
          </View>
          <View style={[styles.view7]}>
            <Text style={[styles.text4]}>NGÀY:</Text>
            <Text style={[styles.text5]}>{day}</Text>
          </View>
        </View>
        <View style={[styles.view8]}>
          <View style={styles.view9}>
            <Text style={styles.text6}>{status}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HeaderNav;
