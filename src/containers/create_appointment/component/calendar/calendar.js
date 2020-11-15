import moment from 'moment';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import {Header} from 'react-native-elements';
import Modal from 'react-native-modal';
import reactotron from 'reactotron-react-native';
import Input from '../../../input/input';
import {MyScrollView0} from '../../../my_scroll_view/my_scroll_view';
import TimePicker from '../../../time_picker/time_picker';
import {todayWithFormat} from '../../../../utility/date';
import {getStringFromIndexRange} from '../../../../utility/string';
import useCalendar from './hook';
import styles from './style';
LocaleConfig.locales.vi = {
  monthNames: [
    'Tháng Một',
    'Tháng Hai',
    'Tháng Ba',
    'Tháng Tư',
    'Tháng Năm',
    'Tháng Sáu',
    'Tháng Bảy',
    'Tháng Tám',
    'Tháng Chín',
    'Tháng Mười',
    'Tháng Mười Một',
    'Tháng Mười Hai',
  ],
  monthNamesShort: [
    'Một',
    'Hai',
    'Ba',
    'Bốn',
    'Năm',
    'Sáu',
    'Bảy',
    'Tám',
    'Chín',
    'Mười',
    'Mười Một',
    'Mười Hai',
  ],
  dayNames: [
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy',
    'Chủ Nhật',
  ],

  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
};
LocaleConfig.defaultLocale = 'vi';

export default function Calendar({
  markedDates,
  onDayPress,
  isVisible,
  oncancel,
  onPressConfirm,
  calendarTime,
  onChangeTime,
  minDate,
  pickerTime,
  onTimeChange,
  openTime,
  closeTime,
}) {
  const [currentMonth, setcurrentMonth] = useState(undefined);
  const [currentYear, setCurrentYear] = useState(undefined);
  const _getVietnameseMonths = () => {
    const month = parseInt(currentMonth, 10);
    switch (month) {
      case 1:
        return 'một';
      case 2:
        return 'hai';
      case 3:
        return 'ba';
      case 4:
        return 'bốn';
      case 5:
        return 'năm';
      case 6:
        return 'sáu';
      case 7:
        return 'bảy';
      case 8:
        return 'tám';
      case 9:
        return 'chín';
      case 10:
        return 'mười';
      case 11:
        return 'mười một';
      case 12:
        return 'mười hai';
    }
  };
  const {state, setCanShowTimePickerEvent} = useCalendar();

  const _setMinimumDate = () => {
    let date = new Date(Date.now());
    const h = Number(getStringFromIndexRange(openTime, 0, 2));
    const m = Number(getStringFromIndexRange(openTime, 3, 6));

    date.setHours(h);
    date.setMinutes(m);
    return date;
  };
  const _setMaximumDate = () => {
    let date = new Date(Date.now());
    const h = Number(getStringFromIndexRange(closeTime, 0, 2));
    const m = Number(getStringFromIndexRange(closeTime, 3, 6));

    date.setHours(h);
    date.setMinutes(m);
    return date;
  };

  return (
    <Modal style={[styles.modal0]} isVisible={isVisible}>
      <View>
        <Header
          leftComponent={
            <TouchableOpacity
              onPress={() => {
                oncancel();
              }}>
              <Text style={[styles.text1]}>HỦY</Text>
            </TouchableOpacity>
          }
          centerComponent={<Text style={[styles.text0]}>Chọn thời gian</Text>}
          containerStyle={[styles.header0]}
          rightComponent={
            <TouchableOpacity
              disabled={!calendarTime}
              onPress={() => {
                onPressConfirm();
              }}>
              <Text
                style={[
                  styles.text1,
                  {
                    color: calendarTime ? '#1792e6' : '#e2e6e8',
                  },
                ]}>
                OK
              </Text>
            </TouchableOpacity>
          }
        />
        <MyScrollView0>
          <View style={[styles.view0]}>
            <View style={[styles.view1]}>
              <Text style={[styles.text2]}>Giờ hẹn</Text>
              {/* <TouchableOpacity onPress={() => setCanShowTimePickerEvent(true)}>
                <View pointerEvents="none">
                  <Input
                    // editable={false}
                    inputContainerStyle={[styles.input1]}
                    containerStyle={[styles.input0]}
                    onChangeText={onChangeTime}
                    value={calendarTime}
                  />
                </View>
              </TouchableOpacity> */}
              <Input
                    // editable={false}
                    inputContainerStyle={[styles.input1]}
                    containerStyle={[styles.input0]}
                    onChangeText={onChangeTime}
                    value={calendarTime}
                  />
            </View>
            <Text style={[styles.text2]}>
              Tháng {_getVietnameseMonths()}, {currentYear}
            </Text>
            <CalendarList
              minDate={minDate}
              enableSwipeMonths={true}
              onVisibleMonthsChange={(month) => {
                setcurrentMonth(month[0]?.month);
                setCurrentYear(month[0]?.year);
              }}
              theme={{
                todayTextColor: '#000',
                selectedDayBackgroundColor: '#ddf1ff',
                selectedDayTextColor: '#1790e9',
              }}
              renderHeader={() => {
                return <></>;
              }}
              style={[styles.calendarList0]}
              markedDates={markedDates}
              horizontal={true}
              pagingEnabled={true}
              onDayPress={onDayPress}
            />
            <TimePicker
              minimumDate={_setMinimumDate()}
              maximumDate={_setMaximumDate()}
              // isVisible={state?.canShowTimePicker}
              time={pickerTime}
              onTimeChange={onTimeChange}
              onPressConfirm={() => {
                setCanShowTimePickerEvent(false);
                onChangeTime(pickerTime);
              }}
              onPressContainer={() => {
                setCanShowTimePickerEvent(false);
              }}
            />
          </View>
        </MyScrollView0>
      </View>
    </Modal>
  );
}
