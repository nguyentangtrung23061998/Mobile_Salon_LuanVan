import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import reactotron from 'reactotron-react-native';
import * as yup from 'yup';
import { setMobile, setOtp,setMobileStattus,onCloseErrorPopUp } from './state';
import { sendOtp } from '../../api/index';
import { Alert, Text, TouchableOpacity, StyleSheet } from 'react-native'
const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.forgotPassword);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  
  const onCloseErrorPopUpEvent = () => {
    dispatch(onCloseErrorPopUp(true));
  };


  const initialValues = {
    phone: '',
  };

  const sentOtp = async () => {
    try {
      const response = await sendOtp("Vonage APIs", stateForgetPass.mobile);
      reactotron.log("response: " + response)
      if (response === 'success') {

      }
    } catch (error) {
      const message = error.errMsg;
    }
  }

  const validation = yup.object().shape({
    phone: yup.string().required('Nhập số điện thoại'),
  });
  const _onSubmitSuccess = async (values) => {
    const { phone } = values;

    const response = await sendOtp("Vonage APIs", phone);
    if (response.status === 'success') {
      dispatch(setMobile(phone));
      dispatch(setMobileStattus(true));
      navigation.navigate('VerifyOtp')
      // navigation.navigate('CreateNewPassword')
    }else{
      dispatch(setMobileStattus(false));
    }
  };

  const form = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: _onSubmitSuccess,
  });

  return {
    state,
    navigation,
    dispatch,
    form,
    onCloseErrorPopUpEvent
  };
};

export default useTodo;
