import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import calendarPicker from '../../../../assets/icon/calendar_picker/calendar_picker.png';
import {INIT_CUSTOMER_NAME} from '../../state';
import styles from './style';
export default function Input({
  label,
  value,
  containerStyle,
  hasRightImage,
  onPress,
}) {
  return (
    <View style={[containerStyle]}>
      <Text style={[styles.text0]}>{label}</Text>
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}>
        <View style={[styles.view0]}>
          <Text
            style={[
              styles.text1,
              value === INIT_CUSTOMER_NAME ? styles.text2 : styles.text3,
            ]}>
            {value}
          </Text>
          {hasRightImage && <Image source={calendarPicker} />}
        </View>
      </TouchableOpacity>
    </View>
  );
}
