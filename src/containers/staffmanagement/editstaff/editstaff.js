import { useFormik } from 'formik';
import { Container, Spinner } from 'native-base';
import React, { useCallback } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Button, CheckBox, Header } from 'react-native-elements';
import * as yup from 'yup';
import imageAdd from '../../../assets/icon/add_image/add_image.png';
import imageChangePassword from '../../../assets/icon/change_password2/change_password2.png';
import checkBoxOff from '../../../assets/icon/check_box_off/check_box_off.png';
import CheckBoxOn from '../../../assets/icon/check_box_on/check_box_on.png';
import { DatePicker } from '../../date_picker/date_picker';
import Input from '../../input/input';
import { MTPImage0 } from '../../mtp_image';
import { MyScrollView0 } from '../../my_scroll_view/my_scroll_view';
import { PrimaryButton } from '../../primary_button/primary_button';
import SuccessPopUp from '../../success_pop_up/success_pop_up';
import {
  EMAIL_MAX_LENGTH,
  FULLNAME_MAX_LENGTH,
  HOME_TOWN_PLACE_MAX_LENGTH,
  IDENTITY_MAX_LENGTH,
  JOB_POSITION_MAX_LENGTH,
  LIVING_PLACE_MAX_LENGTH,
  PHONE_MAX_LENGTH,
} from '../../../constants/app';
import { numberOnly } from '../../../utility/string';
import CameraPopUp from './component/cameraPopUp/camera_pop_up';
import PopUp from './component/error_pop_up/error_pop_up';
import PopUpChangePassword from './component/popUpChangePassword/changePassword';
import styles from './style';
import useEditStaff from './use_edit_staff';

