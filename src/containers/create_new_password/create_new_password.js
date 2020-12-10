import React, { useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import Input from '../input/input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import SafeAreaView from 'react-native-safe-area-view';
import styled from 'styled-components/native';
import back from '../../assets/icon/back/back.png';
import useCreateNewPassword from './hook';
import { REGISTER } from '../../constants/demo';
import * as yup from 'yup';
import { useFormik } from 'formik';
import styles from './style';

import {
  DOMAIN_NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  FULLNAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PHONE_MAX_LENGTH,
  STORE_NAME_MAX_LENGTH,
} from '../../constants/app'
const Image0 = styled(Image).attrs({
  source: back,
})``;
const SafeAreaView0 = styled(SafeAreaView).attrs({
  forceInset: { top: 'always' },
})`
  flex: 1;
  background-color: #fff;
`;
const View0 = styled(View).attrs({})`
  flex: 1;
  background-color: #fff;
`;
const TouchableOpacity0 = styled(TouchableOpacity).attrs({})`
  background-color: #fff;
  margin-left: 25px;
`;
const KeyboardAwareScrollView0 = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    paddingHorizontal: 25,
    alignItems: 'center',
    flexGrow: 1,
  },
})``;
const Text0 = styled(Text).attrs({})`
  font-family: Quicksand-Bold;
  font-size: 20px;
  line-height: 25px;
  color: #000;
  margin-top: 30px;
`;
const Text1 = styled(Text).attrs({})`
  font-family: Quicksand-Regular;
  font-size: 16px;
  line-height: 20px;
  color: #000;
  margin-top: 15px;
`;
const Text2 = styled(Text).attrs({})`
  font-family: Quicksand-Bold;
  margin-bottom: 20px;
`;
const Input0 = styled(Input).attrs({
  labelStyle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    marginBottom: 10,
  },
  containerStyle: { padding: 0 },

  inputContainerStyle: {
    borderRadius: 6,
    borderColor: '#dedede',
    borderWidth: 1,
    height: 48,
    paddingLeft: 10,
    color: '#000',
    backgroundColor: '#fcfcfc',
  },
})`
  color: #000;
  font-family: Quicksand-Regular;
  font-size: 14px;
  line-height: 18px;
  width: 100%;
  height: 100%;
`;

const Button0 = styled(Button).attrs({
  ViewComponent: LinearGradient,
  linearGradientProps: {
    colors: ['#4db1e9', '#005eff'],
    start: { x: 0, y: 1 },
    end: { x: 0, y: 0 },
  },
  containerStyle: {
    borderRadius: 20,
    position: 'absolute',
    bottom: 30,
    left: 25,
    right: 25,
  },
  titleStyle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#fff',
  },
})``;

export default function CreateNewPassword() {
  const { navigation, appState, state, updateInputValidEvent, dispatch, stateForgetPass,onSubmitSuccess } = useCreateNewPassword();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const initialValues = {
    password: appState.demo ? REGISTER.password : '',
    passwordConfirmed: appState.demo ? REGISTER.passwordConfirmed : '',
  };

  const validation = yup.object().shape({
    password: yup
      .string()
      .min(PASSWORD_MIN_LENGTH, 'Mật khẩu phải hơn 8 kí tự')
      .required('Nhập mật khẩu')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'Mật khẩu phải chứa chữ hoa, chữ thường và số'),
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
    form.values.password !== '' &&
    form.values.passwordConfirmed !== ''

  const isPW = () => {
    if( form.values.password !== form.values.passwordConfirmed){
      return false;
    }else{
      return true;
    }
  }
   
  const disableButton = () => {
    return (
      isFormValid() &&
      ( form.values.password,
        form.values.passwordConfirmed) && isPW()
    );
  };


  // render
  return (
    <SafeAreaView0>
      <TouchableOpacity0
        onPress={() => {
          navigation.goBack();
        }}>
        <Image0 />
      </TouchableOpacity0>
      <View0>
        <KeyboardAwareScrollView0
          scrollEnabled={false}
          scrollIndicatorInsets={{ right: 1 }}>
          <Text0>NHẬP MẬT KHẨU MỚI</Text0>
          <Text1>Tạo mật khẩu mới với số điện thoại</Text1>
          <Text2>{stateForgetPass.mobile}</Text2>
          {/* <Input0
            placeholder={'Nhập mật khẩu mới cho tài khoản'}
            label={'Mật khẩu mới'}
          />
          <Input0
            placeholder={'Nhập lại mật khẩu mới cho tài khoản'}
            label={'Xác nhận mật khẩu mới'}
          /> */}
          <Input
            onSubmitEditing={() => {
              passwordConfirmRef?.current?.focus();
            }}
            // returnKeyType={'next'}
            inputRef={passwordRef}
            placeholder={'Nhập mật khẩu của bạn'}
            inputContainerStyle={[styles.input0]}
            borderBottomColor={'#0077be'}
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
          <Input
            // returnKeyType={'next'}
            inputRef={passwordConfirmRef}
            placeholder={'Xác nhận mật khẩu của bạn'}
            inputContainerStyle={[styles.input0]}
            borderBottomColor={'#0077be'}
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
              form.errors.passwordConfirmed
            }
          />
          <Button0 title={'TẠO MẬT KHẨU MỚI'}
            onPress={() => {
              form.handleSubmit();
            }} 
            disabled={!disableButton()}
            />

        </KeyboardAwareScrollView0>
      </View0>
    </SafeAreaView0>
  );
}
