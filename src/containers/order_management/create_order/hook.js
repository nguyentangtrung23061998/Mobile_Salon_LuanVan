import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setCustomerName, setCustomerService} from './state';
import {resetCustomerList} from '../../customer_list_order/state';
import {
  createOrderLoading,
  createOrderSuccess,
  createOrderFaild,
  setCustomerId,
  setMsgErr,
  onCloseSuccessPopUp,
  setCustomerServiceId,
  setCustomerMobile,
  resetState,
} from './state';
import {createOrder} from '../../../api/index';
import {useTranslation} from 'react-i18next';
import {setProcessingDataOrder0} from '../order/state';
import useOrder from '../order/hook';
import reactotron from 'reactotron-react-native';
const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.createOrder);
  const orderState = useSelector((rootReducer) => rootReducer.order);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {onGetProcessingOrdersEvent} = useOrder();
  const service = useState([]);
  const {name, styles} = service;
  const onGoBackEvent = () => navigation.goBack();

  const onNavigateEvent = (name) => navigation.navigate(name);

  const onSubmitSuccess = async (values) => {
    dispatch(createOrderLoading());

    const _handleTotal = () => {
      let total = 0;
      state.serviceData.map((el0) => {
        el0.styles.map((el1) => {
          total = el1.price + total;
        });
      });
      return total;
    };
    try {
      const userId = state.customerId;
      const response = await createOrder(
        userId,
        state.serviceData,
        values.note,
        // _handleTotal(),
      );
      if (response.status === 'success') {
        dispatch(createOrderSuccess());
        const {data} = response;
        const date = response.data.dateCreated;
        if (orderState.date === date && orderState.isProcessingOrdersCalled) {
          dispatch(setProcessingDataOrder0({value: data}));
        }
      } else {
        const {message} = response;
        dispatch(createOrderFaild({errMsg: message}));
      }
    } catch (err) {
      dispatch(createOrderFaild(err.errMsg));
    }
  };

  const setCustomerNameEvent = (customerName) => {
    dispatch(setCustomerName(customerName));
  };
  const setCustomerServiceEvent = (customerService) => {
    dispatch(setCustomerService(customerService));
  };
  const onResetCustomerListEvent = () => {
    dispatch(resetCustomerList());
  };
  const setCustomerIdEvent = (value) => dispatch(setCustomerId(value));
  const setCustomerServiceIdEvent = (value) =>
    dispatch(setCustomerServiceId(value));
  const setCustomerMobileEvent = (customerMobile) => {
    dispatch(setCustomerMobile(customerMobile));
  };
  const onSetMsgErrEvent = (value) => {
    dispatch(setMsgErr(value));
  };
  const onCloseSuccessPopUpEvent = () => {
    dispatch(onCloseSuccessPopUp());
  };

  const onHandleNameMobileValueEvent = () => {
    const {customerName, customerMobile} = state;
    if (
      !customerName ||
      customerName === '' ||
      !customerMobile ||
      customerMobile === ''
    ) {
      const response = customerName
        ? customerName
        : '' + ' ' + customerMobile
        ? customerMobile
        : '';
      return response;
    }
    const response = customerName + ' - ' + customerMobile;
    return response;
  };

  const onResetState = () => dispatch(resetState());

  return {
    state,
    onSubmitSuccess,
    dispatch,
    setCustomerNameEvent,
    setCustomerIdEvent,
    setCustomerServiceEvent,
    onResetCustomerListEvent,
    onCloseSuccessPopUpEvent,
    onSetMsgErrEvent,
    onGoBackEvent,
    setCustomerServiceIdEvent,
    setCustomerMobileEvent,
    onNavigateEvent,
    onHandleNameMobileValueEvent,
    onResetState,
  };
};

export default useTodo;
