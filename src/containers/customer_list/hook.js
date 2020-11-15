import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import reactotron from 'reactotron-react-native';
import {getAllCustomers, getCustomerByPhone} from '../../api';
import {useMyNavigation} from '../../utility/navigation';
import {areTwoStringsEqual} from '../../utility/string';
import useCreateAppointment from '../create_appointment/hook';
import {updateData} from '../update_appointment/state';
import {
  getAllCustomersFaild,
  getAllCustomersLoading,
  getAllCustomersSuccess,
  setSelectedItem,
  searchCustomerLoading,
  searchCustomerSuccess,
  searchCustomersFaild,
  changeSearchText,
} from './state';

const useTodo = () => {
  const {previousRouteName} = useMyNavigation();
  const state = useSelector((rootReducer) => rootReducer.customerList);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {setCustomerNameEvent, setCustomerIdEvent} = useCreateAppointment();
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
      dispatch(getAllCustomersFaild({errMsg: err.errMsg}));
    }
  };
  const setSelectedItemEvent = (selectedItem) => {
    if (previousRouteName === 'UpdateAppointment') {
      dispatch(updateData(selectedItem));
    } else {
      const {customerName, idCustomer} = selectedItem;
      setCustomerNameEvent(customerName);
      setCustomerIdEvent(idCustomer);
      dispatch(setSelectedItem(selectedItem));
    }
    goBack();
  };
  const getCustomerByMobile = async () => {
    dispatch(searchCustomerLoading());
    try {
      const response = await getCustomerByPhone();
      if (response.status === 'success') {
        dispatch(searchCustomerSuccess());
      } else {
        const message = response;
        dispatch(searchCustomersFaild({errMsg: message}));
      }
    } catch (err) {
      dispatch(searchCustomersFaild({errMsg: err.errMsg}));
    }
  };
  const changeSearchTextEvent = (text) => {
    dispatch(changeSearchText(text));
  };
  return {
    state,
    navigation,
    dispatch,
    goBack,
    getAllCustomersEvent,
    setSelectedItemEvent,
    navigate,
    getCustomerByMobile,
    changeSearchTextEvent,
  };
};

export default useTodo;
