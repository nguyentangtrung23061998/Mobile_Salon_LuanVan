import {useNavigation} from '@react-navigation/native';
import {postLogin} from '../../api/index';
import {setAuth, setRole, setIsCashier} from '../../reducers/app';
import {
  setProfile,
  setStoreInfo,
  setToken,
} from '../../utility/local_storage';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {PASSWORD_MIN_LENGTH} from '../../constants/app';
import {setData as setDataHome} from '../home/state';
import {setData as setDataStoreDetails} from '../storeInfo/with_store_info';
import {setData as setDataEditProfile} from '../edit_profile/state';
import {
  onCloseErrorPopUp,
  postLoginFaild,
  postLoginStart,
  postLoginSuccess,
  updateInputValid,
} from './with_login';
import {setData as setDataProfile} from '../profile/with_profile';
import reactotron from 'reactotron-react-native';

const useTodo = () => {
  const dispatch = useDispatch();
  const state = useSelector((rootReducer) => rootReducer.login);

  const _navigation = useNavigation();

  const _onSubmitSuccess = async (values) => {
    // reactotron.log("values", values);
    dispatch(postLoginStart());

    try {
      const response = await postLogin(
        state.domainAddress,
        values.mobile,
        values.password,
      );
      reactotron.log("response", response);

      if (response.status === 'success') {
        const {storeInfo} = response.data.user;
        const {token} = response.data.Auth;
        const {profile} = response.data;

        await setStoreInfo(storeInfo);
        await setToken(token);
        await setProfile(profile);

        dispatch(postLoginSuccess());
        dispatch(setAuth(true));
        dispatch(setDataHome({value: storeInfo}));
        dispatch(setDataStoreDetails({value: storeInfo}));
        dispatch(setDataEditProfile({value: profile}));
        dispatch(setRole({value: profile?.role}));
        dispatch(setIsCashier({value: profile?.isCashier}));
        dispatch(setDataProfile({value: profile}));
        _navigation.navigate('Main');
      } else {
        dispatch(postLoginFaild({errMsg: response.message}));
      }
    } catch (error) {
      dispatch(postLoginFaild({errMsg: error.errMsg}));
    }
  };

  const _initialValues = {
    mobile: '',
    password: '',
  };

  const _validation = yup.object().shape({
    mobile: yup.string().required('Nhập số điện thoại'),
    password: yup
      .string()
      .min(PASSWORD_MIN_LENGTH, 'Mật khẩu từ 8 đến 32 kí tự')
      .required('Nhập mật khẩu')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        'Mật khẩu phải chứa chữ hoa, chữ thường và số',
      ),
  });

  const form = useFormik({
    initialValues: _initialValues,
    validationSchema: _validation,
    onSubmit: _onSubmitSuccess,
  });

  const isFormValid = () =>
    form.values.mobile !== '' && form.values.password !== '' && form.isValid;

  const navigate = (name) => {
    _navigation.navigate(name);
  };
  const goBack = () => {
    _navigation.goBack();
  };

  const updateInputValidEvent = (name, isValid) => {
    dispatch(updateInputValid({name, isValid}));
  };

  const onCloseErrorPopUpEvent = () => {
    dispatch(onCloseErrorPopUp());
  };

  return {
    state,
    form,
    _navigation,
    goBack,
    isFormValid,
    updateInputValidEvent,
    navigate,
    onCloseErrorPopUpEvent,
  };
};

export default useTodo;
