import {useDispatch, useSelector} from 'react-redux';
import {
  changePasswordLoading,
  changePasswordSuccess,
  changePasswordFaild,
  setCanShowSuccessPopUp,
} from './state';
import {useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {PASSWORD_MIN_LENGTH} from '../../../../../constants/app';
import {changePassword} from '../../../../../api/index';
import AsyncStorage from '@react-native-community/async-storage';
import {setAuth} from '../../../../../reducers/app';
const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.changePasswordStaff);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const initialValues = {
    newPassword: '',
    newPasswordConfirmed: '',
  };

  const _onSubmitSuccess = async (values) => {
    dispatch(changePasswordLoading());
    const {newPassword} = values;
    try {
      const response = await changePassword(newPassword);
      if (response.status === 'success') {
        dispatch(changePasswordSuccess());
      }
    } catch (err) {
      dispatch(changePasswordFaild(err.errMsg));
    }
  };

  const validation = yup.object().shape({
    newPassword: yup
      .string()
      .min(PASSWORD_MIN_LENGTH, 'Mật khẩu phải hơn 8 kí tự')
      .required('Nhập mật khẩu')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        'Mật khẩu phải chứa chữ hoa, chữ thường và số',
      ),
    newPasswordConfirmed: yup
      .string()
      .required('Xác nhận mật khẩu')
      .test('match', 'Mật khẩu không trùng khớp', (newPasswordConfirmed) => {
        return newPasswordConfirmed === form.values.newPassword;
      }),
  });
  const form = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: _onSubmitSuccess,
  });

  const clearLocalData = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('storeInfo');
  };

  const onChangePasswordSuccess = () => {
    clearLocalData();
    dispatch(setCanShowSuccessPopUp(false));
    dispatch(setAuth(false));
  };

  return {
    state,
    navigation,
    form,
    dispatch,
    onChangePasswordSuccess,
  };
};

export default useTodo;
