import styles from './style';
import React from 'react';
import {Button, Overlay} from 'react-native-elements';
import {View, Text} from 'react-native';

const CameraPopUp = ({onPress, isVisible}) => {
  return (
    <Overlay isVisible={isVisible}>
      <View style={[styles.view0]}>
        <Text style={[styles.text0]}>Tải ảnh lên</Text>
        <View style={[styles.view1]} />
        <Button
          titleStyle={[styles.button1]}
          style={[styles.button0]}
          title={'Chụp ảnh'}
          buttonStyle={[styles.button3]}
          onPress={() => onPress('camera')}
        />
        <View style={[styles.view1]} />
        <Button
          titleStyle={[styles.button1]}
          style={[styles.button0]}
          title={'Chọn từ thư viện'}
          buttonStyle={[styles.button3]}
          onPress={() => {
            onPress('library');
          }}
        />
        <View style={[styles.view1]} />
        <Button
          titleStyle={[styles.button1]}
          style={[styles.button0]}
          title={'Hủy'}
          buttonStyle={[styles.button2]}
          onPress={() => {
            onPress('cancel');
          }}
        />
      </View>
    </Overlay>
  );
};

export default CameraPopUp;
