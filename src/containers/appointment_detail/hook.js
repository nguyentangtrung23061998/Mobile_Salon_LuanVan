import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {cancelAppointment, confirmAppointmentSuccess} from '../../api/index';
import {setAppointmentState} from '../appointmentList/with_appointment_list';
import {setData as setDataUpdate} from '../update_appointment/state';
import {
  cancelAppointmentFaild,
  cancelAppointmentLoading,
  cancelAppointmentSuccess,
  confirmAppointmentSuccessFaild,
  confirmAppointmentSuccessLoading,
  confirmAppointmentSuccessSuccess,
  setMsgErr,
  setMsgSuccess,
} from './state';
import {getStoreInfo} from '../../utility/local_storage';

const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.appointmentDetail);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onGoBackEvent = () => {
    navigation.goBack();
  };

  const [onShowPopUpCancel, setOnShowPopUpCancel] = useState(false);
  const [onShowPopUpArrived, setOnShowPopUpArrived] = useState(false);

  const confirmAppointmentSuccessEvent = async () => {
    dispatch(confirmAppointmentSuccessLoading());
    try {
      const response = await confirmAppointmentSuccess(state.data.id);
      if (response.status === 'success') {
        dispatch(
          setAppointmentState({appointmentState: 'Đã đến', id: state.data.id}),
        );
        dispatch(confirmAppointmentSuccessSuccess(response.message));
      } else {
        dispatch(confirmAppointmentSuccessFaild(response.message));
      }
    } catch (err) {
      dispatch(confirmAppointmentSuccessFaild(err.errMsg));
    }
  };

  const onSetDataUpdateEvent = () => {
    dispatch(setDataUpdate(state.data));
  };

  const onSetMsgSuccessEvent = (value) => {
    dispatch(setMsgSuccess(value));
    onGoBackEvent();
  };

  const onSetMsgErrEvent = (value) => {
    dispatch(setMsgErr(value));
  };

  const onCancelAppointmentEvent = async () => {
    const id = state.data.id;
    dispatch(cancelAppointmentLoading());
    try {
      const response = await cancelAppointment(id);
      if (response.status === 'success') {
        dispatch(setAppointmentState({appointmentState: 'Đã hủy', id: id}));
        dispatch(cancelAppointmentSuccess({message: response.message}));
      } else {
        dispatch(cancelAppointmentFaild({message: response.message}));
      }
    } catch (err) {
      dispatch(cancelAppointmentFaild({message: err.errMsg}));
    }
  };

  const onGoToUpdateAppointmentEvent = async () => {
    dispatch(setDataUpdate(state.data));
    try {
      const data = await getStoreInfo();
      navigation.navigate('UpdateAppointment', {data});
    } catch (error) {}
  };

  return {
    state,
    onGoBackEvent,
    confirmAppointmentSuccessEvent,
    onSetDataUpdateEvent,
    onSetMsgSuccessEvent,
    onSetMsgErrEvent,
    onCancelAppointmentEvent,
    onShowPopUpCancel,
    setOnShowPopUpCancel,
    setOnShowPopUpArrived,
    onShowPopUpArrived,
    onGoToUpdateAppointmentEvent,
  };
};

export default useTodo;
