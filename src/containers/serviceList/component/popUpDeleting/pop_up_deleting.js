import styles from './style';
import React from 'react';
import {Button, Overlay} from 'react-native-elements';
import {View, Text} from 'react-native';
const PopUpDeleting = ({onDelete, onCancel}) => {
  return (
    <Overlay
      isVisible={true}
      ModalComponent={() => {
        return (
          <View style={[styles.view0]}>
            <View style={[styles.view1]}>
              <Text style={[styles.text0]}>Xóa dịch vụ này?</Text>
              <Text style={[styles.text1]}>
                Mọi kiểu dáng trong dịch vụ này sẽ cũng bị xóa
              </Text>
              <Button
                title={'Xóa'}
                buttonStyle={[styles.button0]}
                titleStyle={[styles.button1]}
                onPress={onDelete}
              />
              <Button
                title={'Hủy'}
                buttonStyle={[styles.button2]}
                titleStyle={[styles.button1]}
                onPress={onCancel}
              />
            </View>
          </View>
        );
      }}
    />
  );
};

export default PopUpDeleting;
