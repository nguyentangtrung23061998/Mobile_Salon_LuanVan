import React, {useRef, useCallback} from 'react';
import {Image, Text, View, Platform, TouchableOpacity} from 'react-native';
import Input from '../../input/input';
import styles from './style';
import useCreateStaff from './use_create_staff';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {PASSWORD_MIN_LENGTH, PHONE_MAX_LENGTH} from '../../../constants/app';
import PopUp from './component/error_pop_up/error_pop_up';
import {CheckBox} from 'react-native-elements';
import CheckBoxOn from '../../../assets/icon/check_box_on/check_box_on.png';
import {Button, Header} from 'react-native-elements';
import CameraPopUp from './component/cameraPopUp/camera_pop_up';
import ImagePicker from 'react-native-image-picker';
import checkBoxOff from '../../../assets/icon/check_box_off/check_box_off.png';
import {Spinner, Container} from 'native-base';
import avatardefault from '../../../assets/icon/add_avatar/add_avatar.png';
import LinearGradient from 'react-native-linear-gradient';
import SuccessPopUp from '../../success_pop_up/success_pop_up';
import Lodash from 'lodash';
import {getErrorFromKey} from '../../../utility/handle_server_errors';
import {ErrorText} from '../../error_text';
import ErrorPopUp from '../../error_pop_up/error_pop_up';
import {MyScrollView0} from '../../my_scroll_view/my_scroll_view';
import reactotron from 'reactotron-react-native';
export default function CreateStaff() {
  const {
    state,
    navigation,
    updateInputValidEvent,
    onSubmitSuccess,
    onCloseErrorPopUpEvent,
    onGoBackEvent,
    onCloseSuccessPopUpEvent,
    onSetErrorMessageEvent,
    onSetCanShowCameraEvent,
  } = useCreateStaff();
  const fullnameRef = useRef();
  const positionRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const _leftComponent = useCallback(
    () => (
      <TouchableOpacity
        onPress={() => {
          onGoBackEvent();
        }}>
        <Text style={[styles.text3]}>HỦY</Text>
      </TouchableOpacity>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const _centerComponent = useCallback(
    () => <Text style={[styles.text4]}>Tạo mới nhân viên</Text>,
    [],
  );

  const initialValues = {
    fullname: '',
    position: '',
    email: '',
    mobile: '',
    password: '',
    passwordConfirmed: '',
    avatar: '',
    isCashier: false,
  };
  const validation = yup.object().shape({
    fullname: yup
      .string()
      .required('Nhập họ và tên')
      .min(2, 'Nhập đủ họ và tên'),
    position: yup.string().required('Nhập chức vụ'),
    email: yup.string().email('Email không hợp lệ').nullable(),
    mobile: yup
      .string()
      .required('Nhập số điện thoại')
      .max(PHONE_MAX_LENGTH, 'Sai số điện thoại'),
    password: yup
      .string()
      .min(PASSWORD_MIN_LENGTH, 'Mật khẩu phải hơn 8 kí tự')
      .required('Nhập mật khẩu')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        'Mật khẩu phải chứa chữ hoa, chữ thường và số',
      ),
    passwordConfirmed: yup
      .string()
      .required('Nhập lại mật khẩu')
      .test('match', 'Mật khẩu không trùng khớp', (passwordConfirmed) => {
        return passwordConfirmed === form.values.password;
      }),
  });

  const form = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: onSubmitSuccess,
  });

  const isFormValid = () =>
    form.values.fullname != '' &&
    form.values.position != '' &&
    form.values.mobile != '' &&
    form.values.password != '' &&
    form.values.passwordConfirmed != '' &&
    form.isValid;

  const disableButton = () => {
    return (
      isFormValid() &&
      (form.values.fullname,
      form.values.position,
      form.values.mobile,
      form.values.password,
      form.values.passwordConfirmed)
    );
  };

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
        reactotron.log(response);
      } catch (err) {}
    });
  };

  const _openImageLibrary = () => {
    onSetCanShowCameraEvent(false);
    if (Platform.OS === 'android') {
      _openAndroidImageLib();
    } else {
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
      setTimeout(() => {
        _openIosCamera();
      }, 300);
    }
  };

  const _onPressCamera = (type) => {
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
  return (
    <Container style={styles.view0}>
      <Header
        leftComponent={_leftComponent}
        centerComponent={_centerComponent}
        containerStyle={[styles.header0]}
      />
      <MyScrollView0 styles={styles.myScrollView0}>
        <View style={styles.view2}>
          <TouchableOpacity
            onPress={() => {
              // setCanShowCamera(true);
              onSetCanShowCameraEvent(true);
            }}>
            <View style={styles.view3}>
              {form?.values?.avatar === '' && <Image source={avatardefault} />}
              {form?.values?.avatar !== '' && (
                <Image
                  style={styles.view3}
                  source={{uri: form?.values?.avatar}}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.view1}>
          <View style={styles.view5} />
          <Input
            titleStyle={styles.input0}
            title={'Họ tên nhân viên: '}
            required
            autoCapitalize="words"
            placeholder={'Nhập họ tên của nhân viên'}
            borderBottomColor={state.isFullNameFocused ? '#0077be' : '#d0d0d0'}
            onBlur={form.handleBlur('fullname')}
            onChangeText={(value) => {
              if (value === ' ') {
                value = value.substr(1);
              }
              form.setFieldValue('fullname', value);
            }}
            value={form.values.fullname}
            onFocus={() => updateInputValidEvent('fullname', true)}
            onEndEditing={() => updateInputValidEvent('fullname', false)}
            errorText={
              state.isFullNameValid || !form.errors.fullname
                ? null
                : form.errors.fullname
            }
            onSubmitEditing={() => fullnameRef?.current?.focus()}
          />
          <View style={styles.view5} />
          <Input
            titleStyle={styles.input0}
            title={'Chức vụ: '}
            required
            placeholder={'Nhập vị trí của nhân viên'}
            borderBottomColor={state.isPositionFocused ? '#0077be' : '#d0d0d0'}
            onBlur={form.handleBlur('position')}
            onChangeText={(value) => {
              if (value === ' ') {
                value = value.substr(1);
              }
              form.setFieldValue('position', value);
            }}
            value={form.values.position}
            onFocus={() => updateInputValidEvent('position', true)}
            onEndEditing={() => updateInputValidEvent('position', false)}
            errorText={
              state.isPosistionValid || !form.errors.position
                ? null
                : form.errors.position
            }
            inputRef={fullnameRef}
            onSubmitEditing={() => positionRef?.current?.focus()}
          />
          <View style={styles.view6} />
          <View style={styles.view4}>
            <Text style={styles.text0}>{'Nhân viên có thể thu ngân'}</Text>
            <View style={styles.view7}>
              <CheckBox
                checkedIcon={<Image source={CheckBoxOn} style={styles.view8} />}
                uncheckedIcon={
                  <Image source={checkBoxOff} style={styles.view8} />
                }
                checked={form.values.isCashier}
                onPress={() => {
                  form.setFieldValue('isCashier', !form.values.isCashier);
                }}
              />
            </View>
          </View>
          <View style={styles.view6} />
          <Input
            titleStyle={styles.input0}
            autoCapitalize="none"
            title={'Email: '}
            placeholder={'Nhập email cho dịch vụ'}
            borderBottomColor={state.isEmailFocused ? '#0077be' : '#d0d0d0'}
            onBlur={form.handleBlur('email')}
            onChangeText={(value) => form.setFieldValue('email', value.trim())}
            value={form.values.email}
            onFocus={() => updateInputValidEvent('email', true)}
            onEndEditing={() => updateInputValidEvent('email', false)}
            errorText={
              state.isEmailValid || !form.errors.email
                ? null
                : form.errors.email
            }
            inputRef={positionRef}
            onSubmitEditing={() => emailRef?.current?.focus()}
          />
          {Lodash.isObject(state?.errorMessage) && (
            <ErrorText
              errorMessage={getErrorFromKey(state?.errorMessage, 'email')}
            />
          )}
          <View style={styles.view5} />
          <Input
            titleStyle={styles.input0}
            title={'Số điện thoại: '}
            required
            maxLength={12}
            placeholder={'Nhập số điện thoại của dịch vụ'}
            borderBottomColor={state.isMobileFocused ? '#0077be' : '#d0d0d0'}
            keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
            onBlur={form.handleBlur('mobile')}
            onChangeText={(value) => form.setFieldValue('mobile', value.trim())}
            value={form.values.mobile}
            onFocus={() => updateInputValidEvent('mobile', true)}
            onEndEditing={() => updateInputValidEvent('mobile', false)}
            errorText={
              state.isMobileValid || !form.errors.mobile
                ? null
                : form.errors.mobile
            }
            inputRef={emailRef}
            onSubmitEditing={() => passwordRef?.current?.focus()}
          />
          {Lodash.isObject(state?.errorMessage) && (
            <ErrorText
              errorMessage={getErrorFromKey(state?.errorMessage, 'mobile')}
            />
          )}
          <View style={styles.view5} />
          <Input
            titleStyle={styles.input0}
            title={'Mật khẩu: '}
            required
            placeholder={'Nhập mật khẩu tài khoản cho nhân viên'}
            secureTextEntry
            borderBottomColor={state.isPasswordFocused ? '#0077be' : '#d0d0d0'}
            onBlur={form.handleBlur('password')}
            onChangeText={(value) =>
              form.setFieldValue('password', value.trim())
            }
            value={form.values.password}
            onFocus={() => updateInputValidEvent('password', true)}
            onEndEditing={() => updateInputValidEvent('password', false)}
            errorText={
              state.isPasswordValid || !form.errors.password
                ? null
                : form.errors.password
            }
            inputRef={passwordRef}
            onSubmitEditing={() => passwordConfirmRef?.current?.focus()}
          />
          {Lodash.isObject(state?.errorMessage) && (
            <ErrorText
              errorMessage={getErrorFromKey(state?.errorMessage, 'password')}
            />
          )}
          <View style={styles.view5} />
          <Input
            titleStyle={styles.input0}
            title={'Xác nhận mật khẩu: '}
            required
            placeholder={'Nhập lại mật khẩu cho tài khoản'}
            secureTextEntry
            borderBottomColor={
              state.isPasswordConfirmedFocused ? '#0077be' : '#d0d0d0'
            }
            onBlur={form.handleBlur('passwordConfirmed')}
            onChangeText={(value) =>
              form.setFieldValue('passwordConfirmed', value.trim())
            }
            value={form.values.passwordConfirmed}
            onFocus={() => updateInputValidEvent('passwordConfirmed', true)}
            onEndEditing={() =>
              updateInputValidEvent('passwordConfirmed', false)
            }
            errorText={
              state.isPasswordConfirmedValid || !form.errors.passwordConfirmed
                ? null
                : form.errors.passwordConfirmed
            }
            inputRef={passwordConfirmRef}
          />
          {Lodash.isObject(state?.errorMessage) && (
            <ErrorText
              errorMessage={getErrorFromKey(
                state?.errorMessage,
                'passwordConfirmed',
              )}
            />
          )}
          <View style={styles.view6} />
          <Button
            title="THÊM"
            buttonStyle={styles.myButton0}
            titleStyle={styles.text1}
            disabled={!disableButton()}
            onPress={form.handleSubmit}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [
                disableButton() ? '#4db1e9' : '#c1c1c1',
                disableButton() ? '#005eff' : '#c1c1c1',
              ],
              start: {x: 0, y: 1},
              end: {x: 0, y: 0},
            }}
          />
        </View>
      </MyScrollView0>
      {state.isSuccess && (
        <SuccessPopUp
          msg={'Thành công'}
          buttonText={'Xác nhận'}
          onPress={() => {
            onCloseSuccessPopUpEvent();
            navigation.navigate('ListStaff');
          }}
        />
      )}
      {state?.isSubmitting && (
        <View style={[styles.view10]}>
          <Spinner color="#fff" />
        </View>
      )}
      {state?.errorText && (
        <PopUp
          msg={state?.errorText ?? ''}
          buttonText={'Trở lại'}
          onPress={onCloseErrorPopUpEvent}
        />
      )}
      {state?.errorMessage && Lodash.isString(state?.errorMessage) && (
        <ErrorPopUp
          msg={state?.errorMessage}
          buttonText="Quay lại"
          onPress={() => onSetErrorMessageEvent(undefined)}
        />
      )}
      <CameraPopUp isVisible={state.canShowCamera} onPress={_onPressCamera} />
    </Container>
  );
}
