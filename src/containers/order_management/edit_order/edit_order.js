import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Button, Header} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextArea} from '../../input/input';
import Input, {InputService} from './component/input/input';
import useEditOrder from './hook';
import styled from 'styled-components/native';
import {getSafeStringValue, getStringLength} from '../../../utility/string';
import Loading from '../../loading/loading';
import SuccessPopUp from '../../success_pop_up/success_pop_up';
import ErrorPopUp from '../../error_pop_up/error_pop_up';
import {Container} from 'native-base';
export default function EditOrder() {
  // myhook
  const {
    state,
    navigation,
    onHandleNameMobileValueEvent,
    onNavigateEvent,
    onPressSelectStylesEvent,
    onUpdateOrderEvent,
    onSetErrorMessageEvent,
    onSetData,
    onPressSucessButtonEvent,
  } = useEditOrder();

  const _handleTotal = () => {
    let total = 0;
    state.data.services.map((el0) => {
      el0.styles.map((el1) => {
        total = el1.price + total;
      });
    });
    return total.toLocaleString('vi-VN');
  };

  return (
    <Container>
      <View0>
        <Header0
          leftComponent={
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Text0>HỦY</Text0>
            </TouchableOpacity>
          }
          centerComponent={<Text1>Chỉnh sửa đơn hàng</Text1>}
        />
        <KeyboardAwareScrollView0>
          <Input
            label={'Chọn khách hàng: '}
            value={onHandleNameMobileValueEvent()}
            onPress={() => onNavigateEvent('CustomerList1')}
          />
          <InputService0
            data={state.data.services}
            label={'Dịch vụ:'}
            onPress={onPressSelectStylesEvent}
          />
          <View1 />
          <TextArea
            value={getSafeStringValue(state.data?.note, '')}
            title={'Ghi chú đơn hàng:'}
            placeholder={'Nhập ghi chú cho đơn hàng'}
            characterCount={getStringLength(state.data?.note) + '/200'}
            onChangeText={onSetData}
          />
        </KeyboardAwareScrollView0>
        <View2>
          <Text2>{'TỔNG GIÁ TIỀN ĐƠN HÀNG'}</Text2>
          <Text3>{_handleTotal()} Đ</Text3>
        </View2>
        <Button0
          onPress={onUpdateOrderEvent}
          title={'LƯU ĐƠN HÀNG'}
          type="outline"
          disabled={state.data.services.length === 0}
        />
      </View0>
      {state.isLoading && <Loading />}
      {state.successMessage !== '' && (
        <SuccessPopUp
          msg={state.successMessage}
          buttonText="Xác nhận"
          onPress={onPressSucessButtonEvent}
        />
      )}

      {state.errorMessage !== '' && (
        <ErrorPopUp
          msg={state.errorMessage}
          buttonText="Quay lại"
          onPress={() => onSetErrorMessageEvent('')}
        />
      )}
    </Container>
  );
}

const View0 = styled(View).attrs({})`
  flex: 1;
`;
const View1 = styled(View).attrs({
  marginTop: 20,
})`
  margin-top: 20px;
`;
const View2 = styled(View).attrs({
  flexDirection: 'row',
  position: 'absolute',
  left: 25,
  right: 25,
  bottom: 90,
})``;
const Text0 = styled(Text).attrs({})`
  color: #1792e6;
  font-family: 'Nunito-Bold';
  font-size: 17px;
  line-height: 23px;
`;
const Text1 = styled(Text).attrs({})`
  color: #000;
  font-family: 'Quicksand-Bold';
  font-size: 17px;
  line-height: 21px;
`;
const Text2 = styled(Text).attrs({})`
  color: #000;
  font-family: 'Quicksand-Bold';
  font-size: 16px;
  line-height: 20px;
  text-align: left;
`;
const Text3 = styled(Text).attrs({})`
  color: #00c4ae;
  font-family: 'Quicksand-Bold';
  font-size: 16px;
  line-height: 20px;
  position: absolute;
  right: 0px;
`;
const Header0 = styled(Header).attrs({
  containerStyle: {
    backgroundColor: '#fff',
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
  },
})``;
const KeyboardAwareScrollView0 = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    paddingTop: 50,
    paddingHorizontal: 25,
  },
})``;
const InputService0 = styled(InputService).attrs({
  containerStyle: {
    marginTop: 20,
  },
})``;
const Button0 = styled(Button).attrs({
  containerStyle: {
    position: 'absolute',
    left: 25,
    right: 25,
    borderRadius: 20,
    bottom: 25,
    borderColor: '#1792e6',
    borderWidth: 2,
  },
})``;
