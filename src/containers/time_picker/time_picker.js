import moment from 'moment';
import {Container} from 'native-base';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Button} from 'react-native-elements';
import {getStringFromIndexRange} from '../../utility/string';
import styles from './style';
// https://github.com/henninghall/react-native-date-picker

export default function TimePicker({
  onPressConfirm,
  onPressContainer,
  time,
  titleText,
  isVisible,
  onTimeChange,
  minimumDate,
}) {
  const _onDateChange = (date) => {
    let h = date.getHours();
    let m = date.getMinutes();
    if (h < 10) {
      h = '0' + h;
    }
    if (m < 10) {
      m = '0' + m;
    }
    const ti = h + ':' + m;
    onTimeChange(ti);
  };

  const _handleTime = (ti) => {
    const h = getStringFromIndexRange(ti, 0, 2);
    const m = getStringFromIndexRange(ti, 3, 5);
    let t = moment().toDate();
    t.setHours(h);
    t.setMinutes(m);
    return t;
  };
  if (isVisible) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressContainer}
        style={[styles.touchableOpacity0]}>
        <Container style={[styles.container0]}>
          <View style={[styles.view0]}>
            <Text style={[styles.text0]}>{titleText}</Text>
            <DatePicker
              date={_handleTime(time)}
              mode="time"
              onDateChange={_onDateChange}
              minimumDate={minimumDate}
            />
            <Button
              title="Chọn"
              buttonStyle={[styles.button0]}
              onPress={onPressConfirm}
            />
          </View>
        </Container>
      </TouchableOpacity>
    );
  }
  return <></>;
}
