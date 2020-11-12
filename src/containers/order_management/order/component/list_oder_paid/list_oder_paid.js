import React, {useCallback} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {getSafeStringValue} from '../../../../../utility/string';

const ListOderPaid = ({data, onPress}) => {
  const _keyExtractor = useCallback((item, index) => {
    return item + index;
  }, []);
  const _renderItem = useCallback(({item, index}) => {
    const {orderNumber, creator, timeCreated, total, customerName} = item;

    return (
      <TouchableOpacity onPress={() => onPress(item)}>
        <View0>
          <View1>
            <View2>
              <View4>
                <View5>
                  <Text0>{orderNumber ? '#' + orderNumber : ''}</Text0>
                </View5>
                <Text1>
                  {total ? total.toLocaleString('vi-VN') + ' Đ' : ''}
                </Text1>
              </View4>
            </View2>
            <View8>
              <Text3>{getSafeStringValue(customerName, '')}</Text3>
            </View8>
            <View3 />
            <View9>
              <View4>
                <View6>
                  <Text2>{'Người tạo:'}</Text2>
                  <Text2>{creator ? creator : ''}</Text2>
                </View6>
                <View7>
                  <Text2>{'Bắt đầu: '}</Text2>
                  <Text2>{getSafeStringValue(timeCreated, '')}</Text2>
                </View7>
              </View4>
            </View9>
          </View1>
        </View0>
      </TouchableOpacity>
    );
  }, []);
  return (
    <FlatList
      renderItem={_renderItem}
      data={data}
      keyExtractor={_keyExtractor}
    />
  );
};

const View0 = styled(View).attrs({
  flex: 1,
  backgroundColor: '#ffffff',
  marginHorizontal: 25,
  marginBottom: 30,
})``;
const View1 = styled(View).attrs({
  borderColor: '#cccccc',
  borderWidth: 1,
  width: '100%',
  height: 140,
  borderRadius: 10,
  alignItems: 'center',
  paddingHorizontal: 20,
})``;
const View2 = styled(View).attrs({
  flexDirection: 'column',
  height: 70,
  width: '100%',
  justifyContent: 'center',
  marginBottom: 20,
})``;
const View9 = styled(View).attrs({
  flexDirection: 'column',
  height: 40,
  width: '100%',
  justifyContent: 'center',
})``;
const View3 = styled(View).attrs({
  borderWidth: 0.5,
  borderStyle: 'dashed',
  width: '100%',
})``;
const View4 = styled(View).attrs({
  justifyContent: 'center',
})``;
const View5 = styled(View).attrs({
  width: 110,
  height: 30,
  backgroundColor: '#1fc4ae',
  position: 'absolute',
  left: -25,
  justifyContent: 'center',
  alignItems: 'center',
})``;
const View6 = styled(View).attrs({
  flexDirection: 'row',
  position: 'absolute',
})``;
const View7 = styled(View).attrs({
  flexDirection: 'row',
  position: 'absolute',
  right: 0,
})``;
const View8 = styled(View).attrs({
  position: 'absolute',
  top: 70,
  left: 20,
})``;
const Text0 = styled(Text).attrs({})`
  font-family: 'Quicksand-Bold';
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.91px;
  text-align: center;
  color: #fff;
`;
const Text1 = styled(Text).attrs({})`
  font-family: 'Quicksand-Medium';
  color: #1fc4ae;
  font-size: 20px;
  text-align: right;
  line-height: 25px;
`;
const Text2 = styled(Text).attrs({})`
  font-family: 'Quicksand-Medium';
  color: #9b9b9b;
  font-size: 12px;
  text-align: right;
  line-height: 15px;
`;
const Text3 = styled(Text).attrs({})`
  font-family: 'Quicksand-Bold';
  color: #000;
  font-size: 14px;
  text-align: left;
  line-height: 18px;
`;
export default ListOderPaid;
