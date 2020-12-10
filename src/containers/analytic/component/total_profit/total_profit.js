import styles from './style';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default React.memo(({total, onPress}) => {
  return (
    <View style={styles.view2}>
      <View style={styles.view0}>
        <Text>08/10/2020</Text>
        <TouchableOpacity onPress={onPress}>
          <Text>Chọn</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.view1}>
        <Text>Tổng doanh thu</Text>
        <Text>{total?.toLocaleString()} Đ</Text>
      </View>
    </View>
  );
});
