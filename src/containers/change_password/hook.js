import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {changePassword} from '../../api/index';
import {PASSWORD_MIN_LENGTH} from '../../constants/app';
import {
  changePasswordFaild,
  changePasswordLoading,
  changePasswordSuccess,
  setCanShowPassword,
  setErrorMessage,
  setIsConfirmedPasswordEncrypted,
  setIsNewPasswordEncrypted,
  setIsOldPasswordEncrypted,
  setSuccessMessage,
} from './state';

const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.changePassword);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onGoBackEvent = () => navigation.goBack();
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    newPasswordConfirmed: '',
  };

  const _onSubmitSuccess = async (values) => {
    dispatch(changePasswordLoading());
    const {oldPassword, newPassword} = values;
    try {
      const response = await changePassword(oldPassword, newPassword);
      if (response.status === 'success') {
        const {message} = response;
        dispatch(changePasswordSuccess({message}));
      } else {
        const {message} = response;
        dispatch(changePasswordFaild({message}));
      }
    } catch (error) {
      const message = error.errMsg;
      dispatch(changePasswordFaild({message}));
    }
  };

  const validation = yup.object().shape({
    oldPassword: yup
      .string()
      .min(PASSWORD_MIN_LENGTH, 'Mật khẩu phải hơn 8 kí tự')
      .required('Nhập mật khẩu')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        'Mật khẩu phải chứa chữ hoa, chữ thường và số',
      ),
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

  const onChangePasswordSuccess = () => {
    dispatch(setSuccessMessage({value: ''}));
    navigation.goBack();
  };

  const onPressLeftItemEvent = () => {
    onGoBackEvent();
  };

  const onSetErrorMessageEvent = (value) => dispatch(setErrorMessage({value}));

  const onSetCanShowPasswordEvent = (value) =>
    dispatch(setCanShowPassword({value}));

  const onSetArePasswordsEncryptedEvent = (key) => {
    switch (key) {
      case 'oldPassword':
        dispatch(setIsOldPasswordEncrypted());
        break;
      case 'newPassword':
        dispatch(setIsNewPasswordEncrypted());
        break;
      case 'newPasswordConfirmed':
        dispatch(setIsConfirmedPasswordEncrypted());
    }
  };
  return {
    state,
    navigation,
    form,
    dispatch,
    onChangePasswordSuccess,
    onPressLeftItemEvent,
    onSetErrorMessageEvent,
    onSetCanShowPasswordEvent,
    onSetArePasswordsEncryptedEvent,
  };
};

export default useTodo;
