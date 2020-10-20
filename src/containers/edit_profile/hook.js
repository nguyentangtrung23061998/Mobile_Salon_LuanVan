import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import moment from 'moment';
import {Platform} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {updateProfile} from '../../api';
import {setProfile} from '../../utility/local_storage';
import {
  convertToSingleSpace,
  noSpaceAtAll,
  noSpaceAtEntry,
} from '../../utility/string';
import {
  initPickerDate,
  resetPickerDate,
  setCanShowCamera,
  setCanShowDatePicker,
  setErrorMessage,
  setIsInputFieldFocused,
  setPickerDate,
  setSuccessMessage,
  updateProfileFaild,
  updateProfileLoading,
  updateProfileSuccess,
  setData,
  resetData,
} from './state';
import {setData as setDataProfile} from '../profile/with_profile';
import {getProfile} from '../../utility/local_storage';
const useTodo = () => {
  const navigation = useNavigation();
  const state = useSelector((rootReducer) => rootReducer.editProfile);
  const appState = useSelector((rootReducer) => rootReducer.app);
  const {role} = appState;

  const _onSubmitSuccess = async (values) => {
    const {
      avatar,
      fullname,
      yearOfBirth,
      homeTown,
      currentPlace,
      identityCard,
      mobile,
      email,
    } = values;
    dispatch(updateProfileLoading());
    try {
      const response = await updateProfile(
        fullname,
        homeTown,
        yearOfBirth,
        currentPlace,
        identityCard,
        email,
        mobile,
        avatar,
      );
      if (response.status === 'success') {
        const {data, message} = response;
        data.role = role;
        await setProfile(data);
        dispatch(setDataProfile({value: data}));
        dispatch(setData({value: data}));
        dispatch(updateProfileSuccess({message}));
      } else {
        const {message} = response;
        dispatch(updateProfileFaild({message}));
      }
    } catch (error) {
      const message = error.errMsg;

      dispatch(updateProfileFaild({message}));
    }
  };

  const _validation = yup.object().shape({
    fullname: yup
      .string()
      .required('Nhập họ và tên')
      .min(2, 'Nhập đủ họ và tên'),
    mobile: yup.string().required('Nhập số điện thoại'),
    email: yup.string().email('Email không hợp lệ'),
  });

  const initialValues = {
    avatar: state?.data?.avatar ?? null,
    fullname: state?.data?.fullname ?? '',
    yearOfBirth: state?.data?.yearOfBirth ?? null,
    homeTown: state?.data?.homeTown ?? null,
    currentPlace: state?.data?.currentPlace ?? null,
    identityCard: state?.data?.identityCard
      ? state?.data?.identityCard.toString()
      : null,
    mobile: state?.data?.mobile ?? '',
    email: state?.data?.email ?? null,
  };
  const form = useFormik({
    initialValues: initialValues,
    validationSchema: _validation,
    onSubmit: _onSubmitSuccess,
  });
  const dispatch = useDispatch();

  const {setFieldValue, values} = form;
  const {
    fullname,
    homeTown,
    currentPlace,
    identityCard,
    mobile,
    email,
  } = values;
  const _openAndroidImageLib = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true,
      },
    };
    ImagePicker.launchImageLibrary(options, async (response) => {
      let imgUri;
      if (response.didCancel) {
      } else {
        try {
          imgUri = await response.uri;
          form.setFieldValue('avatar', imgUri);
        } catch (err) {}
      }
    });
  };
  const _openIosImageLib = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true,
      },
    };
    ImagePicker.launchImageLibrary(options, async (response) => {
      let imgUri;
      try {
        imgUri = await response.uri;
        imgUri = '~' + imgUri.substring(imgUri.indexOf('/Documents'));
        form.setFieldValue('avatar', imgUri);
      } catch (err) {}
    });
  };
  const _openImageLibrary = () => {
    onSetCanShowCameraEvent(false);
    if (Platform.OS === 'android') {
      _openAndroidImageLib();
    } else {
      onSetCanShowCameraEvent(false);
      setTimeout(() => {
        _openIosImageLib();
      }, 300);
    }
  };

  const _openAndroidCamera = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true,
      },
    };

    ImagePicker.launchCamera(options, async (response) => {
      let imgUri;
      if (response.didCancel) {
      } else {
        try {
          imgUri = await response.uri;
          form.setFieldValue('avatar', imgUri);
        } catch (err) {}
      }
    });
  };
  const _openIosCamera = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true,
      },
    };
    ImagePicker.launchCamera(options, async (response) => {
      let imgUri;
      try {
        imgUri = await response.uri;
        imgUri = '~' + imgUri.substring(imgUri.indexOf('/Documents'));
        form.setFieldValue('avatar', imgUri);
      } catch (err) {}
    });
  };

  const _openCamera = () => {
    onSetCanShowCameraEvent(false);
    if (Platform.OS === 'android') {
      _openAndroidCamera();
    } else {
      onSetCanShowCameraEvent(false);
      setTimeout(() => {
        _openIosCamera();
      }, 300);
    }
  };

  const onPressCameraEvent = (type) => {
    switch (type) {
      case 'cancel':
        onSetCanShowCameraEvent(false);
        break;
      case 'library':
        _openImageLibrary();
        break;
      case 'camera':
        _openCamera();
        break;
    }
  };

  const onSetPickerDateEvent = (value) => {
    dispatch(setPickerDate({value}));
  };

  const onSetCanShowDatePickerEvent = (value) => {
    dispatch(setCanShowDatePicker({value}));
  };

  const onGoBackEvent = () => navigation.goBack();

  const onSetYearOfBirthEvent = (value) => {
    setFieldValue(
      'yearOfBirth',
      moment(value, 'YYYY/MM/DD').format('DD/MM/YYYY'),
    );
  };
  const onSetCanShowCameraEvent = (value) =>
    dispatch(setCanShowCamera({value}));

  const onSetFieldValueEvent = (key, value) => {
    switch (key) {
      case 'avatar':
        break;

      case 'fullname':
        setFieldValue(key, convertToSingleSpace(noSpaceAtEntry(value)));
        break;
      case 'yearOfBirth':
        break;
      case 'homeTown':
        setFieldValue(key, convertToSingleSpace(noSpaceAtEntry(value)));
        break;
      case 'currentPlace':
        setFieldValue(key, convertToSingleSpace(noSpaceAtEntry(value)));
        break;
      case 'identityCard':
        setFieldValue(key, value);
        break;
      case 'mobile':
        setFieldValue(key, value);
        break;
      case 'email':
        setFieldValue(key, noSpaceAtAll(value));
        break;
    }
  };

  const onEndEditFieldEvent = (key, value) => {
    switch (key) {
      case 'fullname':
        setFieldValue(key, fullname.trim());
        dispatch(setIsInputFieldFocused({key, value}));
        break;
      case 'homeTown':
        setFieldValue(key, homeTown.trim());
        dispatch(setIsInputFieldFocused({key, value}));
        break;
      case 'currentPlace':
        setFieldValue(key, currentPlace.trim());
        dispatch(setIsInputFieldFocused({key, value}));
        break;
      case 'identityCard':
        setFieldValue(key, identityCard);
        break;
      case 'mobile':
        setFieldValue(key, mobile);
        dispatch(setIsInputFieldFocused({key, value}));
        break;
      case 'email':
        setFieldValue(key, email);
        dispatch(setIsInputFieldFocused({key, value}));
    }
  };

  const onSetIsInputFieldFocusedEvent = (key, value) => {
    dispatch(setIsInputFieldFocused({key, value}));
  };

  const onResetPickerDateEvent = () => {
    dispatch(resetPickerDate());
  };

  const onInitPickerDateEvent = (value) => {
    dispatch(initPickerDate({value}));
  };

  const onSetSuccessMessageEvent = (value) => {
    dispatch(setSuccessMessage({value}));
  };

  const onSetErrorMessageEvent = (value) => {
    dispatch(setErrorMessage({value}));
  };

  const onResetDataEvent = async () => {
    try {
      const value = await getProfile();
      dispatch(resetData({value}));
    } catch (error) {}
  };

  return {
    form,
    state,
    role,
    dispatch,
    onPressCameraEvent,
    onSetPickerDateEvent,
    onSetCanShowDatePickerEvent,
    onGoBackEvent,
    onSetYearOfBirthEvent,
    onSetCanShowCameraEvent,
    onSetFieldValueEvent,
    onEndEditFieldEvent,
    onSetIsInputFieldFocusedEvent,
    onResetPickerDateEvent,
    onInitPickerDateEvent,
    onSetSuccessMessageEvent,
    onSetErrorMessageEvent,
    onResetDataEvent,
  };
};

export default useTodo;
