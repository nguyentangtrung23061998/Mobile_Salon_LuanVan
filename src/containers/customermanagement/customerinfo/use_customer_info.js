import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setData} from '../editcustomer/with_edit_customer';
import {deleteCustomer, getAllOrder} from '../../../api/index';
import {
  deleteCustomerLoading,
  deleteCustomerSuccess,
  deleteCustomerFaild,
  onCloseErrorPopUp,
  onCloseSuccessPopUp,
  getAllOrderHistoryLoading,
  getAllOrderHistorySuccess,
  getAllOrderHistoryFaild,
} from './with_customer_info';
import {sendUpdateListCustomer} from '../listcustomer/with_list_customer';
import useListCustomer from '../listcustomer/use_list_customer';

const useTodo = () => {
  const dispatch = useDispatch();
  const state = useSelector((rootReducer) => rootReducer.infoCustomer);
  const navigation = useNavigation();
  const {getAllCustomerEvent} = useListCustomer();
  const onNavigateEvent = (name) => {
    navigation.navigate(name);
  };
  const goBackEvent = () => {
    navigation.goBack();
  };
  const idCustomer = state.data.id;
  const getAllOrderHistoryEvent = async () => {
    dispatch(getAllOrderHistoryLoading());
    try {
      const Response = await getAllOrder(idCustomer);
      if (Response.status === 'success') {
        dispatch(getAllOrderHistorySuccess({dataOrder: Response.data}));
      } else {
        dispatch(getAllOrderHistoryFaild({errMsg: Response.message}));
      }
    } catch (error) {
      dispatch(getAllOrderHistoryFaild({errMsg: error.errMsg}));
    }
  };
  const deleteCustomerEvent = async (id) => {
    dispatch(deleteCustomerLoading());
    try {
      const Response = await deleteCustomer(id);
      if (Response.status === 'success') {
        dispatch(deleteCustomerSuccess({id}));
        dispatch(sendUpdateListCustomer());
        updateListCustomer();
      } else {
        dispatch(deleteCustomerFaild({errMsg: Response.message}));
      }
    } catch (err) {
      dispatch(deleteCustomerFaild({errMsg: err.errMsg}));
    }
  };
  const onCloseErrorPopUpEvent = () => {
    dispatch(onCloseErrorPopUp());
  };
  const onSetDataEvent = (dt) => {
    dispatch(setData(dt));
  };
  const updateListCustomer = () => {
    getAllCustomerEvent();
  };
  const onCloseSuccessPopUpEvent = () => {
    dispatch(onCloseSuccessPopUp());
  };
  return {
    state,
    navigation,
    onNavigateEvent,
    dispatch,
    goBackEvent,
    onSetDataEvent,
    deleteCustomerEvent,
    onCloseErrorPopUpEvent,
    updateListCustomer,
    onCloseSuccessPopUpEvent,
    getAllOrderHistoryEvent,
  };
};

export default useTodo;
