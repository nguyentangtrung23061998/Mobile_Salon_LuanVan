import {Container} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Button, Header} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import editStyle from '../../assets/icon/edit_style/edit_style.png';
import Loading from '../loading/loading';
import {MTPImage0} from '../mtp_image/index';
import {MANAGER_ROLE} from '../../constants/app';
import PopUp from '../../containers/staffmanagement/staffinfo/component/popup/pop_up';
import useStyleInfoAccount from './hook';
import styles from './style';
import SuccessPopUp from '../success_pop_up/success_pop_up';
import ErrorPopUp from '../error_pop_up/error_pop_up';

export default React.memo(() => {
  // myhook
  const {
    state,
    role,
    onSetCanShowDeleteStylePopUpEvent,
    onDeleteStyleEvent,
    onGobackEvent,
    onGoToUpdateStyleEvent,
    onSetErrorMessageEvent,
    onConfirmDeleteSuccessEvent,
    _setProfile
  } = useStyleInfoAccount();

  const {styleInfoData, serviceId} = state;
  useEffect(() => {
    _setProfile();
  }, []);


  const _rightComponent = () => {
    if (state.role === MANAGER_ROLE) {
      return (
        <TouchableOpacity
          onPress={() => onSetCanShowDeleteStylePopUpEvent(true)}>
          <Text style={styles.text7}>XÓA</Text>
        </TouchableOpacity>
      );
    }
  };

  const _centerComponent = () => (
    <Text style={[styles.text4]}>Thông tin kiểu dáng</Text>
  );

  return (
    <Container>
      <View style={[styles.view0]}>
        <Header
          containerStyle={[styles.header0]}
          leftComponent={
            <TouchableOpacity onPress={onGobackEvent}>
              <Text style={[styles.text4]}>HỦY</Text>
            </TouchableOpacity>
          }
          centerComponent={_centerComponent}
          rightComponent={_rightComponent}
        />
        <View style={[styles.fastImage0]}>
          <Swiper
            key={styleInfoData?.image.length}
            paginationStyle={[styles.swiper0]}
            dotColor={'#fff'}
            activeDotColor={'#1790e9'}
            loop={false}>
            {styleInfoData?.image[0] && (
              <MTPImage0
                source={styleInfoData.image[0]}
                style={styles.fastImage0}
              />
            )}

            {styleInfoData?.image[1] && (
              <MTPImage0
                source={styleInfoData.image[1]}
                style={styles.fastImage0}
              />
            )}
            {styleInfoData?.image[2] && (
              <MTPImage0
                source={styleInfoData.image[2]}
                style={styles.fastImage0}
              />
            )}
            {styleInfoData?.image[3] && (
              <MTPImage0
                source={styleInfoData.image[3]}
                style={styles.fastImage0}
              />
            )}
          </Swiper>
        </View>
        <View style={[styles.view1]}>
          <View style={[styles.view2]}>
            <Text style={[styles.text0]}>{styleInfoData?.name ?? ''}</Text>
            <Text style={[styles.text1]}>
              {styleInfoData?.price.toLocaleString()} VNĐ
            </Text>
            {styleInfoData?.note !== '' && (
              <Text style={[styles.text2]}>Mô tả kiểu dáng:</Text>
            )}
            <Text style={[styles.text3]}>{styleInfoData?.description ?? ''}</Text>
          </View>
        </View>
        {state.role === MANAGER_ROLE && (
          <Button
            buttonStyle={[styles.button0]}
            icon={<Image source={editStyle} />}
            title={'   CHỈNH SỬA'}
            titleStyle={[styles.button1]}
            containerStyle={[styles.button2]}
            onPress={onGoToUpdateStyleEvent}
          />
        )}
      </View>
      {state.canShowDeleteStylePopUp && (
        <PopUp
          hasTopButton
          hasBottomButton
          title={'Xóa kiểu dáng này?'}
          textTitleStyle={styles.text5}
          topButtonTitle="Xóa"
          bottomButtonTitle="Hủy"
          styleTopButton={styles.view3}
          styleBottomButton={styles.view4}
          styleBottomTitle={styles.text6}
          onPressBottomButton={() => onSetCanShowDeleteStylePopUpEvent(false)}
          onPressTopButton={() => onDeleteStyleEvent(styleInfoData, serviceId)}
        />
      )}

      {state.isLoading && <Loading />}
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
    </Container>
  );
});
