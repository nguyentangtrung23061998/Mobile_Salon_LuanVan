import React from 'react';
import Modal from 'react-native-modal';
import {View, Text} from 'react-native';
import styles from './style';
import MyButton from '../mybutton/my_button';

export default PopUp = ({
  hasTopButton,
  hasBottomButton,
  title,
  topButtonTitle,
  bottomButtonTitle,
  onPressTopButton,
  onPressBottomButton,
  isVisible,
}) => {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.3} style={[styles.modal0]}>
      <View style={[styles.view0]}>
        <Text style={[styles.text0]}>{title}</Text>
        <View style={{height: 50}} />
        {hasTopButton && (
          <MyButton
            onPress={onPressTopButton}
            title={topButtonTitle}
            colorType={'topToBottom'}
            startColor="#f94807"
            endColor="#f82806"
            titleStyle={[styles.myButton1]}
          />
        )}
        {hasTopButton && <View style={{height: 19}}></View>}
        {hasBottomButton && (
          <MyButton
            onPress={onPressBottomButton}
            title={bottomButtonTitle}
            containerStyle={[styles.myButton0]}
            titleStyle={[styles.myButton2]}
          />
        )}
      </View>
    </Modal>
  );
};

export const PopUpSuccess = ({title, onPressButtonSuccess, isVisible}) => {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.3} style={[styles.modal0]}>
      <View style={[styles.view0]}>
        <Text style={[styles.text0]}>{title}</Text>
        <View style={{height: 50}} />
        <MyButton
          onPress={onPressButtonSuccess}
          title="Xác nhận"
          titleStyle={[styles.myButton1]}
          containerStyle={[styles.myButton0]}
        />
      </View>
    </Modal>
  );
};

export const PopUpFail = ({title, onPressButtonFail, isVisible}) => {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.3} style={[styles.modal0]}>
      <View style={[styles.view0]}>
        <Text style={[styles.text0]}>{title}</Text>
        <View style={{height: 50}} />
        <MyButton
          onPress={onPressButtonFail}
          title="Xác nhận"
          titleStyle={[styles.myButton1]}
          containerStyle={[styles.myButton0]}
        />
      </View>
    </Modal>
  );
};

/* How to use
 <PopUp
        hasTopButton={true}
        hasBottomButton={true}
        title={'Bạn chắc chắn muốn xóa nhân viên này chứ?'}
        topButtonTitle={'aaaaaaa'}
        bottomButtonTitle="aaaa"
      /> 
*/
