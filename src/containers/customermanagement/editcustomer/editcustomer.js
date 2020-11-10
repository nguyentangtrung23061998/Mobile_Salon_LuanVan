import {useFormik} from 'formik';
import moment from 'moment';
import {Container, Spinner} from 'native-base';
import React, {useCallback} from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {Header} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import imageAdd from '../../../assets/icon/add_image/add_image.png';
import {DatePicker} from '../../date_picker/date_picker';
import Input from '../../input/input';
import {MTPImage0} from '../../mtp_image';
import {PrimaryButton} from '../../primary_button/primary_button';
import SuccessPopUp from '../../success_pop_up/success_pop_up';
import {
  EMAIL_MAX_LENGTH,
  FACEBOOK_URL_MAX_LENGTH,
  FULLNAME_MAX_LENGTH,
  LIVING_PLACE_MAX_LENGTH,
  PHONE_MAX_LENGTH,
} from '../../../constants/app';
import {noSpaceAtEntry, numberOnly} from '../../../utility/string';
import CameraPopUp from './component/cameraPopUp/camera_pop_up';
import PopUp from './component/error_pop_up/error_pop_up';
import styles from './style';
import useEditCustomer from './use_edit_customer';

export default function EditCustomer() {
  const {
    state,
    navigation,
    updateInputValidEvent,
    onSubmitSuccess,
    goBackEvent,
    onCloseErrorPopUpEvent,
    onCloseSuccessPopUpEvent,
    onSetCanShowCameraEvent,
    onSetCanShowDatePickerEvent,
    onSetPickerDateEvent,
    onPressSelectorPopUpEvent,
  } = useEditCustomer();
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
          goBackEvent();
        }}>
        <Text style={[styles.text6]}>HỦY</Text>
      </TouchableOpacity>
    ),
    [],
  );

  const _centerComponent = useCallback(
    () => <Text style={[styles.text7]}>Chỉnh sửa thông tin khách hàng</Text>,
    [],
  );

  const initialValues = {
    avatar: state?.data?.avatar ?? '',
    fullname: state?.data?.fullname ?? '',
    mobile: state?.data?.mobile ?? '',
    yearOfBirth: state?.data?.yearOfBirth ?? '',
    email: state?.data?.email ?? '',
    currentPlace: state?.data?.currentPlace ?? '',
    facebook: state?.data?.facebook ?? '',
  };
  const validation = yup.object().shape({
    fullname: yup
      .string()
      .required('Nhập họ và tên khách hàng')
      .min(2, 'Nhập đủ họ và tên'),
    mobile: yup
      .string()
      .required('Nhập số điện thoại')
      .max(PHONE_MAX_LENGTH, 'Sai số điện thoại'),
    yearOfBirth: yup.string().nullable(),
    email: yup.string().email('Email không hợp lệ'),
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

  const _renderForm = () => {
    return (
      <View style={styles.view00}>
        <Input
          maxLength={FULLNAME_MAX_LENGTH}
          title={'Họ và tên khách hàng: '}
          required
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
        />
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
        />
        <View style={styles.view5} />
        <TouchableOpacity
          onPress={() => {
            onSetCanShowDatePickerEvent(true);
          }}>
          <Input
            pointerEvents="none"
            editable={false}
            title={'Ngày sinh: '}
            placeholder={'Nhập ngày sinh của khách hàng'}
            borderBottomColor={
              state.isYearOfBirthFocused ? '#0077be' : '#d0d0d0'
            }
            onBlur={form.handleBlur('yearOfBirth')}
            onChangeText={(value) => form.setFieldValue('yearOfBirth', value)}
            value={form.values.yearOfBirth}
            onFocus={() => updateInputValidEvent('yearOfBirth', true)}
            onEndEditing={() => updateInputValidEvent('yearOfBirth', false)}
            errorText={
              state.isYearOfBirthValid || !form.errors.yearOfBirth
                ? null
                : form.errors.yearOfBirth
            }
          />
        </TouchableOpacity>
        <View style={styles.view5} />
        <Input
          maxLength={EMAIL_MAX_LENGTH}
          title={'Email: '}
          placeholder={'Nhập email của khách hàng'}
          borderBottomColor={state.isEmailFocused ? '#0077be' : '#d0d0d0'}
          onBlur={form.handleBlur('email')}
          onChangeText={(value) => form.setFieldValue('email', value.trim())}
          value={form.values.email}
          onFocus={() => updateInputValidEvent('email', true)}
          onEndEditing={() => updateInputValidEvent('email', false)}
          errorText={
            state.isEmailValid || !form.errors.email ? null : form.errors.email
          }
        />
        <View style={styles.view5} />
        <Input
          maxLength={LIVING_PLACE_MAX_LENGTH}
          title={'Chỗ ở điện tại: '}
          placeholder={'Nhập chỗ ở của khách hàng'}
          borderBottomColor={
            state.isCurrentPlaceFocused ? '#0077be' : '#d0d0d0'
          }
          onBlur={form.handleBlur('currentPlace')}
          onChangeText={(value) =>
            form.setFieldValue('currentPlace', noSpaceAtEntry(value))
          }
          value={form.values.currentPlace}
          onFocus={() => updateInputValidEvent('currentPlace', true)}
          onEndEditing={() => updateInputValidEvent('currentPlace', false)}
          errorText={
            state.isCurrentPlaceValid || !form.errors.currentPlace
              ? null
              : form.errors.currentPlace
          }
        />
        <View style={styles.view5} />
        <Input
          maxLength={FACEBOOK_URL_MAX_LENGTH}
          title={'Facebook: '}
          placeholder={'Nhập Facebook của khách hàng'}
          borderBottomColor={state.isFacebookFocused ? '#0077be' : '#d0d0d0'}
          onBlur={form.handleBlur('facebook')}
          onChangeText={(value) => form.setFieldValue('facebook', value.trim())}
          value={form.values.facebook}
          onFocus={() => updateInputValidEvent('facebook', true)}
          onEndEditing={() => updateInputValidEvent('facebook', false)}
          errorText={
            state.isFacebookValid || !form.errors.facebook
              ? null
              : form.errors.facebook
          }
        />
      </View>
    );
  };

  // mymain
  return (
    <Container style={styles.view0}>
      <Header
        leftComponent={_leftComponent}
        centerComponent={_centerComponent}
        centerContainerStyle={styles.header1}
        containerStyle={[styles.header0]}
      />
      <KeyboardAwareScrollView
        scrollIndicatorInsets={{right: 1}}
        style={styles.keyboardAwareScrollView0}>
        <View style={styles.view1}>
          <View style={styles.view2}>
            <View style={styles.view3}>
              <View style={styles.view3}>
                {/* {form?.values?.avatar !== '' && (
                  <Image
                    style={styles.view3}
                    source={{uri: form?.values?.avatar}}
                  />
                )} */}
                <MTPImage0
                  source={state?.data?.avatar}
                  style={[styles.view3]}
                />
                <View style={styles.view4}>
                  <TouchableOpacity
                    onPress={() => {
                      onSetCanShowCameraEvent(true);
                    }}>
                    <View>
                      <Image source={imageAdd} resizeMode="contain" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        {_renderForm()}
        <View style={{flex: 1}} />
        <PrimaryButton
          title="CẬP NHẬT"
          disabled={!disableButton()}
          onPress={form.handleSubmit}
          containerStyle={{marginHorizontal: 25, marginVertical: 35}}
        />
      </KeyboardAwareScrollView>
      <DatePicker
        minimumDate={new Date('1800-01-01')}
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
      {state?.errorText && (
        <PopUp
          msg={state?.errorText ?? ''}
          buttonText={'Trở lại'}
          onPress={onCloseErrorPopUpEvent}
        />
      )}
      <CameraPopUp
        isVisible={state.canShowCamera}
        onPress={onPressSelectorPopUpEvent}
      />
      {state.isSuccess && (
        <SuccessPopUp
          msg={'Cập nhật thành công'}
          buttonText={'Xác nhận'}
          onPress={() => {
            onCloseSuccessPopUpEvent();
            navigation.navigate('CustomerInfo');
          }}
        />
      )}
      {state.isSubmitting && (
        <View style={[styles.view7]}>
          <Spinner color="#fff" />
        </View>
      )}
    </Container>
  );
}
