import React, {useEffect} from 'react';
import {Image, Text, TouchableOpacity, View, Keyboard} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import styled from 'styled-components/native';
import back from '../../assets/icon/back/back.png';
import OTPInput from './component/otp_input.js';
import useVerifyOtp from './hook';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-elements';
import reload from '../../assets/icon/reload/reload.png';
import rightArrow from '../../assets/icon/rightBlueArrow/right_blue_arrow.png';
import {setCounter, setOtp} from './state';
const SafeAreaView0 = styled(SafeAreaView).attrs({
  forceInset: {top: 'always'},
})`
  flex: 1;
  background-color: #fff;
  /* background-color: ${(props) =>
    props.primary ? 'white' : 'palevioletred'}; */
`;
const View0 = styled(View).attrs({})`
  flex: 1;
  background-color: #fff;
  align-items: center;
`;
const TouchableOpacity0 = styled(TouchableOpacity).attrs({})`
  background-color: #fff;
  margin-left: 25px;
`;
const Image0 = styled(Image).attrs({
  source: back,
})``;

const Text0 = styled(Text).attrs({})`
  font-family: Quicksand-Bold;
  font-size: 20px;
  line-height: 25px;
  color: #000;
  margin-top: 20px;
`;
const Text1 = styled(Text).attrs({})`
  font-family: Quicksand-Medium;
  font-size: 16px;
  line-height: 20px;
  color: #000;
  margin-top: 20px;
`;
const Text2 = styled(Text1).attrs({})`
  font-family: Quicksand-Bold;
`;
const Text3 = styled(Text).attrs({})`
  font-family: Quicksand-Medium;
  font-size: 16px;
  line-height: 20px;
  color: #000;
  margin-top: 30px;
`;
const Text4 = styled(Text3).attrs({})`
  color: #1790e9;
  margin-top: 20px;
  margin-bottom: 35px;
`;

const OTPInput0 = styled(OTPInput).attrs({
  containerStyle: {},
})``;
const Button0 = styled(Button).attrs({
  buttonStyle: {
    borderRadius: 18,
    borderColor: '#000',
    borderWidth: 1.5,
    backgroundColor: '#fff',
    paddingHorizontal: 70,
    paddingVertical: 10,
    marginBottom: 80,
  },
  titleStyle: {
    color: '#000',
    fontFamily: 'Quicksand-Bold',
    fontSize: 12,
    lineHeight: 15,
  },
})``;
const Button1 = styled(Button).attrs({
  buttonStyle: {
    borderRadius: 18,
    borderColor: '#1792e6',
    borderWidth: 1.5,
    backgroundColor: '#fff',
    paddingHorizontal: 70,
    paddingVertical: 10,
    width: '100%',
  },
  titleStyle: {
    color: '#1790e9',
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
    lineHeight: 20,
  },
})``;

const KeyboardAwareScrollView0 = styled(KeyboardAwareScrollView).attrs({})``;
export default function VerifyOtp() {
  const {state, navigation, dispatch} = useVerifyOtp();

  useEffect(() => {
    let timer;
    if (state.counter !== 0) {
      timer = setTimeout(() => {
        dispatch(setCounter('start'));
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [state.counter]);

  useEffect(() => {
    if (state?.otp?.length === 4) {
      Keyboard.dismiss();
    }
  }, [state.otp]);

  // render
  return (
    <SafeAreaView0>
      <TouchableOpacity0
        onPress={() => {
          navigation.goBack();
        }}>
        <Image0 />
      </TouchableOpacity0>
      <KeyboardAwareScrollView0
        scrollEnabled={false}
        keyboardShouldPersistTaps={'handled'}>
        <View0>
          <Text0>MÃ XÁC NHẬN</Text0>
          <Text1>Nhập mã xác thực đã được gửi đến số điện thoại</Text1>
          <Text2>0899500895</Text2>
          <OTPInput0
            value={state?.otp}
            onChange={(value) => {
              dispatch(setOtp(value.toString()));
            }}
          />
          <Text3>Gửi lại sau: 00:{state.counter}s</Text3>
          <TouchableOpacity>
            <Text4>Sử dụng số điện thoại khác</Text4>
          </TouchableOpacity>
          <Button0
            onPress={() => {
              dispatch(setCounter('restart'));
            }}
            icon={() => {
              return <Image source={reload} />;
            }}
            title={'   GỬI LẠI MÃ'}
            disabled={!(state.counter === 0)}
          />
          <Button1
            iconRight
            icon={() => {
              return <Image source={rightArrow} />;
            }}
            title={'TIẾP TỤC   '}
            onPress={() => {
              navigation.navigate('CreateNewPassword');
            }}
          />
        </View0>
      </KeyboardAwareScrollView0>
    </SafeAreaView0>
  );
}
