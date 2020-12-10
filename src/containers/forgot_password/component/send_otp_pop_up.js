import React from 'react';
import styled from 'styled-components/native';
import {View, Image, Text} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import warning from '../../../assets/icon/warning/warning.png';

const Overlay0 = styled(Overlay).attrs({})``;
const View0 = styled(View).attrs({})`
  justify-content: center;
  align-items: center;
  padding: 20px 20px 20px 20px;
`;

const Image0 = styled(Image).attrs({
  resizeMode: 'contain',
})`
  margin-bottom: 10px;
`;

const Text0 = styled(Text).attrs({})`
  font-family: Quicksand-Regular;
  font-size: 20px;
  line-height: 22px;
  letter-spacing: -0.64px;
  margin-bottom: 15px;
`;
const Text1 = styled(Text).attrs({})`
  font-family: Quicksand-Bold;
  font-size: 20px;
  line-height: 22px;
  letter-spacing: -0.064px;
  margin-bottom: 20px;
`;
const Button0 = styled(Button).attrs({
  buttonStyle: {
    backgroundColor: '#00c4ae',
    borderRadius: 5,
  },
  containerStyle: {
    width: '100%',
  },
})`
  font-family: Quicksand-Bold;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #fff;
`;
const Button1 = styled(Button0).attrs({
  containerStyle: {
    marginTop: 10,
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: '#004386',
  },
})`
  font-family: 'Quicksand-Regular';
`;

export default function SendOtpPopUp({phone, onConfirm, onCancel, isVisible}) {
  return (
    <Overlay0 isVisible={isVisible}>
      <View0>
        <Image0 source={warning} />
        <Text0>Mã xác thực sẽ được gửi về số</Text0>
        <Text1>{phone}</Text1>
        <Button0 onPress={onConfirm} title={'Gửi mã'} />
        <Button1 onPress={onCancel} title={'Hủy'} />
      </View0>
    </Overlay0>
  );
}
