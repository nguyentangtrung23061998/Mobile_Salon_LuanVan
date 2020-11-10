import React, {useCallback} from 'react';
import {Text, View, FlatList} from 'react-native';
import styles from './style';
const ListHistory = ({data}) => {
  const _keyExtractor = useCallback((item, index) => {
    return item + index;
  }, []);
  const _renderItem = useCallback(({item, index}) => {
    const {orderNumber, timeCreated, dateCreated, total, status} = item;
    return (
      <View style={styles.view0}>
        <View style={styles.view1}>
          <View style={styles.view2}>
            <View style={styles.view4}>
              {status === 'Đã thanh toán' && (
                <View style={styles.view5}>
                  <Text style={styles.text0}>{status}</Text>
                </View>
              )}
              {status === 'Đã hủy' && (
                <View style={styles.view7}>
                  <Text style={styles.text0}>{status}</Text>
                </View>
              )}
              {status === 'Đang thực hiện' && (
                <View style={styles.view6}>
                  <Text style={styles.text0}>{status}</Text>
                </View>
              )}
              <Text style={styles.text1}>{Number(total).toLocaleString()}</Text>
            </View>
          </View>
          <View style={styles.view3} />
          <View style={styles.view2}>
            <View style={styles.view4}>
              <View style={styles.view8}>
                <Text>{timeCreated}</Text>
                <Text>{' - '}</Text>
                <Text>{dateCreated}</Text>
              </View>
              <Text style={styles.text5}>
                {orderNumber ? '#' + orderNumber : ''}
              </Text>
            </View>
          </View>
        </View>
      </View>
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
export default ListHistory;
