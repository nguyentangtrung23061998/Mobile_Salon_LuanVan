import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import styles from './style';
import {View, Text, Image} from 'react-native';
import signUpSuccess from '../../assets/icon/signUpSuccess/sign_up_success.png';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import useSignUp from './use_sign_up_success';
import {PrimaryButton} from '../primary_button/primary_button';

export default function SignUpSuccessAccount() {
  const {onPressButtonEvent} = useSignUp();
  return (
    <SafeAreaView style={[styles.safeAreaView0]}>
      <View style={[styles.view0]}>
        <Text style={[styles.text0]}>KHỞI TẠO THÀNH CÔNG!</Text>
        <Image style={[styles.image0]} source={signUpSuccess} />
        <Text style={[styles.text1]}>Bắt đầu quản lý cửa hàng của bạn</Text>
        <View style={[styles.view1]}>
          <View style={[styles.view2]}>
            <PrimaryButton title={'BẮT ĐẦU'} onPress={onPressButtonEvent} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
