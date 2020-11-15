import plus from '../../assets/icon/plus/plus.png';
import emptyAppointment from '../../assets/icon/empty_appointment/empty_appointment.png';
import {Container} from 'native-base';
import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../loading/loading';
import {PrimaryButton} from '../primary_button/primary_button';
import {isArrayEmpty} from '../../utility/array';
import HeaderNav from './component/header/header';
import StyleFlatList from './component/list/list';
import styles from './style';
import useAppointmentListAccount from './use_appointment_list';
import {
  setCanShowCalendar,
  setSelectedMonth,
  setSelectedYear,
} from './with_appointment_list';

export default function AppointmentListAccount() {
  const {
    state,
    getAppointmentByDateEvent,
    dispatch,
    onPressDay,
    onPressItemEvent,
    onResetStateEvent,
    onGoBackEvent,
    onGoToCreateAppointmentEvent,
  } = useAppointmentListAccount();
  useEffect(() => {
    getAppointmentByDateEvent(state.selectedDate);
  }, []);

  const {
    appointmentList,
    selectedYear,
    canShowCalendar,
    markedDates,
    selectedDay,
    selectedMonth,
    isLoading,
  } = state;

  const _renderEmpty = () => {
    return (
      <View style={[styles.view0]}>
        <Image source={emptyAppointment} />
        <Text style={[styles.text0]}>Chưa có lịch hẹn nào cả</Text>
      </View>
    );
  };

  const _renderList = () => {
    return (
      <StyleFlatList data={appointmentList} onPressItem={onPressItemEvent} />
    );
  };

  // main
  return (
    <Container>
      {state.isEnabled && (
        <View style={[styles.view6]}>
          <HeaderNav
            isOpened={canShowCalendar}
            centerTitle={`${selectedDay} Thg ${selectedMonth}, ${selectedYear}`}
            onPressLeft={() => {
              onGoBackEvent();
              onResetStateEvent();
            }}
            onPressCenter={() => {
              dispatch(setCanShowCalendar(!canShowCalendar));
            }}
          />
          <View style={[styles.view1]}>
            {state.canShowCalendar && (
              <CalendarList
                current={Object.keys(markedDates)['0']}
                enableSwipeMonths={true}
                onVisibleMonthsChange={(month) => {
                  let selectedMonth = month[0]?.month;
                  if (selectedMonth < 10) {
                    selectedMonth = `0${selectedMonth}`;
                  }
                  dispatch(setSelectedMonth(selectedMonth));
                  dispatch(setSelectedYear(month[0]?.year));
                }}
                onDayPress={(day) => {
                  onPressDay(day);
                }}
                markedDates={markedDates}
                horizontal={true}
                theme={{
                  todayTextColor: '#000',
                  selectedDayBackgroundColor: '#1790e9',
                }}
                renderHeader={() => {
                  return <></>;
                }}
              />
            )}

            {isArrayEmpty(appointmentList) ? _renderEmpty() : _renderList()}
            <PrimaryButton
              containerStyle={[styles.button1]}
              title='TẠO MỚI LỊCH HẸN'
              onPress={onGoToCreateAppointmentEvent}
            />
          </View>
        </View>
      )}
      {isLoading && <Loading />}
    </Container>
  );
}
