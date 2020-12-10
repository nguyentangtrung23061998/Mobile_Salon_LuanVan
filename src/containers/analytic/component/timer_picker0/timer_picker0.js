import styles from './style';
import {Container} from 'native-base';
import React from 'react';
import {Button} from 'react-native-elements';
import {Text} from 'react-native';

export const TimerPicker0 = React.memo(({onPress}) => {
  return (
    <Container style={styles.container0}>
      <Text>Bạn muốn xem doanh thu như thế nào</Text>
      <Button title = 'Chỉ xem hôm nay' onPress={() => onPress('current')} />
      <Button title = 'Xem theo năm' onPress={() => onPress('year')} />
      <Button title = 'Xem theo tháng' onPress={() => onPress('month')} />
      <Button title = 'Xem theo tuần' onPress={() => onPress('week')} />
    </Container>
  );
});
