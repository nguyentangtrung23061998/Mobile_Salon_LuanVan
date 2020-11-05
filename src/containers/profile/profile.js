import AsyncStorage from '@react-native-community/async-storage';
import {Container} from 'native-base';
import React, {useCallback} from 'react';
import {Text, View} from 'react-native';
import {Header} from 'react-native-elements';
import arrowRightGray from '../../assets/icon/arrow_right_gray/arrow_right_gray.png';
import changePassword from '../../assets/icon/change_password/change_password.png';
import logOut from '../../assets/icon/log_out/log_out.png';
import userInfo from '../../assets/icon/user_info/user_info.png';
import {MTPImage0} from '../mtp_image/index';
import {MANAGER_ROLE} from '../../constants/app';
import {setAuth} from '../../reducers/app';
import Button from './component/button/button';
import styles from './style';
import useProfileAccount from './use_profile';

const ProfileAccount = () => {
  const {state, role, dispatch, onNavigateEvent} = useProfileAccount();
  const clearLocalData = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('storeInfo');
    onNavigateEvent("Intro");
  };

  // mysub
  const _centerComponent = useCallback(
    () => <Text style={[styles.text3]}>Tài khoản cá nhân</Text>,
    [],
  );

  // mymain
  return (
    <Container>
      <Header
        containerStyle={[styles.header0]}
        centerComponent={_centerComponent}
      />
      <View style={[styles.view0]}>
        <View style={[styles.view1]}>
          <MTPImage0 style={[styles.fastImage0]} source={state.data?.avatar} />
          <View style={[styles.view2]}>
            <Text style={[styles.text0]}>{state?.data?.fullname ?? ''}</Text>
            <Text style={[styles.text1]}>{state?.data?.email ?? ''}</Text>
            <Text style={[styles.text2]}>
              {role === MANAGER_ROLE ? 'Quản lí' : 'Nhân viên'}
            </Text>
          </View>
        </View>
        <Button
          containerStyle={[styles.button3]}
          leftImg={userInfo}
          title={'Thông tin cá nhân'}
          rightImg={arrowRightGray}
          onPress={() => onNavigateEvent('EditProfile')}
        />
        <Button
          onPress={() => onNavigateEvent('ChangePassword')}
          containerStyle={[styles.button0]}
          leftImg={changePassword}
          title={'Đổi mật khẩu'}
          rightImg={arrowRightGray}
        />
        <Button
          onPress={() => {
            clearLocalData();
            dispatch(setAuth(false));
          }}
          textStyle={[styles.button2]}
          containerStyle={[styles.button1]}
          leftImg={logOut}
          title={'Đăng xuất'}
        />
      </View>
    </Container>
  );
};
export default ProfileAccount;
