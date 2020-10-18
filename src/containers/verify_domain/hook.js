import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {checkCheckdomain} from '../../api';
import {isTwoStringEqual} from '../../utility/string';
import {
  checkCheckdomainFaild,
  checkCheckdomainLoading,
  checkCheckdomainSuccess,
  setErrMsg,
  setInputValid,
} from './state';
import {setDomainAddress} from '../login/with_login';

const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.verifyDomain);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigate = (route) => {
    navigation.navigate(route);
  };

  const _initialValues = {
    domainAddress: '',
  };
  const _validation = yup.object().shape({
    domainAddress: yup.string().required('Nhập tên miền'),
  });

  const _onSubmitSuccess = async (values) => {
    navigate('Login');
    // dispatch(checkCheckdomainLoading());
    // try {
    //   const response = await checkCheckdomain(values.domainAddress);
    //   if (isTwoStringEqual(response.status, 'success')) {
    //     dispatch(setDomainAddress(values.domainAddress));
    //     dispatch(checkCheckdomainSuccess());
    //     navigate('Login');
    //   } else {
    //     dispatch(checkCheckdomainFaild(response.message));
    //   }
    // } catch (err) {
    //   dispatch(checkCheckdomainFaild(err.errMsg));
    // }
  };

  const form = useFormik({
    initialValues: _initialValues,
    validationSchema: _validation,
    onSubmit: _onSubmitSuccess,
  });
  const goBackEvent = () => {
    navigation.goBack();
  };

  const setInputValidEvent = (isValid) => {
    console.log('isValid: ', isValid)
    dispatch(setInputValid(isValid));
  };
  const setErrMsgEvent = (value) => {
    dispatch(setErrMsg(value));
  };

  return {
    state,
    form,
    goBackEvent,
    setInputValidEvent,
    setErrMsgEvent,
  };
};

export default useTodo;
