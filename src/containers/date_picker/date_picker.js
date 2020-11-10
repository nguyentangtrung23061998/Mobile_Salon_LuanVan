import styles from './style';
import React from 'react';
import {Container} from 'native-base';
import RNDatePicker from 'react-native-date-picker';
import {View, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import moment from 'moment';
import reactotron from 'reactotron-react-native';
export const DatePicker = React.memo(
  ({
    date = '1995/08/16',
    onDateChange,
    isVisible,
    onConfirm,
    onPressContainer,
    maximumDate,
    minimumDate,
  }) => {
    if (isVisible) {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPressContainer}
          style={[styles.touchableOpacity0]}>
          <Container style={[styles.container0]}>
            <View style={[styles.view0]}>
              <RNDatePicker
                mode="date"
                locale="vi"
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                date={new Date(date)}
                onDateChange={(val) => {
                  let date = new Date(val);
                  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
                  onDateChange(moment(date, 'YYYY-MM-DD').format('YYYY/MM/DD'));
                }}
              />
              <Button
                title="Xác nhận"
                buttonStyle={[styles.button0]}
                onPress={() => onConfirm(date)}
              />
            </View>
          </Container>
        </TouchableOpacity>
      );
    }
    return <></>;
  },
);
