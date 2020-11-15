import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {createAppointment} from '../../api';
import {setAppointmentList} from '../appointmentList/with_appointment_list';
import {resetCustomerList} from '../customer_list/state';
import {
  createAppointmentAction,
  createAppointmentFaild,
  createAppointmentLoading,
  createAppointmentSuccess,
  resetCalendarTime,
  resetSelectedDate,
  setCalendarTime,
  setCanShowCalendar,
  setCustomerName,
  setDate,
  setIsNumberOfCustomerFocused,
  setMsgErr,
  setMsgSuccess,
  setPickerTime,
  setSelectedDate,
  setTime,
} from './state';
const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.createAppointment);
  const appointmentState = useSelector(
    (rootReducer) => rootReducer.appointment,
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onNavigateEvent = (name) => navigation.navigate(name);
  const onGoBackEvent = () => navigation.goBack();
  const initialValues = {
    numberOfCustomer: '',
    note: '',
  };
  const validation = yup.object().shape({
    numberOfCustomer: yup.string().required('Nhập số lượng khách'),
  });
  const createAppointmentEvent = () => {
    dispatch(createAppointmentAction());
  };

  const _onSubmitSuccess = async (values) => {
    dispatch(createAppointmentLoading());
    try {
      const response = await createAppointment(
        state.customerId,
        state.date,
        state.time,
        values.numberOfCustomer,
        values.note,
      );

      if (response.status === 'success') {
        const {message, data} = response;
        const dateFromList = moment(
          Object.keys(appointmentState.markedDates)[0],
          'YYYY-MM-DD',
        ).format('YYYY-MM-DD');
        const dateFromCreating = moment(state.date, 'DD/MM/YYYY').format(
          'YYYY-MM-DD',
        );
        if (dateFromList === dateFromCreating) {
          dispatch(setAppointmentList(response.data));
        }
        dispatch(createAppointmentSuccess({message, data}));
      } else {
        const {message} = response;

        dispatch(createAppointmentFaild(message));
      }
    } catch (err) {
      dispatch(createAppointmentFaild(err.errMsg));
    }
  };

  const form = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: _onSubmitSuccess,
  });

  const setCustomerNameEvent = (customerName) => {
    dispatch(setCustomerName(customerName));
  };
  const setIsNumberOfCustomerFocusedEvent = (isFocused) => {
    dispatch(setIsNumberOfCustomerFocused(isFocused));
  };

  const setCanShowCalendarEvent = (canShow) => {
    dispatch(setCanShowCalendar(canShow));
  };

  const onSetCanShowCalendarEvent = () => dispatch(setCanShowCalendar(true));

  const onResetCustomerListEvent = () => {
    dispatch(resetCustomerList());
  };

  const onSetMsgSuccessEvent = (value) => {
    dispatch(setMsgSuccess(value));
  };

  const onSetMsgErrEvent = (value) => {
    dispatch(setMsgErr(value));
  };

  const onSetDateEvent = () => {
    dispatch(setDate(state.markedDates));
  };

  const onSetSelectedDate = (value) => {
    dispatch(setSelectedDate(value));
  };

  const onResetSelectedDateEvent = () => {
    dispatch(resetSelectedDate());
  };
  const onSetCalendarTimeEvent = (value) => {
    dispatch(setCalendarTime(value));
  };
  const onSetTimeEvent = () => {
    dispatch(setTime());
  };
  const onResetCalendarTimeEvent = () => {
    dispatch(resetCalendarTime());
  };

  const onSetPickerTimeEvent = (value) => dispatch(setPickerTime({value}));

  return {
    state,
    form,
    createAppointmentEvent,
    dispatch,
    setCustomerNameEvent,
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
  };
};

export default useTodo;
