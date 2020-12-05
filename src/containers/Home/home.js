import calendar from '../../assets/icon/calendar/calendar.png';
import manageCustomer from '../../assets/icon/manageCustomer/manage_customer.png';
import manageService from '../../assets/icon/manageService/manage_service.png';
import manageStaff from '../../assets/icon/manageStaff/manage_staff.png';
import order from '../../assets/icon/order/order.png';
import storeInfo from '../../assets/icon/storeInfo/store_info.png';
import homeBackground from '../../assets/image/home_background/home_background.png';
import salozoText from '../../assets/image/salozo_text/salozo_text.png';
import { Container } from 'native-base';
import React,{useEffect} from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import home_order from '../../assets/icon/home_order/home_order.png';
import home_service from '../../assets/icon/home_service/home_service.png';

import { MTPImage0 } from '../mtp_image';
import { EMPLOYEE_ROLE, MANAGER_ROLE } from '../../constants/app';

import MyIcon from './component/myIcon/my_icon';
import MySalonIcon, { SalonIcon } from './component/mySalonIcon/my_salon_icon';
import useHomeAccount from './hook';
import styles from './style';
import { MyScrollView0 } from '../my_scroll_view/my_scroll_view';
import reactotron from 'reactotron-react-native';

export default React.memo(() => {
  // myhook
  const { state, _setProfile, onNavigateEvent } = useHomeAccount();

  useEffect(() =>  {
    _setProfile();
  }, []);

  const _handleStoreName = () => {
    if (state?.data?.name?.length >= 28) {
      return getStringFromIndexRange(state?.data?.name, 0, 27) + '...';
    }
    return state?.data?.name;
  };

  // mysub
  const _renderHeader = () => (
    <View style={[styles.view9]}>
      <MTPImage0 source={homeBackground} style={styles.mTPImage0} />
      <View style={[styles.view0]}>
        <MTPImage0 source={salozoText} style={[styles.image0]} />
        <Text style={[styles.text0]}>{_handleStoreName()}</Text>
      </View>
    </View>
  );

  const _renderUIByManagerRole = () => {
    if (state.data.role === MANAGER_ROLE) {
      return (
        <View style={[styles.view1]}>
          <View style={[styles.view2]}>
            <Text style={[styles.text1]}>Mario salon Sư Vạn Hạnh</Text>
            <View style={[styles.view8]}>
              <View style={[styles.view3]}>
                <MyIcon
                  imageSource={storeInfo}
                  startColor="#8896ff"
                  endColor="#263ec1"
                  label='Thông tin cửa hàng'
                  onPress={() => onNavigateEvent('StoreInfo')}
                />
                <MyIcon
                  imageSource={manageStaff}
                  startColor="#5dc9ea"
                  endColor="#003ce0"
                  label='Quản lý nhân viên'
                  onPress={() => onNavigateEvent('ListStaff')}
                />
                <MyIcon
                  imageSource={manageService}
                  startColor="#5deadf"
                  endColor="#00907a"
                  label='Quản lý dịch vụ'
                  onPress={() => onNavigateEvent('ServiceList')}
                />
                <MyIcon
                  imageSource={manageCustomer}
                  startColor="#b5ea62"
                  endColor="#00935b"
                  label='Quản lý khách hàng'
                  onPress={() => onNavigateEvent('ListCustomer')}
                />
              </View>
            </View>
          </View>
          <View style={[styles.view4]} />
          <View style={[styles.view6]} />
          <Text style={[styles.text2]}>Salon của bạn</Text>
          <View style={[styles.view5]}>
            <MySalonIcon
              imageSource={calendar}
              title='Lịch hẹn'
              description='Xem danh sách, đặt lịch hẹn'
              onPress={() => onNavigateEvent('AppointmentList')}
            />
            <View style={styles.view13} />
            <MySalonIcon
              imageSource={order}
              title='Đơn hàng'
              description='Tạo đơn hàng, thanh toán'
              onPress={() => onNavigateEvent('Order')}
            />
          </View>
        </View>
      );
    }
  };

  const _renderUIByEmployeeRole = () => {
    if (state.data.role === EMPLOYEE_ROLE && !state.data.isCashier) {
      return (
        <View style={[styles.view10]}>
          <View style={[styles.view11]}>
            <SalonIcon
              onPress={() => onNavigateEvent('ServiceList')}
              source={home_service}
              titleText='Đơn hàng'
              descriptionText='Quản lý các dịch vụ của salon'
            />
            <View style={styles.view13} />
            <SalonIcon
              imageStyle={styles.salonIcon0}
              source={calendar}
              onPress={() => onNavigateEvent('AppointmentList')}
              titleText='Lịch hẹn'
              descriptionText='Xem danh sách, đặt lịch hẹn'
            />
          </View>
        </View>
      );
    }
  };

  const _renderUIByCashierRole = () => {
    if (state.data.role === EMPLOYEE_ROLE && state.data.isCashier) {
      return (
        <View style={[styles.view10]}>
          <View style={[styles.view11]}>
            <SalonIcon
              onPress={() => onNavigateEvent('ServiceList')}
              source={home_service}
              titleText='Dịch vụ'
              descriptionText='Quản lý các dịch vụ của salon'
            />
            <View style={styles.view13} />

            <SalonIcon
              source={home_order}
              onPress={() => onNavigateEvent('Order')}
              titleText='Đơn hàng'
              descriptionText='Tạo đơn hàng, thanh toán'
            />
          </View>
          <View style={[styles.view11]} />
          <View>
            <SalonIcon
              source={calendar}
              onPress={() => onNavigateEvent('AppointmentList')}
              titleText='Lịch hẹn'
              descriptionText='Xem danh sách, đặt lịch hẹn'
            />
          </View>
        </View>
      );
    }
  };

  const _renderBody = () => (
    <MyScrollView0 contentContainerStyle={[styles.keyboardAwareScrollView0]}>
      {_renderUIByManagerRole()}
      {_renderUIByEmployeeRole()}
      {_renderUIByCashierRole()}
    </MyScrollView0>
  );

  // mymain
  return (
    <Container>
      <Header
        containerStyle={[styles.header0]}
        barStyle="dark-content"
        statusBarProps={{ backgroundColor: 'transparent' }}
      />
      <View style={[styles.view7]}>
        {_renderHeader()}
        {_renderBody()}
      </View>
    </Container>
  );
});
