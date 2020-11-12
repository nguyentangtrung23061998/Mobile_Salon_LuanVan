import {useDispatch, useSelector} from 'react-redux';
import {
  getAllCustomersLoading,
  getAllCustomersSuccess,
  getAllCustomersFaild,
  resetState,
} from './state';
import {useNavigation} from '@react-navigation/native';
import reactotron from 'reactotron-react-native';
import {getAllCustomers} from '../../api/index';
import {
  setCustomerIdFromCustomerList,
  setCustomerNameFromCustomerList,
  setCustomerMobileFromCustomerList,
} from '../order_management/create_order/state';
export default () => {
  const state = useSelector((rootReducer) => rootReducer.customerListFromOrder);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onGoBackEvent = () => navigation.goBack();

  const onNavigateEvent = (name) => navigation.navigate(name);

  const onGetAllCustomersEvent = async () => {
    dispatch(getAllCustomersLoading());
    try {
      const response = await getAllCustomers();
      if (response.status === 'success') {
        const {data} = response;
        dispatch(getAllCustomersSuccess({data}));
      } else {
        const {message} = response;
        dispatch(getAllCustomersFaild({message}));
      }
    } catch (error) {
      const message = error.errMsg;
      dispatch(getAllCustomersFaild({message}));
    }
  };

  const onGetAllCustomersCustomerListEvent0 = async () => {
    dispatch(getAllCustomersLoading());
    try {
      const response = await getAllCustomers();
      if (response.status === 'success') {
        const {data} = response;
        dispatch(getAllCustomersSuccess({data}));
      } else {
        const {message} = response;
        dispatch(getAllCustomersFaild({message}));
      }
    } catch (error) {
      const message = error.errMsg;
      dispatch(getAllCustomersFaild({message}));
    }
  };

  const onResetStateEvent = () => dispatch(resetState());

  const onPressItemEvent = (data) => {
    const {id, fullname, mobile} = data;
    onGoBackEvent();
    onResetStateEvent();
    dispatch(setCustomerIdFromCustomerList({value: id}));
    dispatch(setCustomerNameFromCustomerList({value: fullname}));
    dispatch(setCustomerMobileFromCustomerList({value: mobile}));
  };

  return {
    state,
    onGoBackEvent,
    onGetAllCustomersEvent,
    onResetStateEvent,
    onPressItemEvent,
    onNavigateEvent,
    onGetAllCustomersCustomerListEvent0,
  };
};
