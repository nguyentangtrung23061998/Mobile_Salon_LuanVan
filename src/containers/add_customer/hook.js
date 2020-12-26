import {useDispatch, useSelector} from 'react-redux';
import {
  resetState,
  reducerName,
  setInputValues,
  createCustomerLoading,
  createCustomerSuccess,
  createCustomerFaild,
  setErrorMessage,
  setSuccessMessage,
} from './state';
import {useNavigation} from '@react-navigation/native';
import reactotron from 'reactotron-react-native';
import {addCustomer} from '../../api/index';

export default () => {
  const state = useSelector((rootReducer) => rootReducer[reducerName]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onGoBackEvent = () => navigation.goBack();

  const onResetStateEvent = () => dispatch(resetState());

  const onSetInputValuesEvent = (name, value) =>
    dispatch(setInputValues({name, value}));

  const onCreateCustomerEvent = async (values) => {
    const {fullname, mobile} = values;
    dispatch(createCustomerLoading());
    try {
      const response = await addCustomer(fullname, mobile);
      if (response.status === 'success') {
        const {message} = response;
        dispatch(createCustomerSuccess({message}));
      } else {
        const {message} = response;
        dispatch(createCustomerFaild({message}));
      }
    } catch (error) {
      const message = error.errMsg;
      dispatch(createCustomerFaild({message}));
    }
  };

  const onSetErrorMessageEvent = (value) => dispatch(setErrorMessage({value}));

  const onSetSuccessMessageEvent = (value) =>
    dispatch(setSuccessMessage({value}));

  return {
    state,
    onResetStateEvent,
    onGoBackEvent,
    onSetInputValuesEvent,
    onCreateCustomerEvent,
    onSetErrorMessageEvent,
    onSetSuccessMessageEvent,
  };
};
