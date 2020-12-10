import { useDispatch, useSelector } from 'react-redux';
import { updateInputValid } from './state';
import { useNavigation } from '@react-navigation/native';

import {
  DOMAIN_NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  FULLNAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PHONE_MAX_LENGTH,
  STORE_NAME_MAX_LENGTH,
} from '../../constants/app'

import { changePasswordOtp } from '../../api/index';
import reactotron from 'reactotron-react-native';
const useTodo = () => {
  const appState = useSelector((rootReducer) => rootReducer.app);
  const state = useSelector((rootReducer) => rootReducer.createNewPassword);
  const stateForgetPass = useSelector((rootReducer) => rootReducer.forgotPassword);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const updateInputValidEvent = (name, isValid) => {
    dispatch(updateInputValid({ name: name, isValid: isValid }));
  };

  const onSubmitSuccess = async (values) => {
    const { password } = values;
    const mobile = stateForgetPass.mobile
    try {
      const response = await changePasswordOtp(mobile,password);
      if(response.status === 'success'){
        navigation.navigate('Login')
      }
    } catch (error) {

    }
  }

  return {
    state,
    appState,
    navigation,
    dispatch,
    updateInputValidEvent,
    stateForgetPass,
    onSubmitSuccess
  };
};

export default useTodo;
