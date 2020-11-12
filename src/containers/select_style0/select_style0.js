import elecrazor from '../../assets/icon/elecrazor/elecrazor.png';
import hairBrush from '../../assets/icon/hairBrush/hair_brush.png';
import hairCurling from '../../assets/icon/hairCurling/hair_curling.png';
import hairCut from '../../assets/icon/hairCut/hair_cut.png';
import hairDye from '../../assets/icon/hairDye/hair_dye.png';
import hairStraighten from '../../assets/icon/hairStraighten/hair_straignten.png';
import lashPaint from '../../assets/icon/lashPaint/lashPaint.png';
import nailPolish from '../../assets/icon/nailPolish/nail_polish.png';
import skinCare from '../../assets/icon/skinCare/skin_care.png';
import {Container} from 'native-base';
import React, {useCallback, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {Button, CheckBox, Header} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import back from '../../assets/icon/back/back.png';
import checkBoxOff2 from '../../assets/icon/check_box_off2/check_box_off2.png';
import checkBoxOn2 from '../../assets/icon/check_box_on2/check_box_on2.png';
import collapsibleArrow from '../../assets/icon/collapsible_arrow/collapsible_arrow.png';
import specialTreatment from '../../assets/icon/specialTreatment/special_treatment.png';
import Loading from '../loading/loading';
import {MTPFlatList0} from '../mtp_flat_list/mtp_flat_list';
import {MTPImage0} from '../mtp_image/index';
import {getSafeArrayValue} from '../../utility/array';
import {getSafeStringValue} from '../../utility/string';
import useTodo from './hook';
import styles from './style';

export default React.memo(() => {
  // myhook
  const {
    state,
    onGoBackEvent,
    onGetAllServicesEvent,
    onGetStylesByServiceEvent,
    onConfirmEvent,
    onResetStateEvent,
    onSetIsServiceExpandedEvent,
    onSelectStyleEvent,
    onResetState,
  } = useTodo();
  // subs
  const _leftComponent = useCallback(
    () => (
      <TouchableOpacity
        onPress={() => {
          onGoBackEvent();
          onResetStateEvent();
        }}>
        <MTPImage0 source={back} />
      </TouchableOpacity>
    ),
    [],
  );

  const _centerComponent = useCallback(
    () => <Text style={[styles.text3]}>Danh sách dịch vụ</Text>,
    [],
  );

  const _ItemSeparatorComponent = useCallback(
    () => <View style={[styles.view3]} />,
    [],
  );
  //myuseeffect
  useEffect(() => {
    onGetAllServicesEvent();
  }, []);

  const _renderLeftImage = (imageName) => {
    switch (imageName) {
      case 'hairCut':
        return hairCut;
      case 'hairCurling':
        return hairCurling;
      case 'skinCare':
        return skinCare;
      case 'hairStraighten':
        return hairStraighten;
      case 'hairDye':
        return hairDye;
      case 'nailPolish':
        return nailPolish;
      case 'specialTreatment':
        return specialTreatment;
      case 'elecrazor':
        return elecrazor;
      case 'hairBrush':
        return hairBrush;
      case 'lashPaint':
        return lashPaint;
    }
  };

  const _renderItem2 = (dt, serviceIndex, serviceId, imageName) => {
    const {item} = dt;
    const styleIndex = dt.index;

    return (
      <Collapsible
        collapsed={!state.data[serviceIndex]['isServiceExpanded' + serviceId]}>
        <View style={[styles.view5]}>
          <View>
            <Text style={[styles.text2]}>
              {getSafeStringValue(item.name, '')}
            </Text>
          </View>
          <View style={[styles.view6]}>
            <Text style={[styles.text2]}>
              {getSafeStringValue(item.price, '')} Đ
            </Text>
            <CheckBox
              checkedIcon={<MTPImage0 source={checkBoxOn2} />}
              uncheckedIcon={<MTPImage0 source={checkBoxOff2} />}
              checked={state.data[serviceIndex].styles[styleIndex].isChecked}
              onPress={() => {
                onSelectStyleEvent(serviceIndex, styleIndex, imageName);
              }}
            />
          </View>
        </View>
      </Collapsible>
    );
  };

  const _renderItem = (data) => {
    const {item} = data;
    const serviceIndex = data.index;
    const {id, name, imageName, amount} = item;
    const serviceId = item.id;
    return (
      <TouchableOpacity
        onPress={() => {
          if (state.data[serviceIndex]['serviceAlreadyCalled' + serviceId]) {
            onSetIsServiceExpandedEvent(serviceIndex, serviceId);
          } else {
            onGetStylesByServiceEvent(serviceId);
          }
        }}>
        <View style={[styles.view0]}>
          <View>
            <MTPImage0 source={_renderLeftImage(imageName)} />
          </View>

          <View style={[styles.view4]}>
            <View style={[styles.view1]}>
              <View>
                <Text style={[styles.text0]}>{name}</Text>
              </View>
              <View style={[styles.view2]}>
                <Text style={[styles.text1]}>{amount}</Text>
                <MTPImage0
                  style={{
                    transform: [
                      {
                        rotate: state.data[serviceIndex][
                          'isServiceExpanded' + serviceId
                        ]
                          ? '90deg'
                          : '0deg',
                      },
                    ],
                  }}
                  source={collapsibleArrow}
                />
              </View>
            </View>
            <MTPFlatList0
              data={getSafeArrayValue(state.data[serviceIndex].styles)}
              renderItem={(dt) =>
                _renderItem2(dt, serviceIndex, serviceId, imageName)
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  // mymain
  return (
    <Container>
      {state.isEnabled && (
        <>
          <Header
            containerStyle={[styles.header0]}
            leftComponent={_leftComponent}
            centerComponent={_centerComponent}
          />
          <MTPFlatList0
            data={getSafeArrayValue(state.data, [])}
            renderItem={_renderItem}
            ItemSeparatorComponent={_ItemSeparatorComponent}
            contentContainerStyle={[styles.mTPFlatList00]}
          />
          <Button
            title={'HOÀN TẤT'}
            containerStyle={styles.button0}
            titleStyle={styles.button1}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#4db1e9', '#005eff'],
              start: {x: 0, y: 1},
              end: {x: 0, y: 0},
            }}
            onPress={onConfirmEvent}
          />
        </>
      )}

      {state.isLoading && <Loading />}
    </Container>
  );
});
