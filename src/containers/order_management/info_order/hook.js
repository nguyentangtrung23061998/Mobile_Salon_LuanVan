import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {cancelOnrder, finishOrder} from '../../../api';
import {
  cancelOrderLoading,
  cancelOrderSuccess,
  cancelOrderFaild,
  setSuccessMessage,
  setErrorMessage,
  finishOrderLoading,
  finishOrderSuccess,
  finishOrderFaild,
  setCanShowCancelPopUp,
} from './state';

import reactotron from 'reactotron-react-native';
import {
  setProcessingDataOrder1,
  setCancelledDataOrder0,
  setPaidDataOrder0,
} from '../order/state';
import {setDataEditOrder0} from '../edit_order/state';
import {PAID_STATUS} from '../../../constants/api';

const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.infoOrder);
  const orderState = useSelector((rootReducer) => rootReducer.order);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onNavigateEvent = (name) => navigation.navigate(name);

  const onGoBackEvent = () => navigation.goBack();

  const onCancelOrderEvent = async () => {
    onSetCanShowCancelPopUpEvent(false);
    dispatch(cancelOrderLoading());
    try {
      const response = await cancelOnrder(state.data.orderId);
      if (response.status === 'success') {
        if (orderState.isProcessingOrdersCalled) {
          dispatch(setProcessingDataOrder1({orderId: state.data.orderId}));
        }
        if (orderState.isCancelledOrdersCalled) {
          dispatch(setCancelledDataOrder0({value: state.data}));
        }
        const {message} = response;
        dispatch(cancelOrderSuccess({message}));
      } else {
        const {message} = response;
        dispatch(cancelOrderFaild({message}));
      }
    } catch (error) {
      const message = error.errMsg;
      dispatch(cancelOrderFaild({message}));
    }
  };

  const onSetSuccessMessageEvent = (value) =>
    dispatch(setSuccessMessage({value}));

  const onSetErrorMessageEvent = (value) => dispatch(setErrorMessage({value}));

  const onFinishOrderEvent = async () => {
    dispatch(finishOrderLoading());
    try {
      const response = await finishOrder(state.data.orderId);
      if (response.status === 'success') {
        if (orderState.isProcessingOrdersCalled) {
          dispatch(setProcessingDataOrder1({orderId: state.data.orderId}));
        }
        let formattedData = {...state.data};
        formattedData.status = PAID_STATUS;
        if (orderState.isCompletedOrdersCalled) {
          dispatch(setPaidDataOrder0({value: formattedData}));
        }
        const {message} = response;
        dispatch(finishOrderSuccess({message}));
      } else {
        const {message} = response;
        dispatch(finishOrderFaild({message}));
      }
    } catch (error) {
      const message = error.errMsg;
      dispatch(finishOrderFaild({message}));
    }
  };

  const onNavigateToEditOrderEvent = () => {
    onNavigateEvent('EditOrder');
    dispatch(setDataEditOrder0({value: state.data}));
  };

  const onSetCanShowCancelPopUpEvent = (value) =>
    dispatch(setCanShowCancelPopUp({value}));

  return {
    state,
    navigation,
    dispatch,
    onGoBackEvent,
    onCancelOrderEvent,
    onSetSuccessMessageEvent,
    onSetErrorMessageEvent,
    onFinishOrderEvent,
    onNavigateToEditOrderEvent,
    onSetCanShowCancelPopUpEvent,
  };
};

export default useTodo;
