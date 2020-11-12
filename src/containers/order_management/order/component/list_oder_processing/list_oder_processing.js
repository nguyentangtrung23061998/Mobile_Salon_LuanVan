import React, {useCallback} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import reactotron from 'reactotron-react-native';
import styled from 'styled-components/native';
import {getSafeStringValue} from '../../../../../utility/string';

const ListOderProcessing = ({data, onPress}) => {
  const _keyExtractor = useCallback((item, index) => {
    return item + index;
  }, []);

  const _renderItem = useCallback(({item, index}) => {
    const {orderNumber, creator, timeCreated, total, customerName} = item;
    const _handleTotal = () => {
      let total = 0;
      item.services.map((el0) => {
        el0.styles.map((el1) => {
          total = el1.price + total;
        });
      });
      return total.toLocaleString('vi-VN');
    };

    return (
      <TouchableOpacity onPress={() => onPress(item)}>
        <View0>
          <View1>
            <View2>
              <View4>
                <View5>
                  <Text0>{orderNumber ? '#' + orderNumber : ''}</Text0>
                </View5>
                <Text1>{_handleTotal()} Đ</Text1>
              </View4>
              <Text style={styles.text0}>
                {getSafeStringValue(customerName, '')}
              </Text>
            </View2>
            <View3 />
            <View2>
              <View4>
                <View6>
                  <Text2>{'Người tạo:'}</Text2>
                  <Text2>{creator ? creator : ''}</Text2>
                </View6>
                <View7>
                  <Text2>{'Bắt đầu:'}</Text2>
                  <Text2>{timeCreated ? timeCreated : ''}</Text2>
                </View7>
              </View4>
            </View2>
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
  height: 120,
  borderRadius: 10,
  alignItems: 'center',
  paddingHorizontal: 20,
})``;
const View2 = styled(View).attrs({
  flexDirection: 'column',
  height: 60,
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
  backgroundColor: '#1790e9',
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
  color: #1790e9;
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
export default ListOderProcessing;

const styles = StyleSheet.create({
  text0: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    marginTop: 10,
    marginBottom: 5,
  },
});
