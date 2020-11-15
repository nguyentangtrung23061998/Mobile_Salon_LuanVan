import { useNavigation } from '@react-navigation/native';
import { Spinner } from 'native-base';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Button, Header } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import SafeAreaView from 'react-native-safe-area-view';
import Swiper from 'react-native-swiper';
import editStyle from '../../assets/icon/edit_style/edit_style.png';
import { MANAGER_ROLE } from '../../constants/app';
import useUpdateStyle from '../update_style/hook';
import styles from './style';
import useStyleInfoAccount from './use_style_info';
import PopUp from '../staffmanagement/staffinfo/component/popup/pop_up';
const StyleInfoAccount = () => {
  const navigation = useNavigation();
  const {
    deleteStyleEvent,
    state,
    role,
    onShowPopUp,
    setonShowPopUp,
  } = useStyleInfoAccount();
  const { styleInfoData, serviceId } = state;
  const { sendUpdateStyleDataEvent } = useUpdateStyle();

  const _rightComponent = () => {
    if (role === MANAGER_ROLE) {
      return (
        <TouchableOpacity
          onPress={() => {
            setonShowPopUp(true);
          }}>
          <Text style={[styles.text4]}>XÓA</Text>
        </TouchableOpacity>
      );
    }
  };
  return (
    <SafeAreaView forceInset={{ top: 'never' }} style={[styles.safeAreaView0]}>
      <View style={[styles.view0]}>
        <Header
          containerStyle={[styles.header0]}
          leftComponent={
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={[styles.text4]}>HỦY</Text>
            </TouchableOpacity>
          }
          centerComponent={
            <Text style={[styles.text4]}>Thông tin kiểu dáng</Text>
          }
          rightComponent={_rightComponent}
        />
        <View style={[styles.fastImage0]}>
          <Swiper
            paginationStyle={[styles.swiper0]}
            dotColor={'#fff'}
            activeDotColor={'#1790e9'}
            loop={false}>
            {styleInfoData?.image[0] && (
              <FastImage
                style={[styles.fastImage0]}
                source={{
                  uri: styleInfoData?.image[0],
                }}
                resizeMode={FastImage.resizeMode.stretch}
              />
            )}
            {styleInfoData?.image[1] && (
              <FastImage
                style={[styles.fastImage0]}
                source={{
                  uri: styleInfoData?.image[1],
                }}
                resizeMode={FastImage.resizeMode.stretch}
              />
            )}
            {styleInfoData?.image[2] && (
              <FastImage
                style={[styles.fastImage0]}
                source={{
                  uri: styleInfoData?.image[2],
                }}
                resizeMode={FastImage.resizeMode.stretch}
              />
            )}
            {styleInfoData?.image[3] && (
              <FastImage
                style={[styles.fastImage0]}
                source={{
                  uri: styleInfoData?.image[3],
                }}
                resizeMode={FastImage.resizeMode.stretch}
              />
            )}
          </Swiper>
        </View>
        <View style={[styles.view1]}>
          <View style={[styles.view2]}>
            <Text style={[styles.text0]}>{styleInfoData?.name ?? ''}</Text>
            <Text style={[styles.text1]}>{styleInfoData?.price ?? ''} VNĐ</Text>
            {styleInfoData?.description !== '' && (
              <Text style={[styles.text2]}>Mô tả kiểu dáng:</Text>
            )}
            <Text style={[styles.text3]}>
              {styleInfoData?.description ?? ''}
            </Text>
          </View>
        </View>
        {role === MANAGER_ROLE && (
          <Button
            buttonStyle={[styles.button0]}
            icon={<Image source={editStyle} />}
            title={'   CHỈNH SỬA KIỂU DÁNG'}
            titleStyle={[styles.button1]}
            containerStyle={[styles.button2]}
            onPress={() => {
              sendUpdateStyleDataEvent(serviceId, styleInfoData);
              navigation.navigate('UpdateStyle');
            }}
          />
        )}
      </View>
      {state.canShowDeleteStylePopUp && (
        <PopUp
          isVisible={onShowPopUp}
          hasTopButton
          hasBottomButton
          title={'Xóa kiểu dáng này?'}
          textTitleStyle={styles.text5}
          topButtonTitle="Xóa"
          bottomButtonTitle="Hủy"
          styleTopButton={styles.view3}
          styleBottomButton={styles.view4}
          styleBottomTitle={styles.text6}
          onPressBottomButton={() => {
            setonShowPopUp(false);
          }}
          onPressTopButton={() => {
            deleteStyleEvent(styleInfoData, serviceId);
            setonShowPopUp(false);
          }}
        />
      )}
      {state.isLoading && (
        <View style={[styles.view5]}>
          <Spinner color="#fff" />
        </View>
      )}
      {state.successMessage && (
        <SuccessPopUp
          msg={state.successMessage}
          buttonText='Xác nhận'
          onPress={onConfirmDeleteSuccessEvent}
        />
      )}

      {state.errorMessage && (
        <ErrorPopUp
          msg={state.errorMessage}
          buttonText='Xác nhận'
          onPress={() => onSetErrorMessageEvent(null)}
        />
      )}
    </SafeAreaView>
  );
};
export default StyleInfoAccount;