export default function EditStaff() {
  // myhook
  const {
    state,
    showPopup,
    onShowPopup,
    onClosePopup,
    updateInputValidEvent,
    onCloseErrorPopUp,
    onSubmitSuccess,
    onChangePasswordEmployeeEvent,
    onCloseSuccessPopUpEvent,
    navigation,
    goBackEvent,
    onCloseSuccessEvent,
    onSetCanShowCameraEvent,
    onPressSelectorPopUpEvent,
    onSetCanShowDatePickerEvent,
    onPressCancelDatePickerEvent,
    onSetPickerDateEvent,
    onPressConfirmDatePickerEvent,
  } = useEditStaff();
  const _leftComponent = useCallback(
    () => (
      <TouchableOpacity
        onPress={() => {
          goBackEvent();
        }}>
        <Text style={[styles.text6]}>HỦY</Text>
      </TouchableOpacity>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const _centerComponent = useCallback(
    () => <Text style={[styles.text7]}>Chỉnh sửa thông tin nhân viên</Text>,
    [],
  );

  const initialValues = {
    fullname: state?.data?.fullname ?? '',
    position: state?.data?.position ?? '',
    isCashier: state?.data?.isCashier ?? '',
    homeTown: state?.data?.homeTown ?? '',
    yearOfBirth: state?.data?.yearOfBirth ?? '',
    currentPlace: state?.data?.currentPlace ?? '',
    identityCard: state?.data?.identityCard ?? '',
    mobile: state?.data?.mobile ?? '',
    email: state?.data?.email ?? '',
    avatar: state?.data?.avatar ?? '',
  };
  const validation = yup.object().shape({
    fullname: yup.string().required('Nhập tên nhân viên'),
    position: yup.string().required('Nhập vị trí'),
    homeTown: yup.string().nullable(),
    yearOfBirth: yup.string().nullable(),
    currentPlace: yup.string().nullable(),
    identityCard: yup.string().nullable(),
    mobile: yup.string().required('Nhập số điện thoại'),
    email: yup.string().email('Email không hợp lệ').nullable(),
  });
  const isFormValid = () =>
    form?.values?.fullname != '' &&
    form?.values?.position != '' &&
    form?.values?.mobile != '' &&
    form.isValid;

  const disableButton = () => {
    return (
      isFormValid() &&
      (form?.values?.fullname, form?.values?.position, form?.values?.mobile)
    );
  };
  const form = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: onSubmitSuccess,
  });

  const _renderForm = () => {
    return (
      <>
        <Input
          maxLength={FULLNAME_MAX_LENGTH}
          title={'Họ tên nhân viên: '}
          required
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
          maxLength={JOB_POSITION_MAX_LENGTH}
          title={'Vị trí: '}
          required
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
        />
        <View style={styles.view5} />
        <View style={styles.view7}>
          <Text style={styles.text0}>{'Nhân viên có thể thu ngân: '}</Text>
          <View style={styles.view13}>
            <CheckBox
              checkedIcon={<Image source={CheckBoxOn} style={styles.view11} />}
              uncheckedIcon={
                <Image source={checkBoxOff} style={styles.view11} />
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
          maxLength={LIVING_PLACE_MAX_LENGTH}
          title={'Nơi ở hiện tại: '}
          borderBottomColor={
            state.isCurrentPlaceFocused ? '#0077be' : '#d0d0d0'
          }
          onBlur={form.handleBlur('currentPlace')}
          onChangeText={(value) => {
            if (value === ' ') {
              value = value.substr(1);
            }
            form.setFieldValue('currentPlace', value);
          }}
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
          maxLength={EMAIL_MAX_LENGTH}
          autoCapitalize="none"
          title={'Email: '}
          borderBottomColor={state.isEmailFocused ? '#0077be' : '#d0d0d0'}
          onBlur={form.handleBlur('email')}
          onChangeText={(value) => {
            if (value === ' ') {
              value = value.substr(1);
            }
            form.setFieldValue('email', value.trim());
          }}
          value={form.values.email}
          onFocus={() => updateInputValidEvent('email', true)}
          onEndEditing={() => updateInputValidEvent('email', false)}
          errorText={
            state.isEmailValid || !form.errors.email ? null : form.errors.email
          }
        />
        <View style={styles.view5} />
        <View style={styles.view8}>
          <View style={styles.view9}>
            <Input
              maxLength={HOME_TOWN_PLACE_MAX_LENGTH}
              title={'Quê quán: '}
              borderBottomColor={state.isHowTownFocused ? '#0077be' : '#d0d0d0'}
              onBlur={form.handleBlur('homeTown')}
              onChangeText={(value) => {
                if (value === ' ') {
                  value = value.substr(1);
                }
                form.setFieldValue('homeTown', value);
              }}
              value={form.values.homeTown}
              onFocus={() => updateInputValidEvent('homeTown', true)}
              onEndEditing={() => updateInputValidEvent('homeTown', false)}
              errorText={
                state.isHowTownValid || !form.errors.homeTown
                  ? null
                  : form.errors.homeTown
              }
            />
          </View>
          <View style={styles.view10}>
            <TouchableOpacity onPress={() => onSetCanShowDatePickerEvent(true)}>
              <Input
                editable={false}
                pointerEvents="none"
                title={'Ngày sinh: '}
                borderBottomColor={
                  state.isYearOfBirthFocused ? '#0077be' : '#d0d0d0'
                }
                onBlur={form.handleBlur('yearOfBirth')}
                value={state.data.yearOfBirth}
                onFocus={() => updateInputValidEvent('yearOfBirth', true)}
                onEndEditing={() => updateInputValidEvent('yearOfBirth', false)}
                errorText={
                  state.isYearOfBirthValid || !form.errors.yearOfBirth
                    ? null
                    : form.errors.yearOfBirth
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.view5} />
        <Input
          maxLength={IDENTITY_MAX_LENGTH}
          title={'Căn cước/ CMND: '}
          keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
          borderBottomColor={
            state.isIdentityCardFocused ? '#0077be' : '#d0d0d0'
          }
          onBlur={form.handleBlur('identityCard')}
          onChangeText={(value) =>
            form.setFieldValue('identityCard', numberOnly(value))
          }
          value={form.values.identityCard}
          onFocus={() => updateInputValidEvent('identityCard', true)}
          onEndEditing={() => updateInputValidEvent('identityCard', false)}
          errorText={
            state.isIdentityCardValid || !form.errors.identityCard
              ? null
              : form.errors.identityCard
          }
        />
        <View style={styles.view5} />
        <Input
          title={'Điện thoại: '}
          required
          maxLength={PHONE_MAX_LENGTH}
          keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
          borderBottomColor={state.isMobileFocused ? '#0077be' : '#d0d0d0'}
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
        <View style={styles.view12}>
          <Button
            title=" THAY ĐỔI MẬT KHẨU"
            icon={<Image source={imageChangePassword} resizeMode={'contain'} />}
            buttonStyle={styles.mybutton0}
            titleStyle={styles.text5}
            onPress={onShowPopup}
            type={'outline'}
          />
        </View>
        <View style={styles.view6} />
      </>
    );
  };

  // mymain
  return (
    <Container style={styles.view0}>
      <Header
        leftComponent={_leftComponent}
        centerComponent={_centerComponent}
        containerStyle={[styles.header0]}
      />
      <MyScrollView0 contentContainerStyle={styles.myScrollView00}>
        <View style={styles.view1}>
          <View style={styles.view2}>
            <View style={styles.view3}>
              <MTPImage0 source={state?.data?.avatar} style={[styles.view3]} />
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
        {_renderForm()}
        <View style={{ flex: 1 }}></View>
        <PrimaryButton
          title="CẬP NHẬT"
          disabled={!disableButton()}
          onPress={form.handleSubmit}
          containerStyle={{ marginVertical: 35 }}
        />
      </MyScrollView0>
      {state?.isSubmitting && (
        <View style={[styles.view14]}>
          <Spinner color="#fff" />
        </View>
      )}
      {state.isShowPopupSuccess && (
        <SuccessPopUp
          msg={'Cập nhật thành công'}
          buttonText={'Xác nhận'}
          onPress={() => {
            onCloseSuccessPopUpEvent();
            navigation.navigate('StaffInfo');
          }}
        />
      )}
      {state.canShowSuccess && (
        <SuccessPopUp
          msg={'Đổi mật khẩu thành công'}
          buttonText={'Xác nhận'}
          onPress={() => {
            onCloseSuccessEvent();
          }}
        />
      )}
      {state?.errorText && (
        <PopUp
          msg={state?.errorText ?? ''}
          buttonText={'Trở lại'}
          onPress={onCloseErrorPopUp}
        />
      )}
      {showPopup && (
        <PopUpChangePassword
          onPressBottomButton={onClosePopup}
          onConfirm={(password) => {
            onClosePopup();
            onChangePasswordEmployeeEvent(password);
          }}
        />
      )}
      <CameraPopUp
        isVisible={state.canShowCamera}
        onPress={onPressSelectorPopUpEvent}
      />
      <DatePicker
        minimumDate={new Date('1800-01-01')}
        maximumDate={new Date()}
        isVisible={state.canShowDatePicker}
        date={
          state.dateOfDatePicker === '' ? '1995/08/16' : state.dateOfDatePicker
        }
        onPressContainer={onPressCancelDatePickerEvent}
        onDateChange={(val) => onSetPickerDateEvent(val)}
        onConfirm={(date) => onPressConfirmDatePickerEvent(date)}
      />
    </Container>
  );
}
