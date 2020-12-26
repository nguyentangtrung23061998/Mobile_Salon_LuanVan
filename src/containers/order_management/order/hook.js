import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {
  getDDFormat,
  getMMFormat,
  getStringFromIndexRange,
} from '../../../utility/string';
import {
  setCalendarMarkedDate,
  setDate,
  setDay,
  setIsCalendarVisible,
  setMonth,
  setYear,
  setStatus,
  getProcessingOrdersLoading,
  getProcessingOrdersSuccess,
  getProcessingOrdersFaild,
  resetState,
  getCompletedOrdersLoading,
  getCompletedOrdersSuccess,
  getCompletedOrdersFaild,
  getCancelOrdersLoading,
  getCancelOrdersSuccess,
  getCancelOrdersFaild,
  setIsProcessingOrdersCalled,
  setIsCompletedOrdersCalled,
  setIsCancelledOrdersCalled,
  setProcessingData,
  setCompletedData,
  setCancelledData,
  setErrorMessage,
} from './state';
import reactotron from 'reactotron-react-native';
import {getOrdersByDate} from '../../../api';
import {
  PROCESSING_ORDERS_PARAM,
  COMPLETED_ORDERS_PARAM,
  CANCALLED_ORDERS_PARAM,
} from '../../../constants/api';
import {setDataInfoOrder0} from '../info_order/state';

