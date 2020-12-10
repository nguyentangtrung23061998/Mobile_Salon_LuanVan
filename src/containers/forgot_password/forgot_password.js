import React from 'react';
import PopUp from '../popup/pop_up.js';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SafeAreaView from 'react-native-safe-area-view';
import styled from 'styled-components/native';
import back from '../../assets/icon/back/back.png';
import useforgotPassword from './hook';
import {setIsPhoneFocused, setCanShowSendPhonePopUp} from './state';
import SendOtpPopUp from './component/send_otp_pop_up';
import reactotron from 'reactotron-react-native';
const platForm = Platform.OS;
const SafeAreaView0 = styled(SafeAreaView).attrs((props) => {
  return {};
})`
  flex: 1;
  background-color: #fff;
`;
const View0 = styled(View).attrs({})`
  flex: 1;
  background-color: #fff;
  align-items: center;
`;

const Image0 = styled(Image).attrs({
  source: back,
})``;
const Text0 = styled(Text).attrs({})`
  font-family: Quicksand-Bold;
  font-size: 20px;
  line-height: 25px;
  color: #000;
  margin-bottom: 50px;
`;
const Text1 = styled(Text).attrs({})`
  font-family: Quicksand-Medium;
  font-size: 16px;
  line-height: 20px;
  color: #000;
  text-align: center;
  max-width: 80%;
  margin-bottom: 40px;
`;

const TouchableOpacity0 = styled(TouchableOpacity).attrs({})`
  background-color: #fff;
  margin-left: 25px;
`;

const KeyboardAwareScrollView0 = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 50,
    paddingBottom: 40,
    flex: 1,
  },
})``;

const Input0 = styled(Input).attrs({
  labelStyle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    marginBottom: 10,
  },

  inputContainerStyle: {
    borderRadius: 6,
    borderColor: '#dedede',
    borderWidth: 1,
    height: 48,
    paddingLeft: 10,
    color: '#000',
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
  titleStyle: {
    color: '#1790e9',
  },
  disabledStyle: {
    borderColor: '#9b9b9b',
  },
  buttonStyle: {
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: '#1792e6',
    borderWidth: 1.5,
  },
})``;
export default function ForgotPassword() {
  const {state, navigation, dispatch, form,onCloseErrorPopUpEvent} = useforgotPassword();


  // render
  return (
    <SafeAreaView0>
      {/* <TouchableOpacity0
        onPress={() => {
          navigation.goBack();
        }}>
        <Image0 />
      </TouchableOpacity0> */}
      <KeyboardAwareScrollView0
        scrollIndicatorInsets={{right: 1}}
        scrollEnabled={false}
        keyboardShouldPersistTaps={'handled'}>
        <View0>
          <Text0>ĐẶT LẠI MẬT KHẨU</Text0>
          <Text1>Nhập số điện thoại để nhận tin nhắn đặt lại mật khẩu</Text1>
          <Input0
            onBlur={form.handleBlur('phone')}
            onChangeText={(value) => {
              form.setFieldValue('phone', value);
            }}
            value={form.values.phone}
            onFocus={() => {
              dispatch(setIsPhoneFocused(true));
            }}
            onEndEditing={() => {
              dispatch(setIsPhoneFocused(false));
            }}
            errorMessage={
              state.isPhoneValid || !form.errors.phone
                ? null
                : form.errors.phone
            }
            placeholder={'Nhập số điện thoại của bạn'}
            label={'Nhập số điện thoại để khôi phục'}
            keyboardType={platForm === 'android' ? 'numeric' : 'number-pad'}
            maxLength={12}
          />
        </View0>
        <Button0
          disabled={form.values.phone === ''}
          title={'GỬI MÃ KHÔI PHỤC'}
          onPress={() => {
            dispatch(setCanShowSendPhonePopUp(true));
          }}
        />
      </KeyboardAwareScrollView0>
      <SendOtpPopUp
        isVisible={state.canShowSendPhonePopUp}
        phone={form.values.phone}
        onCancel={() => {
          dispatch(setCanShowSendPhonePopUp(false));
        }}
        onConfirm={() => {
          dispatch(setCanShowSendPhonePopUp(false));
          form.handleSubmit();
          // navigation.navigate('VerifyOtp');
        }}
      />
       <PopUp
        title={'Số điện thoại không đúng'}
        isVisible={!state.status}
        bottomButtonTitle={'Trở lại'}
        hasBottomButton={true}
        onPressBottomButton={onCloseErrorPopUpEvent}
      />
    </SafeAreaView0>
  );
}
