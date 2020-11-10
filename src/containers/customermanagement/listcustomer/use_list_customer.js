import {useNavigation} from '@react-navigation/native';
import {getAllCustomers} from '../../../api/index';
import {
  getAllCustomerLoading,
  getAllCustomerSuccess,
  getAllCustomerFaild,
  onCloseErrorPopUp,
  setIsEnabled,
  resetState,
} from './with_list_customer';
import {useDispatch, useSelector} from 'react-redux';
import {setData} from '../customerinfo/with_customer_info';
const useTodo = () => {
  const dispatch = useDispatch();
  const state = useSelector((rootReducer) => rootReducer.listCustomer);
  const navigation = useNavigation();

  const onGoBackEvent = () => navigation.goBack();
  const onNavigateEvent = (name) => navigation.navigate(name);

  const onSetDataEvent = (dt) => {
    dispatch(setData(dt));
  };
  const onCloseErrorPopUpEvent = () => {
    dispatch(onCloseErrorPopUp());
  };
  const onCreateCustomer = () => {
    navigation.navigate('CreateCustomer');
  };
  const getAllCustomerEvent = async () => {
    dispatch(getAllCustomerLoading());
    try {
      const CustomerResponse = await getAllCustomers();
      if (CustomerResponse.status === 'success') {
        dispatch(getAllCustomerSuccess(CustomerResponse.data));
        dispatch(setIsEnabled({value: true}));
      } else {
        dispatch(getAllCustomerFaild({errMsg: CustomerResponse.message}));
        dispatch(setIsEnabled({value: true}));
      }
    } catch (error) {
      dispatch(getAllCustomerFaild({errMsg: error.errMsg}));
      dispatch(setIsEnabled({value: true}));
    }
  };

  const onResetStateEvent = () => dispatch(resetState());

  return {
    state,
    onSetDataEvent,
    onCreateCustomer,
    getAllCustomerEvent,
    onNavigateEvent,
    onCloseErrorPopUpEvent,
    onGoBackEvent,
    onResetStateEvent,
  };
};

export default useTodo;
