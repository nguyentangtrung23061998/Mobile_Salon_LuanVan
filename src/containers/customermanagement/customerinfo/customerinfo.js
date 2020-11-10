import {Container, Tab, Tabs, Spinner} from 'native-base';
import React, {useState, useCallback, useEffect} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {Button, Header} from 'react-native-elements';
import editColor3x from '../../../assets/icon/edit/edit_color3x.png';
import ListHistory from './component/list/list_history';
import styles from './style';
import useCustomerInfo from './use_customer_info';
import ImageView from './component/image_view/image_view';
import PopUpDelete from './component/popupdelete/pop_up_delete';
import PopUp from './component/error_pop_up/error_pop_up';
import {MTPImage0} from '../../mtp_image/index';
import back from '../../../assets/icon/back/back.png';
import SuccessPopUp from '../../success_pop_up/success_pop_up';
import {getStringFromIndexRange} from '../../../utility/string';
import reactotron from 'reactotron-react-native';

export default function CustomerInfo() {
  const {
    state,
    onNavigateEvent,
    goBackEvent,
    onSetDataEvent,
    deleteCustomerEvent,
    onCloseErrorPopUpEvent,
    navigation,
    onCloseSuccessPopUpEvent,
    getAllOrderHistoryEvent,
  } = useCustomerInfo();

  useEffect(() => {
    getAllOrderHistoryEvent(state.data.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [onShowPopUp, setonShowPopUp] = useState(false);
  const _leftComponent = useCallback(
    () => (
      <TouchableOpacity
        style={styles.touchableOpacity0}
        onPress={() => {
          goBackEvent();
        }}>
        <MTPImage0 source={back} style={styles.mTPImage0} />
      </TouchableOpacity>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const _centerComponent = useCallback(
    () => <Text style={[styles.text12]}>Thông tin khách hàng</Text>,
    [],
  );

  const _rightComponent = useCallback(
    () => (
      <TouchableOpacity
        onPress={() => {
          setonShowPopUp(true);
        }}>
        <Text style={[styles.text13]}>XÓA</Text>
      </TouchableOpacity>
    ),
    [],
  );
  const _renderFormInfo = () => {
    return (
      <View style={styles.view8}>
        <View style={styles.view7}>
          <Text style={styles.text5}>{'Ngày sinh'}</Text>
          <Text style={styles.text6}>{state?.data?.yearOfBirth ?? ''}</Text>
        </View>
        <View style={styles.view7}>
          <Text style={styles.text5}>{'Email'}</Text>
          <Text style={styles.text6}>{_handleEmail()}</Text>
        </View>
        <View style={styles.view7}>
          <Text style={styles.text5}>{'Chỗ ở hiện tại'}</Text>
          <Text style={styles.text6}>{_handleCurrentPlace()}</Text>
        </View>
        <View style={styles.view7}>
          <Text style={styles.text5}>{'Facebook'}</Text>
          <Text style={styles.text6}>{_handleFacebook()}</Text>
        </View>
      </View>
    );
  };

  const _handleFullName = () => {
    if (state?.data?.fullname.length >= 20) {
      return getStringFromIndexRange(state?.data?.fullname, 0, 19) + '...';
    }
    return state.data.fullname;
  };

  const _handleEmail = () => {
    if (state?.data?.email.length >= 25) {
      return getStringFromIndexRange(state?.data?.email, 0, 24) + '...';
    }
    return state?.data?.email;
  };

  const _handleFacebook = () => {
    if (state?.data?.facebook.length >= 25) {
      return getStringFromIndexRange(state?.data?.facebook, 0, 24) + '...';
    }
    return state?.data?.facebook;
  };

  const _handleCurrentPlace = () => {
    if (state?.data?.currentPlace.length >= 25) {
      return getStringFromIndexRange(state?.data?.currentPlace, 0, 24) + '...';
    }
    return state?.data?.currentPlace;
  };

  const _renderHistory = () => {
    return (
      <View style={styles.view10}>
        <ListHistory data={state?.dataOrder} />
      </View>
    );
  };
  

  // mymain
  return (
    <Container>
      <Header
        leftComponent={_leftComponent}
        centerComponent={_centerComponent}
        rightComponent={_rightComponent}
        containerStyle={[styles.header0]}
      />
      <View style={styles.view1}>
        <View style={styles.view2}>
          <View style={styles.view3}>
            {state?.data?.avatar !== '' && (
              <ImageView
                imageUri={state.data.avatar}
                styleImage={styles.view3}
              />
            )}
          </View>
          <View style={styles.view4}>
            <Text style={styles.text1}>{_handleFullName()}</Text>
            <Text style={styles.text2}>{state.data.mobile}</Text>
          </View>
        </View>
      </View>
      <View style={styles.view6}>
        <Container>
          <Tabs>
            <Tab
              heading="Thông tin cá nhân"
              activeTabStyle={styles.activeTabStyle0}
              activeTextStyle={styles.activeTextStyle0}
              tabStyle={styles.tabStyle0}>
              {_renderFormInfo()}
            </Tab>
            <Tab
              heading="Lịch sử"
              activeTextStyle={styles.activeTextStyle0}
              activeTabStyle={styles.activeTabStyle0}
              tabStyle={styles.tabStyle0}>
              {_renderHistory()}
            </Tab>
          </Tabs>
        </Container>
      </View>
      {onShowPopUp && (
        <PopUpDelete
          hasTopButton
          hasBottomButton
          title={'Xóa khách hàng này?'}
          textTitleStyle={styles.text9}
          topButtonTitle="Xóa"
          bottomButtonTitle="Hủy"
          styleTopButton={styles.view12}
          styleBottomButton={styles.view13}
          styleBottomTitle={styles.text10}
          onPressBottomButton={() => {
            setonShowPopUp(false);
          }}
          onPressTopButton={() => {
            deleteCustomerEvent(state?.data?.id ?? '');
            setonShowPopUp(false);
          }}
        />
      )}

      {state.isLoading && (
        <View style={styles.view14}>
          <Spinner color="#fff" />
        </View>
      )}
      {state?.errorText && (
        <PopUp
          msg={state?.errorText ?? ''}
          buttonText={'Trở lại'}
          onPress={onCloseErrorPopUpEvent}
        />
      )}
      {state.isDeleteSuccess && (
        <SuccessPopUp
          msg={'Xoá thành công'}
          buttonText={'Xác nhận'}
          onPress={() => {
            onCloseSuccessPopUpEvent();
            navigation.navigate('ListCustomer');
          }}
        />
      )}
      <Button
        title=" CHỈNH SỬA"
        type="outline"
        containerStyle={styles.button1}
        buttonStyle={styles.button2}
        icon={<Image source={editColor3x} resizeMode={'contain'} />}
        titleStyle={styles.text7}
        onPress={() => {
          onSetDataEvent(state?.data);
          onNavigateEvent('EditCustomer');
        }}
      />
    </Container>
  );
}
