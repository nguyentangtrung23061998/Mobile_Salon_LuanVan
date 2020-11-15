import confirmed from '../../../../assets/icon/appointment_confirmed/appointment_confirmed.png';
import React, {useCallback} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import came from '../../../../assets/icon/appointment_camera/appointment_camera.png';
import cancelled from '../../../../assets/icon/appointment_cancel/appointment_cancel.png';
import {getStringFromIndexRange} from '../../../../utility/string';
import styles from './style';

const StyleFlatList = ({data, onPressItem}) => {
  const _keyExtractor = useCallback((item, index) => {
    return item + index;
  }, []);
  const _SectionSeparatorComponent = useCallback(() => {
    return <View style={[styles.view3]} />;
  }, []);

  const _handleImageSource = useCallback((state) => {
    switch (state) {
      case 'Đã xác nhận':
        return confirmed;
        break;
      case 'Đã đến':
        return came;
        break;
      case 'Đã hủy':
        return cancelled;
        break;
    }
  }, []);

  const _handleCustomerName = (customerName) => {
    if (customerName.length >= 22) {
      return getStringFromIndexRange(customerName, 0, 21) + '...';
    }
    return customerName;
  };
  const _handleTextStateColor = useCallback((state) => {
    switch (state) {
      case 'Đã xác nhận':
        return '#1790e9';
        break;
      case 'Đã đến':
        return '#00b181';
        break;
      case 'Đã hủy':
        return '#e91018';
        break;
    }
  }, []);

  const _onPress = useCallback((dt) => {
    onPressItem(dt);
  }, []);

  const _renderItem = useCallback((dt) => {
    const {item} = dt;
    const {code, customerName, numberCustomer, state, time} = item;
    return (
      <TouchableOpacity onPress={() => _onPress(dt)}>
        <View style={[styles.view0]}>
          <View style={[styles.view1]}>
            <View style={[styles.view4]}>
              <Image
                source={_handleImageSource(state)}
                style={[styles.image0]}
              />
            </View>
            <Text style={[styles.text1]}>{time}</Text>
          </View>
          <View style={[styles.view2]}>
            <View>
              <Text style={[styles.text2]}>#{code}</Text>
              <Text style={[styles.text3]}>
                {_handleCustomerName(customerName)}
              </Text>
              <Text style={[styles.text4]}>
                Số lượng khách: {numberCustomer}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.text5,
                  {
                    color: _handleTextStateColor(state),
                  },
                ]}>
                {state}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);
  return (
    <KeyboardAwareFlatList
      contentContainerStyle={[styles.keyboardAwareFlatList0]}
      ItemSeparatorComponent={_SectionSeparatorComponent}
      data={data}
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
      showsVerticalScrollIndicator={false}
      scrollIndicatorInsets={{right: 1}}
    />
  );
};

export default StyleFlatList;
