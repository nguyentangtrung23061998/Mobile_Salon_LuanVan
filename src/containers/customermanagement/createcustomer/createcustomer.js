import {useFormik} from 'formik';
import Lodash from 'lodash';
import moment from 'moment';
import {Container} from 'native-base';
import React, {useCallback, useRef} from 'react';
import {Platform, Text, View} from 'react-native';
import {Button, Header} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import * as yup from 'yup';
import {DatePicker} from '../../date_picker/date_picker';
import ErrorPopUp from '../../error_pop_up/error_pop_up';
import {ErrorText} from '../../error_text';
import Input from '../../input/input';
import {MTPImage0} from '../../mtp_image';
import {MyScrollView0} from '../../my_scroll_view/my_scroll_view';
import SuccessPopUp from '../../success_pop_up/success_pop_up';
import {
  FULLNAME_MAX_LENGTH,
  PHONE_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  LIVING_PLACE_MAX_LENGTH,
  FACEBOOK_URL_MAX_LENGTH,
} from '../../../constants/app';
import {getErrorFromKey} from '../../../utility/handle_server_errors';
import CameraPopUp from './component/cameraPopUp/camera_pop_up';
import PopUp from './component/error_pop_up/error_pop_up';
import styles from './style';
import useCreateCustomer from './use_create_customer';
import avatardefault from '../../../assets/icon/add_avatar/add_avatar.png';
import {noSpaceAtAll, numberOnly} from '../../../utility/string';
import {PrimaryButton} from '../../primary_button/primary_button';

