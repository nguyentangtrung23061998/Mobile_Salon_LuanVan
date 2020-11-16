import {useFormik} from 'formik';
import {Container} from 'native-base';
import React, {useRef} from 'react';
import {Platform, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import * as yup from 'yup';
import {HeaderNavigation} from '../../header_navigation/header_navigation';
import Input from '../../input/input';
import Loading from '../../loading/loading';
import {MyScrollView0} from '../../my_scroll_view/my_scroll_view';
import PopUp from '../../popup/pop_up';
import {PrimaryButton} from '../../primary_button/primary_button';
import SuccessPopUp from '../../success_pop_up/success_pop_up';
import {
  DOMAIN_NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  FULLNAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PHONE_MAX_LENGTH,
  STORE_NAME_MAX_LENGTH,
} from '../../../constants/app';
import {REGISTER} from '../../../constants/demo';
import {numberOnly} from '../../../utility/string';
import styles from './style';
import useSignUpAccount from './use_sign_up_account';
import withSignUpAccount from './with_sign_up_account';

const SignUpAccount = () => {
  const fullNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const storeNameRef = useRef();
  const domainNameRef = useRef();
  const appState = useSelector((rootReducer) => rootReducer.app);

  // myhook
  const {
    state,
    updateInputValidEvent,
    onSubmitSuccess,
    onCloseErrorPopUp,
    onSetSuccessMessageEvent,
    onNavigateEvent,
  } = useSignUpAccount();

  const initialValues = {
    fullName: appState.demo ? REGISTER.fullname : '',
    password: appState.demo ? REGISTER.password : '',
    domainAddress: appState.demo ? REGISTER.domainAddress : '',
    storeName: appState.demo ? REGISTER.storeName : '',
    email: appState.demo ? REGISTER.email : '',
    phone: appState.demo ? REGISTER.mobile : '',
    passwordConfirmed: appState.demo ? REGISTER.passwordConfirmed : '',
  };

  const validation = yup.object().shape({
    fullName: yup.string().required('Nhập họ và tên'),
    password: yup
      .string()
      .min(PASSWORD_MIN_LENGTH,'Mật khẩu phải hơn 8 kí tự')
      .required('Nhập mật khẩu')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'Mật khẩu phải chứa chữ hoa, chữ thường và số'),
    domainAddress: yup
      .string()
      .required('Nhập địa chỉ tên miền')
      .matches(/^[a-z][a-z0-9]*$/i, 'Tên miền không hợp lệ'),
    storeName: yup.string().required('Nhập tên cửa hàng'),
    email: yup.string().email('Email không hợp lệ'),
    phone: yup.string().required('Nhập số điện thoại'),
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
    form.values.fullName !== '' &&
    form.values.phone !== '' &&
    form.values.password !== '' &&
    form.values.passwordConfirmed !== '' &&
    form.values.storeName !== '' &&
    form.values.domainAddress !== '' &&
    form.isValid;

  const disableButton = () => {
    return (
      isFormValid() &&
      (form.values.fullName,
      form.values.phone,
      form.values.password,
      form.values.passwordConfirmed,
      form.values.storeName,
      form.values.domainAddress)
    );
  };

  // mymain
  return (
    <Container>
      <HeaderNavigation title='Đăng ký tài khoản' />
      <MyScrollView0 contentContainerStyle={styles.myScrollView00}>
        <Text style={styles.text1}>Thông tin cá nhân</Text>
        <View style={[styles.view1]}>
          <Input
            maxLength={FULLNAME_MAX_LENGTH}
            onSubmitEditing={() => {
              emailRef?.current?.focus();
            }}
            autoCapitalize="words"
            returnKeyType={'next'}
            inputRef={fullNameRef}
            inputContainerStyle={[styles.input0]}
            placeholder='Nhập tên của bạn'
            borderBottomColor={state.isFullNameFocused ? '#0077be' : '#d0d0d0'}
            title='Họ và Tên'
            titleStyle={[styles.text3]}
            required
            onBlur={form.handleBlur('fullName')}
            onChangeText={(value) => {
              form.setFieldValue(
                'fullName',
                value.replace(/^\s*\s*$/, '').replace(/  +/g, ' '),
              );
            }}
            value={form.values.fullName}
            onFocus={() => updateInputValidEvent('fullName', true)}
            onEndEditing={() => updateInputValidEvent('fullName', false)}
            errorText={
              state.isFullNameValid || !form.errors.fullName
                ? null
                : form.errors.fullName
            }
          />
          <View style={styles.view2} />
          <Input
            maxLength={EMAIL_MAX_LENGTH}
            autoCapitalize="none"
            onSubmitEditing={() => {
              phoneRef?.current?.focus();
            }}
            returnKeyType={'next'}
            inputRef={emailRef}
            placeholder='Nhập email của bạn'
            inputContainerStyle={[styles.input0]}
            borderBottomColor={state.isEmailFocused ? '#0077be' : '#d0d0d0'}
            title={'Email'}
            titleStyle={[styles.text3]}
            onBlur={form.handleBlur('email')}
            onChangeText={(value) =>
              form.setFieldValue('email', value.replace(/\s/g, '').trim())
            }
            value={form.values.email}
            onFocus={() => updateInputValidEvent('email', true)}
            onEndEditing={() => updateInputValidEvent('email', false)}
            errorText={
              state.isEmailValid || !form.errors.email
                ? null
                : form.errors.email
            }
          />
          <View style={styles.view2} />
          <Input
            inputRef={phoneRef}
            placeholder='Nhập số điện thoại của bạn'
            inputContainerStyle={[styles.input0]}
            borderBottomColor={state.isPhoneFocused ? '#0077be' : '#d0d0d0'}
            title='Số điện thoại'
            titleStyle={[styles.text3]}
            required
            maxLength={PHONE_MAX_LENGTH}
            keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
            onBlur={form.handleBlur('phone')}
            onChangeText={(value) =>
              form.setFieldValue('phone', numberOnly(value))
            }
            value={form.values.phone}
            onFocus={() => updateInputValidEvent('phone', true)}
            onEndEditing={() => updateInputValidEvent('phone', false)}
            errorText={
              state.isPhoneValid || !form.errors.phone
                ? null
                : form.errors.phone
            }
          />
          <View style={styles.view2} />
          <Text style={styles.text1}>Thông tin cửa hàng</Text>
          <Input
            onSubmitEditing={() => {
              domainNameRef?.current?.focus();
            }}
            autoCapitalize="none"
            returnKeyType={'next'}
            inputRef={storeNameRef}
            placeholder={'Nhập tên cửa hàng của bạn'}
            inputContainerStyle={[styles.input0]}
            borderBottomColor={state.isStoreNameFocused ? '#0077be' : '#d0d0d0'}
            title={'Tên cửa hàng '}
            titleStyle={[styles.text3]}
            required
            maxLength={STORE_NAME_MAX_LENGTH}
            onBlur={form.handleBlur('storeName')}
            onChangeText={(value) => {
              form.setFieldValue(
                'storeName',
                value.replace(/^\s*\s*$/, '').replace(/  +/g, ' '),
              );
            }}
            value={form.values.storeName}
            onFocus={() => updateInputValidEvent('storeName', true)}
            onEndEditing={() => updateInputValidEvent('storeName', false)}
            errorText={
              state.isStoreNameValid || !form.errors.storeName
                ? null
                : form.errors.storeName
            }
          />
          <View style={styles.view2} />
          <Input
            autoCapitalize="none"
            inputRef={domainNameRef}
            placeholder={'Nhập tên miền địa chỉ của bạn'}
            inputContainerStyle={[styles.input0]}
            borderBottomColor={
              state.isDomainNameFocused ? '#0077be' : '#d0d0d0'
            }
            title={'Tên miền địa chỉ '}
            titleStyle={[styles.text3]}
            required
            rightText={'.salozo.com'}
            rightTextStyle={styles.text0}
            maxLength={DOMAIN_NAME_MAX_LENGTH}
            onBlur={form.handleBlur('domainAddress')}
            onChangeText={(value) => {
              form.setFieldValue(
                'domainAddress',
                value.replace(/^\s*\s*$/, '').trim(),
              );
            }}
            value={form.values.domainAddress}
            onFocus={() => updateInputValidEvent('domainAddress', true)}
            onEndEditing={() => updateInputValidEvent('domainAddress', false)}
            errorText={
              state.isDomainNameValid || !form.errors.domainAddress
                ? null
                : form.errors.domainAddress
            }
          />
          <View style={styles.view2} />
          <Text style={styles.text1}>Bảo mật tài khoản</Text>
          <Input
            onSubmitEditing={() => {
              passwordConfirmRef?.current?.focus();
            }}
            returnKeyType={'next'}
            inputRef={passwordRef}
            placeholder={'Nhập mật khẩu của bạn'}
            inputContainerStyle={[styles.input0]}
            borderBottomColor={state.isPasswordFocused ? '#0077be' : '#d0d0d0'}
            title={'Mật khẩu '}
            titleStyle={[styles.text3]}
            required
            secureTextEntry={true}
            maxLength={PASSWORD_MAX_LENGTH}
            onBlur={form.handleBlur('password')}
            onChangeText={(value) => {
              form.setFieldValue('password', value.replace(/\s/g, ''));
            }}
            value={form.values.password}
            onFocus={() => updateInputValidEvent('password', true)}
            onEndEditing={() => updateInputValidEvent('password', false)}
            errorText={
              state.isPasswordValid || !form.errors.password
                ? null
                : form.errors.password
            }
          />
          <View style={styles.view2} />
          <Input
            returnKeyType={'next'}
            inputRef={passwordConfirmRef}
            placeholder={'Xác nhận mật khẩu của bạn'}
            inputContainerStyle={[styles.input0]}
            borderBottomColor={
              state.isPasswordConfirmedFocused ? '#0077be' : '#d0d0d0'
            }
            title={'Xác nhận mật khẩu '}
            titleStyle={[styles.text3]}
            required
            secureTextEntry
            maxLength={PASSWORD_MAX_LENGTH}
            onBlur={form.handleBlur('passwordConfirmed')}
            onChangeText={(value) =>
              form.setFieldValue('passwordConfirmed', value.replace(/\s/g, ''))
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
          />
          <View style={styles.view2} />
        </View>

        <PrimaryButton
          onPress={form.handleSubmit}
          title="TIẾP TỤC"
          disabled={!disableButton()}
        />
      </MyScrollView0>

      {state.isSubmitting && <Loading />}
      <PopUp
        title={state.errorText ?? ''}
        isVisible={state.errorText ?? false}
        bottomButtonTitle={'Quay lại'}
        hasBottomButton={true}
        onPressBottomButton={onCloseErrorPopUp}
      />
      {state.successMessage !== '' && (
        <SuccessPopUp
          msg={state.successMessage}
          buttonText="Xác nhận"
          onPress={() => {
            onSetSuccessMessageEvent('');
            onNavigateEvent('SignUpSuccessAccount');
          }}
        />
      )}
    </Container>
  );
};
export default withSignUpAccount(SignUpAccount);
