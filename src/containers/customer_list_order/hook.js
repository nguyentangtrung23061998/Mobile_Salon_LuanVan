import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCustomers} from '../../api';
import {useMyNavigation} from '../../utility/navigation';
import {areTwoStringsEqual} from '../../utility/string';
import useCreateOrder from '../order_management/create_order/hook';
// import {updateData} from '../update_appointment/state';
import {
  getAllCustomersFaild,
  getAllCustomersLoading,
  getAllCustomersSuccess,
  setSelectedItem,
} from './state';
import reactotron from 'reactotron-react-native';

const useTodo = () => {
  const {previousRouteName} = useMyNavigation();
  const state = useSelector((rootReducer) => rootReducer.customerListOrder);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    setCustomerNameEvent,
    setCustomerIdEvent,
    setCustomerMobileEvent,
  } = useCreateOrder();
  const goBack = () => {
    navigation.goBack();
  };
  const navigate = (name) => {
    navigation.navigate(name);
  };
  const getAllCustomersEvent = async () => {
    dispatch(getAllCustomersLoading());

    try {
      const response = await getAllCustomers();
      if (areTwoStringsEqual(response.status, 'success')) {
        dispatch(getAllCustomersSuccess(response.data));
      } else {
        dispatch(getAllCustomersFaild());
      }
    } catch (err) {
      dispatch(getAllCustomersFaild());
    }
  };
  const setSelectedItemEvent = (selectedItem) => {
    if (previousRouteName === 'UpdateOrder') {
      // dispatch(updateData(selectedItem));
    } else {
      const {customerName, idCustomer, customerMobile} = selectedItem;
      setCustomerNameEvent(customerName);
      setCustomerIdEvent(idCustomer);
      setCustomerMobileEvent(customerMobile);
      dispatch(setSelectedItem(selectedItem));
    }
    goBack();
  };

  return {
    state,
    navigation,
    dispatch,
    goBack,
    getAllCustomersEvent,
    setSelectedItemEvent,
    navigate,
  };
};

export default useTodo;
