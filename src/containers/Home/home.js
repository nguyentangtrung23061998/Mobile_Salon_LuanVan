import calendar from 'app/src/assets/icon/calendar/calendar.png';
import manageCustomer from 'app/src/assets/icon/manageCustomer/manage_customer.png';
import manageService from 'app/src/assets/icon/manageService/manage_service.png';
import manageStaff from 'app/src/assets/icon/manageStaff/manage_staff.png';
import order from 'app/src/assets/icon/order/order.png';
import storeInfo from 'app/src/assets/icon/storeInfo/store_info.png';
import homeBackground from 'app/src/assets/image/home_background/home_background.png';
import salozoText from 'app/src/assets/image/salozo_text/salozo_text.png';
import {Container} from 'native-base';
import React from 'react';
import {Text, View} from 'react-native';
import {Header} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import home_order from '../../assets/icon/home_order/home_order.png';
import home_service from '../../assets/icon/home_service/home_service.png';
import {MTPImage0} from '../../component/mtp_image';
import {EMPLOYEE_ROLE, MANAGER_ROLE} from '../../constant/app';
import MyIcon from './component/myIcon/my_icon';
import MySalonIcon, {SalonIcon} from './component/mySalonIcon/my_salon_icon';
import useHomeAccount from './hook';
import styles from './style';

export default React.memo(() => {
  const {state, role, isCashier, t, onNavigateEvent} = useHomeAccount();

  // subs
  const _renderHeader = () => (
    <View style={[styles.view9]}>
      <MTPImage0 source={homeBackground} resizeMode="contain" />
      <View style={[styles.view0]}>
        <MTPImage0 source={salozoText} style={[styles.image0]} />
        <Text style={[styles.text0]}>{state?.data?.name}</Text>
      </View>
    </View>
  );

  const _renderUIByManagerRole = () => {
    if (role === MANAGER_ROLE) {
      return (
        <View style={[styles.view1]}>
          <View style={[styles.view2]}>
            <Text style={[styles.text1]}>{t('text0')}</Text>
            <View style={[styles.view8]}>
              <View style={[styles.view3]}>
                <MyIcon
                  imageSource={storeInfo}
                  startColor="#8896ff"
                  endColor="#263ec1"
                  label={t('text1')}
                  onPress={() => onNavigateEvent('StoreInfo')}
                />
                <MyIcon
                  imageSource={manageStaff}
                  startColor="#5dc9ea"
                  endColor="#003ce0"
                  label={t('text2')}
                  onPress={() => onNavigateEvent('ListStaff')}
                />
                <MyIcon
                  imageSource={manageService}
                  startColor="#5deadf"
                  endColor="#00907a"
                  label={t('text3')}
                  onPress={() => onNavigateEvent('ServiceList')}
                />
                <MyIcon
                  imageSource={manageCustomer}
                  startColor="#b5ea62"
                  endColor="#00935b"
                  label={t('text4')}
                  onPress={() => onNavigateEvent('ListCustomer')}
                />
              </View>
            </View>
          </View>
          <View style={[styles.view4]} />
          <View style={[styles.view6]} />
          <Text style={[styles.text2]}>{t('text5')}</Text>
          <View style={[styles.view5]}>
            <MySalonIcon
              imageSource={calendar}
              title={t('text6')}
              description={t('text7')}
              onPress={() => onNavigateEvent('AppointmentList')}
            />
            <MySalonIcon
              imageSource={order}
              title={t('text8')}
              description={t('text9')}
              onPress={() => onNavigateEvent('Order')}
            />
          </View>
        </View>
      );
    }
  };

  const _renderUIByEmployeeRole = () => {
    if (role === EMPLOYEE_ROLE && !isCashier) {
      return (
        <View style={[styles.view10]}>
          <View style={[styles.view11]}>
            <SalonIcon
              onPress={() => onNavigateEvent('ServiceList')}
              source={home_service}
              titleText={t('text10')}
              descriptionText={t('text11')}
            />

            <SalonIcon
              source={calendar}
              onPress={() => onNavigateEvent('AppointmentList')}
              titleText={t('text6')}
              descriptionText={t('text7')}
            />
          </View>
        </View>
      );
    }
  };

  const _renderUIByCashierRole = () => {
    if (role === EMPLOYEE_ROLE && isCashier) {
      return (
        <View style={[styles.view10]}>
          <View style={[styles.view11]}>
            <SalonIcon
              onPress={() => onNavigateEvent('ServiceList')}
              source={home_service}
              titleText={t('text10')}
              descriptionText={t('text11')}
            />
            <SalonIcon
              source={home_order}
              onPress={() => onNavigateEvent('Order')}
              titleText={t('text8')}
              descriptionText={t('text9')}
            />
          </View>
          <View style={[styles.view12]} />
          <View>
            <SalonIcon
              source={calendar}
              onPress={() => onNavigateEvent('AppointmentList')}
              titleText={t('text6')}
              descriptionText={t('text7')}
            />
          </View>
        </View>
      );
    }
  };

  const _renderBody = () => (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.keyboardAwareScrollView0]}
      showsVerticalScrollIndicator={false}>
      {_renderUIByManagerRole()}
      {_renderUIByEmployeeRole()}
      {_renderUIByCashierRole()}
    </KeyboardAwareScrollView>
  );

  // main
  return (
    <Container>
      <Header
        containerStyle={[styles.header0]}
        barStyle="dark-content"
        statusBarProps={{backgroundColor: 'transparent'}}
      />
      <View style={[styles.view7]}>
        {_renderHeader()}
        {_renderBody()}
      </View>
    </Container>
  );
});
