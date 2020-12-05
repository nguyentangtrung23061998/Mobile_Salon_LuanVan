import {Container} from 'native-base';
import React, {useEffect} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {Header, Input as MyInput} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import calendarPicker from '../../assets/icon/calendar_picker/calendar_picker.png';
import ErrorPopUp from '../error_pop_up/error_pop_up';
import {TextArea} from '../input/input';
import Loading from '../loading/loading';
import {MTPImage0} from '../mtp_image/index';
import {MyScrollView0} from '../my_scroll_view/my_scroll_view';
import {PrimaryButton} from '../primary_button/primary_button';
import SuccessPopUp from '../success_pop_up/success_pop_up';
import {ViewH20} from '../viewh/viewh';
import {MAX_DIGITS_NUMBER_OF_CUSTOMER} from '../../constants/app';
import {todayWithFormat} from '../../utility/date';
import {
  isTwoStringEqual,
  noSpaceAtEntry,
  numberOnly,
} from '../../utility/string';
import Calendar from './component/calendar/calendar';
import Input from './component/input/input';
import usecreateAppointment from './hook';
import {INIT_CUSTOMER_NAME} from './state';
import styles from './style';

export default React.memo(({route}) => {
  const {
    state,
    form,
    setIsNumberOfCustomerFocusedEvent,
    setCanShowCalendarEvent,
    onResetCustomerListEvent,
    onSetMsgSuccessEvent,
    onSetMsgErrEvent,
    onSetDateEvent,
    onSetSelectedDate,
    onResetSelectedDateEvent,
    onSetCalendarTimeEvent,
    onSetTimeEvent,
    onResetCalendarTimeEvent,
    onGoBackEvent,
    onNavigateEvent,
    onSetPickerTimeEvent,
    onSetCanShowCalendarEvent,
  } = usecreateAppointment();

  const {
    customerName,
    calendarTime,
    isNumberOfCustomerFocused,
    canShowCalendar,
    selectedDate,
    markedDates,
    isLoading,
    msgSuccess,
    msgErr,
  } = state;

  const {openTime, closeTime} = route.params.data;

  const {handleBlur, setFieldValue, handleSubmit, values} = form;
  const {numberOfCustomer, note} = values;

  const isButtonDisabled = () => {
    return (
      isTwoStringEqual(customerName, INIT_CUSTOMER_NAME) ||
      form.values.numberOfCustomer === '' ||
      !state.date
    );
  };

  const _handleDateTime = () => {
    const {date, time} = state;
    if (date) {
      return date + ' - ' + time;
    }
  };

  // myuseeffect
  useEffect(() => {
    onSetPickerTimeEvent(route.params.data.openTime);
  }, []);

  // mymain
  return (
    <Container>
      <View style={[styles.view0]}>
        <Header
          leftComponent={
            <TouchableOpacity onPress={onGoBackEvent}>
              <Text style={[styles.text0]}>HỦY</Text>
            </TouchableOpacity>
          }
          centerComponent={<Text style={[styles.text1]}>Tạo lịch hẹn</Text>}
          containerStyle={[styles.header0]}
        />
        <MyScrollView0
          contentContainerStyle={[styles.keyboardAwareScrollView0]}>
          <Input
            label='Chọn khách hàng'
            value={customerName}
            onPress={() => {
              onResetCustomerListEvent();
              onNavigateEvent('CustomerList0');
            }}
          />

          <ViewH20 />
          <TouchableOpacity onPress={onSetCanShowCalendarEvent}>
            <MyInput
              value={_handleDateTime()}
              pointerEvents="none"
              editable={false}
              containerStyle={styles.myInput5}
              inputContainerStyle={styles.myInput7}
              inputStyle={styles.myInput8}
              labelStyle={styles.myInput6}
              label='Chọn ngày và thời gian'
              rightIcon={<MTPImage0 source={calendarPicker} />}
            />
          </TouchableOpacity>
          <Text> Lịch hẹn phải đặt sau 1h so với giờ hiện tại và nằm trong khung giờ mở cửa và đóng cửa </Text>
          <MyInput
            keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
            label='Số lượng khách'
            labelStyle={[styles.myInput0]}
            containerStyle={[styles.myInput1]}
            placeholder='Nhập số lượng khách'
            inputStyle={[styles.myInput2]}
            inputContainerStyle={[
              isNumberOfCustomerFocused ? styles.myInput3 : styles.myInput4,
            ]}
            maxLength={MAX_DIGITS_NUMBER_OF_CUSTOMER}
            onBlur={handleBlur('numberOfCustomer')}
            onChangeText={(value) =>
              setFieldValue(
                'numberOfCustomer',
                numberOnly(value.replace(/^0/, '')),
              )
            }
            value={numberOfCustomer}
            onFocus={() => setIsNumberOfCustomerFocusedEvent(true)}
            onEndEditing={() => setIsNumberOfCustomerFocusedEvent(false)}
            errorMessage={
              state.isNumberOfCustomerFocused || !form.errors.numberOfCustomer
                ? null
                : form.errors.numberOfCustomer
            }
          />
          <TextArea
            characterCount={`${note.length}/200`}
            onChangeText={(value) =>
              setFieldValue('note', noSpaceAtEntry(value))
            }
            title='Ghi chú'
            placeholder='Nhập ghi chú cho lịch hẹn'
            value={note}
          />
          <View style={{flex: 1}}></View>
          <PrimaryButton
            disabled={isButtonDisabled()}
            onPress={handleSubmit}
            title={'THÊM'}
            containerStyle={[styles.button0]}
          />
        </MyScrollView0>
      </View>
      <Calendar
        openTime={openTime}
        closeTime={closeTime}
        pickerTime={state.pickerTime}
        onTimeChange={onSetPickerTimeEvent}
        minDate={todayWithFormat('YYYY-MM-DD')}
        isVisible={canShowCalendar}
        selectedDate={selectedDate}
        calendarTime={calendarTime}
        onChangeTime={onSetCalendarTimeEvent}
        markedDates={markedDates}
        onDayPress={(value) => onSetSelectedDate(value.dateString)}
        oncancel={() => {
          onResetSelectedDateEvent();
          onResetCalendarTimeEvent();
          setCanShowCalendarEvent(false);
        }}
        onPressConfirm={() => {
          onSetDateEvent();
          onSetTimeEvent();
          setCanShowCalendarEvent(false);
        }}
      />
      {isLoading && <Loading />}
      {msgSuccess && (
        <SuccessPopUp
          msg={msgSuccess}
          buttonText='LƯU ĐƠN HÀNG'
          onPress={() => {
            onSetMsgSuccessEvent(undefined);
            onGoBackEvent();
          }}
        />
      )}

      {msgErr && (
        <ErrorPopUp
          msg={msgErr}
          buttonText='Quay lại'
          onPress={() => onSetMsgErrEvent(undefined)}
        />
      )}
    </Container>
  );
});
