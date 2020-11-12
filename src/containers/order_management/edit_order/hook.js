import {useDispatch, useSelector} from 'react-redux';
import {
  createOderAction,
  updateOrderLoading,
  updateOrderSuccess,
  updateOrderFaild,
  setErrorMessage,
  setSuccessMessage,
  setData,
} from './state';
import {useNavigation} from '@react-navigation/native';
import {setDataSelectStyle00} from '../../select_style0/state';
import reactotron from 'reactotron-react-native';
import {updateOrder} from '../../../api';
import {setDataInfoOrder1} from '../info_order/state';
import {setProcessingDataOrder2} from '../order/state';
const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.editOrder);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onNavigateEvent = (name) => navigation.navigate(name);

  const onGoBackEvent = () => navigation.goBack();

  const createOderEvent = () => {
    dispatch(createOderAction());
  };

  const onHandleNameMobileValueEvent = () => {
    const {customerName, mobile} = state.data;
    if (!customerName || customerName === '' || !mobile || mobile === '') {
      const response = customerName
        ? customerName
        : '' + ' ' + mobile
        ? mobile
        : '';
      return response;
    }
    const response = customerName + ' - ' + mobile;
    return response;
  };

  const onPressSelectStylesEvent = () => {
    const formattedServices = state.data.services.map((el0) => ({
      ...el0,
      id: el0._id + 'selected',
      styles: el0.styles.map((el1) => ({...el1, id: el1._id})),
    }));
    dispatch(setDataSelectStyle00({value: formattedServices}));
    onNavigateEvent('SelectStyle0');
  };

  const onUpdateOrderEvent = async () => {
    const {
      data: {orderId, services, customerId, note},
    } = state;
    dispatch(updateOrderLoading());
    try {
      const response = await updateOrder(orderId, customerId, services, note);
      if (response.status === 'success') {
        const {message} = response;
        dispatch(updateOrderSuccess({message}));
      } else {
        const {message} = response;
        dispatch(updateOrderFaild({message}));
      }
    } catch (error) {
      const message = error.errMsg;
      dispatch(updateOrderFaild({message}));
    }
  };

  const onSetErrorMessageEvent = (value) => dispatch(setErrorMessage({value}));

  const onSetSuccessMessageEvent = (value) =>
    dispatch(setSuccessMessage({value}));

  const onSetData = (value) => dispatch(setData({value}));

  const onPressSucessButtonEvent = () => {
    onSetSuccessMessageEvent('');
    dispatch(setDataInfoOrder1({value: state.data}));
    dispatch(setProcessingDataOrder2({value: state.data}));
    onGoBackEvent();
  };
  return {
    state,
    createOderEvent,
    onSetErrorMessageEvent,
    onSetSuccessMessageEvent,
    navigation,
    dispatch,
    onHandleNameMobileValueEvent,
    onNavigateEvent,
    onPressSelectStylesEvent,
    onUpdateOrderEvent,
    onSetData,
    onGoBackEvent,
    onPressSucessButtonEvent,
  };
};

export default useTodo;
