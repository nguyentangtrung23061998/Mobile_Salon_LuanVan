import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {getAppointmentsByDate} from '../../api/index';
import {setData} from '../appointment_detail/state';
import {resetCreateAppointment} from '../create_appointment/state';
import {
  getAllAppointmentsFaild,
  getAllAppointmentsLoading,
  getAllAppointmentsSuccess,
  setCanShowCalendar,
  setMarkedDates,
  setSelectedDate,
  setSelectedDay,
  setSelectedMonth,
  setSelectedYear,
  resetState,
  setIsEnabled,
} from './with_appointment_list';
import {getStoreInfo} from '../../utility/local_storage';

const useTodo = () => {
  const navigation = useNavigation();
  const state = useSelector((rootReducer) => rootReducer.appointment);
  const dispatch = useDispatch();

  const onGoBackEvent = () => {
    navigation.goBack();
  };

  const getAppointmentByDateEvent = async (date) => {
    dispatch(getAllAppointmentsLoading());
    try {
      const response = await getAppointmentsByDate(date);
      if (response.status === 'success') {
        dispatch(getAllAppointmentsSuccess(response.data));
        dispatch(setIsEnabled({value: true}));
      } else {
        dispatch(getAllAppointmentsFaild());
        dispatch(setIsEnabled({value: true}));
      }
    } catch (err) {
      dispatch(getAllAppointmentsFaild());
      dispatch(setIsEnabled({value: true}));
    }
  };

  const onPressDay = (date) => {
    const selectedDate = moment(date?.dateString).format('DD/MM/YYYY');
    const selectedDay = selectedDate.substr(0, 2);
    const selectedMonth = selectedDate.substr(3, 2);
    const selectedYear = selectedDate.substr(6, 4);

    setSelectedDate(selectedDate);
    dispatch(setCanShowCalendar(!state.canShowCalendar));
    getAppointmentByDateEvent(selectedDate);

    dispatch(setMarkedDates(date?.dateString));
    dispatch(setSelectedDay(selectedDay));
    dispatch(setSelectedMonth(selectedMonth));
    dispatch(setSelectedYear(selectedYear));
  };

  const onPressItemEvent = (dt) => {
    const {item} = dt;
    dispatch(setData(item));
    navigation.navigate('AppointmentDetail');
  };

  const onResetStateEvent = () => {
    dispatch(resetState());
  };

  const onGoToCreateAppointmentEvent = async () => {
    dispatch(resetCreateAppointment());
    try {
      const data = await getStoreInfo();
      navigation.navigate('CreateAppointment', {data});
    } catch (error) {}
  };

  return {
    state,
    getAppointmentByDateEvent,
    dispatch,
    onPressDay,
    onPressItemEvent,
    onResetStateEvent,
    onGoBackEvent,
    onGoToCreateAppointmentEvent,
  };
};

export default useTodo;