const useOder = () => {
  const navigation = useNavigation();
  const state = useSelector((rootReducer) => rootReducer.order);

  const dispatch = useDispatch();

  const onGoBackEvent = () => navigation.goBack();

  const onNavigateEvent = (name) => navigation.navigate(name);

  const onSetIsCalendarVisibleEvent = (value) =>
    dispatch(setIsCalendarVisible({value}));

  const onSetDayEvent = (value) => dispatch(setDay({value}));

  const onSetMonthEvent = (value) => dispatch(setMonth({value}));

  const onSetYearVent = (value) => dispatch(setYear({value}));

  const onSetDateEvent = (value) => dispatch(setDate({value}));

  const onSetCalendarMarkedDateEvent = (value) =>
    dispatch(setCalendarMarkedDate({value}));

  const onConfirmCalendarDate = (date) => {
    onSetIsCalendarVisibleEvent(false);
    

    const day = getDDFormat(date.day);
    const month = getMMFormat(date.month);
    const newCalendarMarkedDate = {
      [date.dateString]: {selected: true, disableTouchEvent: true},
    };
    const newDate = moment(date.dateString, 'YYYY-MM-DD').format('DD/MM/YYYY');

    onSetDayEvent(day);
    onSetMonthEvent(month);
    onSetYearVent(date.year);
    onSetCalendarMarkedDateEvent(newCalendarMarkedDate);
    onSetDateEvent(newDate);

    dispatch(setProcessingData({value: []}));
    dispatch(setCompletedData({value: []}));
    dispatch(setCancelledData({value: []}));

    if (state.status === PROCESSING_ORDERS_PARAM) {
      onGetProcessingOrdersEvent(newDate);
      dispatch(setIsProcessingOrdersCalled({value: true}));
      dispatch(setIsCompletedOrdersCalled({value: false}));
      dispatch(setIsCancelledOrdersCalled({value: false}));
    }
    if (state.status === COMPLETED_ORDERS_PARAM) {
      onGetCompletedOrdersEvent(newDate);
      dispatch(setIsProcessingOrdersCalled({value: false}));
      dispatch(setIsCompletedOrdersCalled({value: true}));
      dispatch(setIsCancelledOrdersCalled({value: false}));
    }
    if (state.status === CANCALLED_ORDERS_PARAM) {
      onGetCancelledOrdersEvent(newDate);
      dispatch(setIsProcessingOrdersCalled({value: false}));
      dispatch(setIsCompletedOrdersCalled({value: false}));
      dispatch(setIsCancelledOrdersCalled({value: true}));
    }
  };

  const onVisibleMonthsChangeEvent = (value) => {
    let date = '';
    if (value[1]) {
      date = value[1];
    } else {
      date = value[0];
    }
    const month = getMMFormat(date.month);

    onSetMonthEvent(month);
    onSetYearVent(date.year);
  };

  const onResetDayMonthYearEvent = () => {
    const month = getStringFromIndexRange(state.date, 3, 5);
    const year = getStringFromIndexRange(state.date, 6, 10);

    onSetMonthEvent(month);
    onSetYearVent(year);
  };

  const onGetProcessingOrdersEvent = async (date) => {
    dispatch(getProcessingOrdersLoading());
    try {
      const response = await getOrdersByDate(PROCESSING_ORDERS_PARAM, date);
      if (response.status === 'success') {
        const {data} = response;
        dispatch(getProcessingOrdersSuccess({data}));
      } else {
        const {message} = response;
        dispatch(getProcessingOrdersFaild({message}));
      }
    } catch (error) {
      const message = error.errMsg;
      dispatch(getProcessingOrdersFaild({message}));
    }
  };

  const onGetCompletedOrdersEvent = async (date) => {
    dispatch(getCompletedOrdersLoading());
    try {
      const response = await getOrdersByDate(COMPLETED_ORDERS_PARAM, date);
      if (response.status === 'success') {
        const {data} = response;
        dispatch(getCompletedOrdersSuccess({data}));
      } else {
        const {message} = response;
        dispatch(getCompletedOrdersFaild({message}));
      }
    } catch (error) {
      const message = error.errMsg;
      dispatch(getCompletedOrdersFaild({message}));
    }
  };
  const onGetCancelledOrdersEvent = async (date) => {
    dispatch(getCancelOrdersLoading());
    try {
      const response = await getOrdersByDate(CANCALLED_ORDERS_PARAM, date);
      if (response.status === 'success') {
        const {data} = response;
        dispatch(getCancelOrdersSuccess({data}));
      } else {
        const {message} = response;
        dispatch(getCancelOrdersFaild({message}));
      }
    } catch (error) {
      const message = error.errMsg;
      dispatch(getCancelOrdersFaild({message}));
    }
  };

  const onSetStatusEvent = (value) => {
    if (value === 0) {
      dispatch(setStatus({value: PROCESSING_ORDERS_PARAM}));

      if (!state.isProcessingOrdersCalled) {
        onGetProcessingOrdersEvent(state.date);
      }
    }
    if (value === 1) {
      dispatch(setStatus({value: COMPLETED_ORDERS_PARAM}));

      if (!state.isCompletedOrdersCalled) {
        onGetCompletedOrdersEvent(state.date);
      }
    }
    if (value === 2) {
      dispatch(setStatus({value: CANCALLED_ORDERS_PARAM}));

      if (!state.isCancelledOrdersCalled) {
        onGetCancelledOrdersEvent(state.date);
      }
    }
  };
  const onResetStateEvent = () => dispatch(resetState());

  const onPressProcessingItem = (data) => {
    const {
      orderNumber,
      total,
      timeCreated,
      dateCreated,
      status,
      avatar,
      customerName,
      mobile,
      services,
      orderId,
      customerId,
      note,
      creator,
    } = data;

    const dataSent = {
      orderNumber, // number
      total, // number
      timeCreated,
      dateCreated,
      status,
      avatar,
      customerName,
      mobile,
      services,
      orderId,
      customerId,
      note,
      creator,
    };
    dispatch(setDataInfoOrder0({value: dataSent}));
    onNavigateEvent('InfoOrder');
  };

  const onPressPaidItemEvent = (data) => {
    const {
      orderNumber,
      total,
      timeCreated,
      dateCreated,
      status,
      avatar,
      customerName,
      mobile,
      services,
      orderId,
      note,
      creator,
    } = data;

    const dataSent = {
      creator,
      orderNumber, // number
      total, // number
      timeCreated,
      dateCreated,
      status,
      avatar,
      customerName,
      mobile,
      services,
      orderId,
      note,
    };
    dispatch(setDataInfoOrder0({value: dataSent}));
    onNavigateEvent('InfoOrder');
  };

  const onPressCancelledItem = (data) => {
    const {
      orderNumber,
      total,
      timeCreated,
      dateCreated,
      status,
      avatar,
      customerName,
      mobile,
      services,
      orderId,
      note,
      creator,
    } = data;

    const dataSent = {
      creator,
      orderNumber, // number
      total, // number
      timeCreated,
      dateCreated,
      status,
      avatar,
      customerName,
      mobile,
      services,
      orderId,
      note,
    };
    dispatch(setDataInfoOrder0({value: dataSent}));
    onNavigateEvent('InfoOrder');
  };

  const onSetErrorMessageEvent = (value) => dispatch(setErrorMessage({value}));

  return {
    state,
    onGoBackEvent,
    onNavigateEvent,
    onSetIsCalendarVisibleEvent,
    onConfirmCalendarDate,
    onVisibleMonthsChangeEvent,
    onResetDayMonthYearEvent,
    onSetStatusEvent,
    onGetProcessingOrdersEvent,
    onResetStateEvent,
    onPressProcessingItem,
    onPressCancelledItem,
    onPressPaidItemEvent,
    onSetErrorMessageEvent,
  };
};

export default useOder;
