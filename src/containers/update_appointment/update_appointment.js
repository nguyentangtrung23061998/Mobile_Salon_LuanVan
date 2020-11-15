import {Container} from 'native-base';
import React, {useEffect} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {Header, Input as MyInput} from 'react-native-elements';
import ErrorPopUp from '../error_pop_up/error_pop_up';
import {TextArea} from '../input/input';
import Loading from '../loading/loading';
import {MyScrollView0} from '../my_scroll_view/my_scroll_view';
import {PrimaryButton} from '../primary_button/primary_button';
import SuccessPopUp from '../success_pop_up/success_pop_up';
import {MAX_DIGITS_NUMBER_OF_CUSTOMER} from '../../constants/app';
import {todayWithFormat} from '../../utility/date';
import {convertNumberToString} from '../../utility/number';
import {numberOnly} from '../../utility/string';
import Calendar from './component/calendar/calendar';
import Input from './component/input/input';
import usecreateAppointment from './hook';
import styles from './style';

function UpdateAppointment({route}) {
  const {
    state,
    onGoBackEvent,
    onNavigateEvent,
    onSetCanShowCalendarEvent,
    onSetMarkedDatesEvent,
    onSetIsCustomerFocusedEvent,
    onSetNumberCustomerEvent,
    onUpdateAppointmentEvent,
    onSetNoteEvent,
    onSetSuccessMessageEvent,
    onSetErrorMessageEvent,
    onSetPickerTimeEvent,
    onSetCalendarTimeEvent,
    onResetSelectedDateEvent,
    onResetCalendarTimeEvent,
    setCanShowCalendarEvent,
    onSetDateEvent,
    onSetTimeEvent,
    onSetTimeLimitEvent,
  } = usecreateAppointment();

  const {openTime, closeTime} = route.params.data;

  useEffect(() => {
    onSetTimeLimitEvent();
  }, []);
  return (
    <Container>
      <View style={[styles.view0]}>
        <Header
          leftComponent={
            <TouchableOpacity onPress={onGoBackEvent}>
              <Text style={[styles.text0]}>HỦY</Text>
            </TouchableOpacity>
          }
          centerComponent={
            <Text style={[styles.text1]}>Cập nhật lịch hẹn</Text>
          }
          containerStyle={[styles.header0]}
        />
        <MyScrollView0
          contentContainerStyle={[styles.keyboardAwareScrollView0]}>
          <Input
            label={'Chọn khách hàng'}
            value={state.data.customerName}
            onPress={() => onNavigateEvent('CustomerList')}
          />
          <Input
            label={'Chọn ngày và thời gian'}
            value={state.date + ' - ' + state.time}
            hasRightImage
            containerStyle={[styles.input2]}
            onPress={() => onSetCanShowCalendarEvent(true)}
          />
          <Text style={{marginTop: 15}}>Lịch hẹn phải đặt sau 1h so với giờ hiện tại và nằm trong khung giờ mở cửa và đóng cửa</Text>
          <MyInput
            keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
            label="Số lượng khách"
            labelStyle={[styles.myInput0]}
            containerStyle={[styles.myInput1]}
            placeholder={'Nhập số lượng khách'}
            inputStyle={[styles.myInput2]}
            inputContainerStyle={[
              state?.isNumberOfCustomerFocused
                ? styles.myInput3
                : styles.myInput4,
            ]}
            maxLength={MAX_DIGITS_NUMBER_OF_CUSTOMER}
            value={convertNumberToString(state.data.numberCustomer)}
            onFocus={() => onSetIsCustomerFocusedEvent(true)}
            onEndEditing={() => onSetIsCustomerFocusedEvent(false)}
            onChangeText={(value) =>
              onSetNumberCustomerEvent(numberOnly(value.replace(/^0/, '')))
            }
          />
          <TextArea
            title={'Ghi chú'}
            placeholder={'Nhập ghi chú cho lịch hẹn'}
            value={state.note}
            onChangeText={(value) => onSetNoteEvent(value)}
            characterCount={state.note.length + '/200'}
          />
          <View style={{flex: 1}}></View>
          <PrimaryButton
            disabled={!state.data.numberCustomer}
            title={'CẬP NHẬT'}
            containerStyle={[styles.button0]}
            onPress={onUpdateAppointmentEvent}
          />
        </MyScrollView0>
      </View>
      <Calendar
        openTime={openTime}
        closeTime={closeTime}
        pickerTime={state.pickerTime}
        onTimeChange={onSetPickerTimeEvent}
        minDate={todayWithFormat('YYYY-MM-DD')}
        isVisible={state.canShowCalendar}
        selectedDate={state.selectedDate}
        timeOfCalendarPicker={state.timeOfCalendarPicker}
        onChangeTime={onSetCalendarTimeEvent}
        markedDates={state.markedDates}
        onDayPress={(day) => {
          onSetMarkedDatesEvent(day?.dateString);
        }}
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
      {state.isLoading && <Loading />}
      {state.successMessage !== '' && (
        <SuccessPopUp
          msg={state.successMessage}
          buttonText="Xác nhận"
          onPress={() => {
            onSetSuccessMessageEvent('');
            onGoBackEvent();
          }}
        />
      )}
      {state.errorMessage !== '' && (
        <ErrorPopUp
          msg={state.errorMessage}
          buttonText="Quay lại"
          onPress={() => onSetErrorMessageEvent('')}
        />
      )}
    </Container>
  );
}

export default React.memo(UpdateAppointment);