export default function CreateCustomer() {
  const {
    state,
    navigation,
    updateInputValidEvent,
    onSubmitSuccess,
    onCloseErrorPopUpEvent,
    onGoBackEvent,
    onCloseSuccessPopUpEvent,
    onSetCanShowDatePickerEvent,
    onSetPickerDateEvent,
    onSetErrorMessageEvent,
    onSetCanShowCameraEvent,
    onPressSelectorPopUpEvent,
    onResetStateEvent,
  } = useCreateCustomer();
  const fullnameRef = useRef();
  const onSetYearOfBirthEvent = (value) => {
    form.setFieldValue(
      'yearOfBirth',
      moment(value, 'YYYY/MM/DD').format('DD/MM/YYYY'),
    );
  };

  const _leftComponent = useCallback(
    () => (
      <TouchableOpacity
        onPress={() => {
          onGoBackEvent();
          onResetStateEvent();
        }}>
        <Text style={[styles.text3]}>HỦY</Text>
      </TouchableOpacity>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const _centerComponent = useCallback(
    () => <Text style={[styles.text4]}>Tạo mới khách hàng</Text>,
    [],
  );
  const initialValues = {
    fullname: '',
    mobile: '',
    yearOfBirth: '',
    email: '',
    currentPlace: '',
    facebook: '',
    avatar: '',
  };
  const validation = yup.object().shape({
    fullname: yup.string().required('Nhập họ và tên khách hàng'),

    mobile: yup
      .string()
      .required('Nhập số điện thoại')
      .max(PHONE_MAX_LENGTH, 'Sai số điện thoại'),
    yearOfBirth: yup.string().nullable(),
    email: yup.string().email('Email không hợp lệ').nullable(),
    currentPlace: yup.string().nullable(),
    facebook: yup.string().nullable(),
  });

  const form = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: onSubmitSuccess,
  });

  const isFormValid = () =>
    form.values.fullname != '' && form.values.mobile != '' && form.isValid;

  const disableButton = () => {
    return isFormValid() && (form.values.fullname, form.values.mobile);
  };

  return (
    <Container style={styles.view0}>
      <Header
        leftComponent={_leftComponent}
        centerComponent={_centerComponent}
        containerStyle={[styles.header0]}
      />
      <MyScrollView0>
        <View style={styles.view2}>
          <TouchableOpacity
            onPress={() => {
              onSetCanShowCameraEvent(true);
            }}>
            <View style={styles.view3}>
              {state?.avatar === '' && (
                <MTPImage0 source={avatardefault} style={[styles.view3]} />
              )}
              {state?.avatar !== '' && (
                <MTPImage0 source={state?.avatar} style={[styles.view3]} />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.view1}>
          <View style={styles.view6} />
          <Input
            maxLength={FULLNAME_MAX_LENGTH}
            title={'Họ và tên khách hàng: '}
            required
            autoCapitalize="words"
            placeholder={'Nhập họ và tên của khách hàng'}
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
          {Lodash.isObject(state?.errorMessage) && (
            <ErrorText
              errorMessage={getErrorFromKey(state?.errorMessage, 'fullname')}
            />
          )}
          <View style={styles.view5} />
          <Input
            title={'Điện thoại: '}
            required
            maxLength={PHONE_MAX_LENGTH}
            placeholder={'Nhập số điện thoại của khách hàng'}
            borderBottomColor={state.isMobileFocused ? '#0077be' : '#d0d0d0'}
            keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
            onBlur={form.handleBlur('mobile')}
            onChangeText={(value) => {
              form.setFieldValue('mobile', numberOnly(value));
            }}
            value={form.values.mobile}
            onFocus={() => updateInputValidEvent('mobile', true)}
            onEndEditing={() => updateInputValidEvent('mobile', false)}
            errorText={
              state.isMobileValid || !form.errors.mobile
                ? null
                : form.errors.mobile
            }
            inputRef={fullnameRef}
          />
          {Lodash.isObject(state?.errorMessage) && (
            <ErrorText
              errorMessage={getErrorFromKey(state?.errorMessage, 'mobile')}
            />
          )}
          <View style={styles.view5} />
          <TouchableOpacity
            onPress={() => {
              onSetCanShowDatePickerEvent(true);
            }}>
            <View pointerEvents="none">
              <Input
                pointerEvents="none"
                editable={false}
                title={'Ngày sinh: '}
                placeholder={'Chọn ngày sinh của khách hàng'}
                borderBottomColor={
                  state.isYearOfBirthFocused ? '#0077be' : '#d0d0d0'
                }
                onBlur={form.handleBlur('yearOfBirth')}
                onChangeText={(value) =>
                  form.setFieldValue('yearOfBirth', value)
                }
                value={form.values.yearOfBirth}
                onFocus={() => updateInputValidEvent('yearOfBirth', true)}
                onEndEditing={() => updateInputValidEvent('yearOfBirth', false)}
                errorText={
                  state.isYearOfBirthValid || !form.errors.yearOfBirth
                    ? null
                    : form.errors.yearOfBirth
                }
              />
            </View>
          </TouchableOpacity>

          {Lodash.isObject(state?.errorMessage) && (
            <ErrorText
              errorMessage={getErrorFromKey(state?.errorMessage, 'yearOfBirth')}
            />
          )}
          <View style={styles.view5} />
          <Input
            maxLength={EMAIL_MAX_LENGTH}
            autoCapitalize="none"
            title={'Email: '}
            placeholder={'Nhập email của khách hàng'}
            borderBottomColor={state.isEmailFocused ? '#0077be' : '#d0d0d0'}
            onBlur={form.handleBlur('email')}
            onChangeText={(value) => form.setFieldValue('email', value)}
            value={form.values.email}
            onFocus={() => updateInputValidEvent('email', true)}
            onEndEditing={() => updateInputValidEvent('email', false)}
            errorText={
              state.isEmailValid || !form.errors.email
                ? null
                : form.errors.email
            }
          />
          {Lodash.isObject(state?.errorMessage) && (
            <ErrorText
              errorMessage={getErrorFromKey(state?.errorMessage, 'email')}
            />
          )}
          <View style={styles.view5} />
          <Input
            maxLength={LIVING_PLACE_MAX_LENGTH}
            title={'Chỗ ở điện tại: '}
            placeholder={'Nhập chỗ ở của khách hàng'}
            borderBottomColor={
              state.isCurrentPlaceFocused ? '#0077be' : '#d0d0d0'
            }
            onBlur={form.handleBlur('currentPlace')}
            onChangeText={(value) => form.setFieldValue('currentPlace', value)}
            value={form.values.currentPlace}
            onFocus={() => updateInputValidEvent('currentPlace', true)}
            onEndEditing={() => updateInputValidEvent('currentPlace', false)}
            errorText={
              state.isCurrentPlaceValid || !form.errors.currentPlace
                ? null
                : form.errors.currentPlace
            }
          />
          {Lodash.isObject(state?.errorMessage) && (
            <ErrorText
              errorMessage={getErrorFromKey(
                state?.errorMessage,
                'currentPlace',
              )}
            />
          )}
          <View style={styles.view5} />
          <Input
            maxLength={FACEBOOK_URL_MAX_LENGTH}
            title={'Facebook: '}
            placeholder={'Nhập Facebook của khách hàng'}
            borderBottomColor={state.isFacebookFocused ? '#0077be' : '#d0d0d0'}
            onBlur={form.handleBlur('facebook')}
            onChangeText={(value) =>
              form.setFieldValue('facebook', noSpaceAtAll(value))
            }
            value={form.values.facebook}
            onFocus={() => updateInputValidEvent('facebook', true)}
            onEndEditing={() => updateInputValidEvent('facebook', false)}
            errorText={
              state.isFacebookValid || !form.errors.facebook
                ? null
                : form.errors.facebook
            }
          />
          {Lodash.isObject(state?.errorMessage) && (
            <ErrorText
              errorMessage={getErrorFromKey(state?.errorMessage, 'facebook')}
            />
          )}
        </View>
        <View style={{flex: 1}} />
        <PrimaryButton
          title="THÊM"
          disabled={!disableButton()}
          onPress={form.handleSubmit}
          containerStyle={{marginVertical: 35, marginHorizontal: 25}}
        />
      </MyScrollView0>
      <Spinner visible={state.isSubmitting} />
      <DatePicker
        minimumDate={new Date('1800-01-01')}
        maximumDate={new Date()}
        isVisible={state?.canShowDatePicker}
        date={state?.pickerDate}
        onDateChange={(val) => onSetPickerDateEvent(val)}
        onPressContainer={() => {
          onSetCanShowDatePickerEvent(false);
        }}
        onConfirm={(date) => {
          onSetYearOfBirthEvent(date);
          onSetCanShowDatePickerEvent(false);
        }}
      />
      {state.isSuccess && (
        <SuccessPopUp
          msg={'Thành công'}
          buttonText={'Xác nhận'}
          onPress={() => {
            onCloseSuccessPopUpEvent();
            navigation.navigate('ListCustomer');
          }}
        />
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
      <CameraPopUp
        isVisible={state.canShowCamera}
        onPress={onPressSelectorPopUpEvent}
      />
    </Container>
  );
}