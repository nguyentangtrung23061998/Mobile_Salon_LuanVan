import React from 'react';
import { Image, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import { Container } from 'native-base';
import { AndroidStatusBar } from '../android_status_bar/android_status_bar';
import ImgSwiper from './component/imgSwiper/imgSwiper';
import calendarIntro from '../../assets/icon/calendar_intro/calendar_intro.png';
import introBottom from '../../assets/icon/introBottom/intro_bottom.png';
import salozoText from '../../assets/icon/salozoText/salozo_text.png';
import serviceIntro from '../../assets/icon/serviceIntro/service_intro.png';
import staffIntro from '../../assets/icon/staffIntro/staff_intro.png';

import styles from './style'

// import withHome from '../../provider/withHome';
import useIntroAccount from './user_intro';

// import useIntroAccount from './use_intro';
import withIntroAccount from './with_intro';

const Intro = () => {
  const { navigate} = useIntroAccount();
  return (
    <View style={[styles.view0]}>
      <Swiper
        loop={false}
        dotColor={'rgba(54,141,235,0.5)'}
        activeDotColor={'#1b65c3'}>
        <ImgSwiper
          image={salozoText}
          titleText={'Chào mừng bạn đến với Salozo Business'}
          descriptionText={
            'Ứng dụng quản lý Salon dành cho chủ cửa hàng và nhân viên'
          }
        />
        <ImgSwiper
          image={serviceIntro}
          topTitle={'Quản lý dịch vụ'}
          topDescription={
            'Tạo và quản lý giá cả dịch vụ của Salon để phù hợp với nhu cầu kinh doanh của bạn.'
          }
        />
        <ImgSwiper
          image={calendarIntro}
          topTitle={'Quản lý lịch đặt'}
          topDescription={'Quản lý lịch hẹn và theo dõi nhu cầu của khách hàng'}
        />
        <ImgSwiper
          image={staffIntro}
          topTitle={'Quản lý nhân viên'}
          topDescription={'Thêm và xem danh sách nhân viên cho Salon của bạn.'}
        />
      </Swiper>
      <View style={[styles.view1]}>
        <View style={[styles.view2]}>
          <Button
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#4db1e9', '#005eff'],
              start: { x: 0, y: 1 },
              end: { x: 0, y: 0 },
            }}
            containerStyle={[styles.button3]}
            title={'ĐĂNG NHẬP'}
            onPress={() => {
              navigate('VerifyDomain');
            }}
            titleStyle={[styles.button0]}
          />
          <View style={{ height: 15 }} />
          <Button
            title={'ĐĂNG KÝ'}
            onPress={() => {
              navigate('SignUpAccount');
            }}
            buttonStyle={[styles.button1]}
            titleStyle={[styles.button2]}
          />
        </View>
      </View>
      <Image source={introBottom} />
    </View>
  )
}
export default withIntroAccount(Intro);