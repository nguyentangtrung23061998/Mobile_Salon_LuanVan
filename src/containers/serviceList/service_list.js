import arrowRight from '../../assets/icon/arrow_right/arrow_right.png';
import plus from '../../assets/icon/plus/plus.png';
import emptyService from '../../assets/image/empty_service/empty_service.png';
import List from '../serviceList/component/list/example.js';
import PopUpAdding from './component/popUpAdding/pop_up_adding.js';
import PopUpDeleting from './component/popUpDeleting/pop_up_deleting.js';
import Lodash from 'lodash';
import {Container} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Button, Header} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import back from '../../assets/icon/back/back.png';
import ErrorPopUp from '../error_pop_up/error_pop_up';
import Loading from '../loading/loading';
import {MANAGER_ROLE} from '../../constants/app';
import PopUpUpdate from './component/popUpUpdate/pop_up_update';
import styles from './style';
import useServiceListAccount from './use_service_list';
import SuccessPopUp from '../success_pop_up/success_pop_up';
import {setServiceStyleList0} from '../styleList/with_style_list';
import reactotron from 'reactotron-react-native';

export default React.memo(() => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [canShowDeletePopUp, setCanShowDeletePopUp] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [canUpdate, setCanUpdate] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');

  const {
    state,
    role,
    updateServiceUpdateTitleEvent,
    onGetAllServicesEvent,
    deleteServiceEvent,
    onNavigateEvent,
    updateServiceEvent,
    getUpdateServiceDataEvent,
    onCreateServiceEvent,
    onGoBackEvent,
    onSetErrorMessageEvent,
    onSetCanShowPopUpAddingEvent,
    onResetStateEvent,
    onSetCanAddEvent,
    onCloseSuccessPopUpEvent,
    dispatch,
  } = useServiceListAccount();

  const {
    isLoading,
    isLoadingUpdate,
    data,
    isSuccess,
    errorMessage,
    canShowPopUpAdding,
    isShowPopupSuccess,
    isDeleteSuccess,
  } = state;

  const onUpdate = () => {
    let newData = [...state.serviceUpdateData];
    let newServiceData = newData.filter((el) => el.isActive)?.[0];
    const finalNewService = {
      ...newServiceData,
      title: state.serviceUpdateTitle,
      image: state.serviceUpdateImage,
    };
    updateServiceEvent(
      finalNewService.id,
      finalNewService.title,
      finalNewService.name,
    );
  };
  const onChangeText = (value) => {
    updateServiceUpdateTitleEvent(value);
  };
  const onCancel = () => {
    setCanUpdate(false);
  };
  const onSelectImage = (imageName) => {
    let newData = {...selectedService};
    newData.imageName = imageName;
    newData.name = state.serviceUpdateTitle;
    getUpdateServiceDataEvent(newData);
  };
  const _createService = () => {
    if (name === '') {
      onSetCanAddEvent(false);
    } else {
      onSetCanAddEvent(true);
      onCreateServiceEvent(name, image === '' ? 'hairCut' : image);
    }
  };

  useEffect(() => {
    onGetAllServicesEvent();
  }, []);

  // subs
  const _leftComponent = useCallback(
    () => (
      <TouchableOpacity
        style={styles.touchableOpacity0}
        onPress={() => {
          onGoBackEvent();
          onResetStateEvent();
        }}>
        <Container style={styles.container0}>
          <Image source={back} />
        </Container>
      </TouchableOpacity>
    ),
    [],
  );

  const _centerComponent = useCallback(
    () => <Text style={[styles.text1]}>Danh sách dịch vụ</Text>,
    [],
  );

  const _renderList = useCallback(
    () => (
      <View style={[styles.view12]}>
        <List
          onSelectService={(dt) => {
            dispatch(setServiceStyleList0({value: dt.item.name}));
            onNavigateEvent('StyleList', dt);
          }}
          data={state.data}
          rightImage={arrowRight}
          // onDelete={(dt, _) => {
          //   const {item} = dt;
          //   reactotron.log('item id',item)
            
          //   setSelectedId(dt?.item?.id ?? '');
          //   setSelectedAmount(dt?.item?.amount ?? '');
          //   if (dt.item.amount === 0) {
          //     setCanShowDeletePopUp(false);
          //     deleteServiceEvent(selectedId);
          //   } else {
          //     setCanShowDeletePopUp(true);
          //   }
          // }}
          onDelete={(dt, _) => {
            setSelectedId(dt?.item?.id ?? '');
            setSelectedAmount(dt?.item?.amount ?? '');
            if (dt.item.amount === 0) {
              setCanShowDeletePopUp(false);
              deleteServiceEvent(dt.item.id);
            } else {
              setCanShowDeletePopUp(true);
            }
          }}
          onPressUpdate={(_, dt) => {
            const {item} = dt;
            setSelectedService(item);
            getUpdateServiceDataEvent(item);
            setCanUpdate(true);
          }}
        />
      </View>
    ),
    [state?.data],
  );

  const _renderEmpty = useCallback(
    () => (
      <View style={[styles.view0]}>
        <Image source={emptyService} />
        <Text style={[styles.text0]}>
          Hãy tạo mới loại hình dịch vụ để khách hàng có thể chọn lựa bạn nhé.
        </Text>
      </View>
    ),
    [],
  );

  // main
  return (
    <Container>
      {state.isEnabled && (
        <Header
          containerStyle={[styles.header0]}
          leftComponent={_leftComponent}
          centerComponent={_centerComponent}
        />
      )}

      <View style={[styles.view11]}>
        <View style={[styles.view2]}>
          {data?.length === 0 && isSuccess ? _renderEmpty() : _renderList()}
        </View>
        {role === MANAGER_ROLE && state.isEnabled && (
          <Button
            icon={<Image source={plus} />}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#4db1e9', '#005eff'],
              start: {x: 0, y: 1},
              end: {x: 0, y: 0},
            }}
            title={'  TẠO MỚI DỊCH VỤ'}
            onPress={() => onSetCanShowPopUpAddingEvent(true)}
            titleStyle={[styles.button0]}
            containerStyle={[styles.button1]}
          />
        )}
        {canShowPopUpAdding && (
          <PopUpAdding
            editable={!state.isLoadingCreate}
            disabledCancel={state.isLoadingCreate}
            errorText={state.canAdd ? null : 'Nhập tên dịch vụ'}
            onSelect={(img) => setImage(img)}
            onChangeText={(n) => setName(n)}
            onCreate={() => {
              onSetCanShowPopUpAddingEvent(false);
              _createService();
            }}
            onCancel={() => onSetCanShowPopUpAddingEvent(false)}
          />
        )}
        {canShowDeletePopUp && (
          <PopUpDeleting
            onDelete={() => {
              setCanShowDeletePopUp(false);
              deleteServiceEvent(selectedId);
            }}
            onCancel={() => setCanShowDeletePopUp(false)}
          />
        )}
        {canUpdate && (
          <PopUpUpdate
            disabled={Lodash.isEmpty(state.serviceUpdateTitle)}
            serviceUpdateData={state.serviceUpdateData}
            serviceUpdateImage={state.serviceUpdateImage}
            serviceUpdateTitle={state.serviceUpdateTitle}
            onChangeText={onChangeText}
            onSelectImage={onSelectImage}
            onCancel={onCancel}
            onUpdate={() => {
              onCancel();
              onUpdate();
            }}
          />
        )}
      </View>
      {(isLoading || isLoadingUpdate) && <Loading />}
      {errorMessage && (
        <ErrorPopUp
          msg={errorMessage}
          buttonText="Xác nhận"
          onPress={() => onSetErrorMessageEvent(undefined)}
        />
      )}
      {isDeleteSuccess && (
        <SuccessPopUp
          msg={'Xoá thành công'}
          buttonText={'Xác nhận'}
          onPress={() => {
            onCloseSuccessPopUpEvent();
          }}
        />
      )}
      {isShowPopupSuccess && (
        <SuccessPopUp
          msg={'Chỉnh sửa thành công'}
          buttonText={'Xác nhận'}
          onPress={() => {
            onCloseSuccessPopUpEvent();
          }}
        />
      )}
    </Container>
  );
});
