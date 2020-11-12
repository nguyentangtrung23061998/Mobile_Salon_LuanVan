import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  postAddCustomerStart,
  postAddCustomerFaild,
  postAddCustomerSuccess,
  updateErrorText,
  updateInputValid,
  sendErrorInput,
  onCloseSuccessPopUp,
} from './state';
import useCustomerList from '../../customer_list/hook';
import {resetCustomerList} from '../../../containers/customer_list/state';
import {addCustomer} from '../../../api/index';
const useAddCustomer = () => {
  const state = useSelector((rootReducer) => rootReducer.addcustomer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {getAllCustomersEvent} = useCustomerList();
  const updateInputValidEvent = (name, isValid) => {
    dispatch(updateInputValid({name: name, isValid: isValid}));
  };
  const onCloseErrorPopUpEvent = () => {
    dispatch(updateErrorText());
  };
  const goBackEvent = () => {
    getAllCustomersEvent();
    navigation.goBack();
  };

  const onSubmitSuccess = async (values) => {
    dispatch(postAddCustomerStart());
    try {
      const response = await addCustomer(values.fullname, values.mobile);
      if (response.status === 'success') {
        dispatch(postAddCustomerSuccess());
        dispatch(resetCustomerList());
      } else {
        const {message} = response;
        dispatch(sendErrorInput({errMsg: message}));
      }
    } catch (error) {
      dispatch(postAddCustomerFaild({errMsg: error.errMsg}));
    }
  };
  const onCloseSuccessPopUpEvent = () => {
    dispatch(onCloseSuccessPopUp());
  };
  return {
    state,
    navigation,
    goBackEvent,
    dispatch,
    updateInputValidEvent,
    onSubmitSuccess,
    onCloseErrorPopUpEvent,
    onCloseSuccessPopUpEvent,
  };
};

export default useAddCustomer;
