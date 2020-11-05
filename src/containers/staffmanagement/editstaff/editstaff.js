import React, {useCallback} from 'react';
import {Image, Text, TouchableOpacity, View, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import imageAdd from '../../../assets/icon/add_image/add_image.png';
import imageChangePassword from '../../../assets/icon/change_password2/change_password2.png';
import Input from '../../input/input';
import PopUpChangePassword from './component/popUpChangePassword/changePassword';
import styles from './style';
import useEditStaff from './use_edit_staff';
import {Button, CheckBox, Header} from 'react-native-elements';
import CheckBoxOn from '../../../assets/icon/check_box_on/check_box_on.png';
import checkBoxOff from '../../../assets/icon/check_box_off/check_box_off.png';
import ImagePicker from 'react-native-image-picker';
import CameraPopUp from './component/cameraPopUp/camera_pop_up';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {Spinner} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import PopUp from './component/error_pop_up/error_pop_up';
import SuccessPopUp from '../../success_pop_up/success_pop_up';
import {Container} from 'native-base';

export default function EditStaff() {
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
    identityCard: state?.data?.identityCard?.toString() ?? '',
    mobile: state?.data?.mobile ?? '',
    email: state?.data?.email ?? '',
    avatar: state?.data?.avatar ?? '',
  };
  const validation = yup.object().shape({
    fullname: yup
      .string()
      .required('Nhập tên nhân viên')
      .min(2, 'Nhập đủ họ và tên'),
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

  // function
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

  const _renderForm = () => {
    return (
      <View style={styles.view00}>
        <Input
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
          title={'Nơi ở hiện tại: '}
          maxLength={50}
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
              title={'Quê quán: '}
              maxLength={25}
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
            <Input
              title={'Năm sinh: '}
              maxLength={4}
              keyboardType={
                Platform.OS === 'android' ? 'numeric' : 'number-pad'
              }
              borderBottomColor={
                state.isYearOfBirthFocused ? '#0077be' : '#d0d0d0'
              }
              onBlur={form.handleBlur('yearOfBirth')}
              onChangeText={(value) => {
                if (value === ' ') {
                  value = value.substr(1);
                }
                form.setFieldValue('yearOfBirth', value);
              }}
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
        </View>
        <View style={styles.view5} />
        <Input
          title={'Căn cước/ CNMD: '}
          maxLength={12}
          keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
          borderBottomColor={
            state.isIdentityCardFocused ? '#0077be' : '#d0d0d0'
          }
          onBlur={form.handleBlur('identityCard')}
          onChangeText={(value) => {
            if (value === ' ') {
              value = value.substr(1);
            }
            form.setFieldValue('identityCard', value);
          }}
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
          maxLength={12}
          keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
          borderBottomColor={state.isMobileFocused ? '#0077be' : '#d0d0d0'}
          onBlur={form.handleBlur('mobile')}
          onChangeText={(value) => {
            if (value === ' ') {
              value = value.substr(1);
            }
            form.setFieldValue('mobile', value);
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
        <Button
          title="LƯU CHỈNH SỬA"
          buttonStyle={styles.mybutton1}
          titleStyle={styles.text4}
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
    );
  };

  return (
    <Container style={styles.view0}>
      <Header
        leftComponent={_leftComponent}
        centerComponent={_centerComponent}
        containerStyle={[styles.header0]}
      />
      <KeyboardAwareScrollView style={styles.keyboardAwareScrollView0}>
        <View style={styles.view1}>
          <View style={styles.view2}>
            <View style={styles.view3}>
              {/* {form?.values?.avatar !== '' && (
                <Image
                  style={styles.view3}
                  source={{uri: form?.values?.avatar}}
                />
              )} */}
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
      </KeyboardAwareScrollView>
      {state?.isSubmitting && (
        <View style={[styles.view14]}>
          <Spinner color="#fff" />
        </View>
      )}
      {state.isShowPopupSuccess && (
        <SuccessPopUp
          msg={'Chỉnh sửa thành công'}
          buttonText={'Xác nhận'}
          onPress={() => {
            onCloseSuccessPopUpEvent();
            navigation.navigate('ListStaff');
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
      <CameraPopUp isVisible={state.canShowCamera} onPress={_onPressCamera} />
    </Container>
  );
}
