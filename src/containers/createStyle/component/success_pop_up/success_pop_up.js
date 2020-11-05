import React from 'react';
import {Button} from 'react-native-elements';
import styles from './style';
import {View} from 'react-native';
const SuccessPopUp = ({successTitle}) => {
  return (
    <View style={[styles.view0]} animation={'fadeIn'} duration={4000}>
      <Button
        title={successTitle ? successTitle : 'Tạo thành công!'}
        buttonStyle={[styles.button0]}
        containerStyle={[styles.button1]}
      />
    </View>
  );
};

export default SuccessPopUp;
