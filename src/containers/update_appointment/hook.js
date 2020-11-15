import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import reactotron from 'reactotron-react-native';
import {updateAppointment} from '../../api';
import {getStoreInfo} from '../../utility/local_storage';
import {setAppointmentListFromUpdateAppointment} from '../appointmentList/with_appointment_list';
import {setDataFromUpdateAppointment} from '../appointment_detail/state';
import {
  resetCalendarTime,
  resetSelectedDate,
  setCalendarTime,
  setCanShowCalendar,
  setCloseTime,
  setDate,
  setErrorMessage,
  setIsCustomerFocused,
  setMarkedDates,
  setNote,
  setNumberCustomer,
  setOpenTime,
  setPickerTime,
  setSuccessMessage,
  setTime,
  updateAppointmentFaild,
  updateAppointmentLoading,
  updateAppointmentSuccess,
} from './state';
import {useTranslation} from 'react-i18next';

const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.updateAppointment);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onGoBackEvent = () => {
    navigation.goBack();
  };
  const onNavigateEvent = (name) => {
    navigation.navigate(name);
  };

  const onSetCanShowCalendarEvent = (value) => {
    dispatch(setCanShowCalendar(value));
  };

  const onSetMarkedDatesEvent = (day) => {
    dispatch(setMarkedDates(day));
  };

  const onSetIsCustomerFocusedEvent = (value) =>
    dispatch(setIsCustomerFocused({value}));

  const onSetNumberCustomerEvent = (value) => {
    dispatch(setNumberCustomer({value}));
  };

  const onUpdateAppointmentEvent = async () => {
    const {data, date, time, note} = state;
    const appointmentId = data.id;
    const idCustomer = data.idCustomer;
    const numberCustomer = data.numberCustomer;

    const requestData = {
      appointmentId,
      idCustomer,
      date,
      time,
      note,
      numberCustomer,
    };

    dispatch(updateAppointmentLoading());
    try {
      const response = await updateAppointment(requestData);
      if (response.status === 'success') {
        const {message, data} = response;
        dispatch(updateAppointmentSuccess({message}));
        dispatch(setDataFromUpdateAppointment({value: data}));
        dispatch(setAppointmentListFromUpdateAppointment({value: data}));
      } else {
        const {message} = response;

        dispatch(updateAppointmentFaild({message}));
      }
    } catch (error) {
      const message = error.errMsg;
      dispatch(updateAppointmentFaild({message}));
    }
  };

  const onSetNoteEvent = (value) => dispatch(setNote({value}));

  const onSetSuccessMessageEvent = (value) =>
    dispatch(setSuccessMessage({value}));

  const onSetErrorMessageEvent = (value) => dispatch(setErrorMessage({value}));

  const onSetPickerTimeEvent = (value) => dispatch(setPickerTime({value}));
  const onSetCalendarTimeEvent = (value) => {
    dispatch(setCalendarTime(value));
  };
  const onResetSelectedDateEvent = () => {
    dispatch(resetSelectedDate());
  };
  const onResetCalendarTimeEvent = () => {
    dispatch(resetCalendarTime());
  };
  const setCanShowCalendarEvent = (canShow) => {
    dispatch(setCanShowCalendar(canShow));
  };
  const onSetDateEvent = () => {
    dispatch(setDate(state.markedDates));
  };
  const onSetTimeEvent = () => {
    dispatch(setTime());
  };

  const onSetTimeLimitEvent = async () => {
    try {
      const store = await getStoreInfo();
      dispatch(setOpenTime({value: store.openTime}));
      dispatch(setCloseTime({value: store.closeTime}));
    } catch (error) {}
  };

  return {
    state,
    onNavigateEvent,
    onGoBackEvent,
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
  };
};

export default useTodo;
