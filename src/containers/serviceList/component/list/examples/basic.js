import arrowRight from '../../../../../assets/icon/arrow_right/arrow_right.png';
import deleteService from '../../../../../assets/icon/delete_service/delete_service.png';
import editService from '../../../../../assets/icon/edit_service/edit_service.png';
import elecrazor from '../../../../../assets/icon/elecrazor/elecrazor.png';
import hairBrush from '../../../../../assets/icon/hairBrush/hair_brush.png';
import hairCurling from '../../../../../assets/icon/hairCurling/hair_curling.png';
import hairCut from '../../../../../assets/icon/hairCut/hair_cut.png';
import hairDye from '../../../../../assets/icon/hairDye/hair_dye.png';
import hairStraighten from '../../../../../assets/icon/hairStraighten/hair_straignten.png';
import lashPaint from '../../../../../assets/icon/lashPaint/lashPaint.png';
import nailPolish from '../../../../../assets/icon/nailPolish/nail_polish.png';
import skinCare from '../../../../../assets/icon/skinCare/skin_care.png';
import specialTreatment from '../../../../../assets/icon/specialTreatment/special_treatment.png';
import React from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import styles from './style';

export default function Basic({
  data,
  onDelete,
  onSelectService,
  onPressUpdate,
}) {
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

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const onRowDidOpen = (rowKey) => {};
  const renderItem = (data) => {
    const {item, index} = data;
    const {id, name, imageName, amount, key} = item;
    return (
      <TouchableHighlight
        onPress={() => {
          onSelectService(data);
        }}
        style={styles.rowFront}
        underlayColor={'#AAA'}>
        <View style={[{flexDirection: 'row'}]}>
          <Image
            style={[{width: 50, height: 50}]}
            source={_renderLeftImage(imageName)}></Image>
          <View
            style={[
              {
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1,
                flexDirection: 'row',
              },
            ]}>
            <Text style={[styles.text0]}>
              {'      '}
              {name}
            </Text>
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}>
              <Text>
                {amount}
                {'          '}
              </Text>
              <Image source={arrowRight} />
            </View>
            <View
              style={{
                height: 0.8,
                backgroundColor: '#e3e3e3',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: -13,
              }}></View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {
          closeRow(rowMap, data.item.key);
          onPressUpdate(rowMap, data);
        }}>
        <Image source={editService} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          onDelete(data, rowMap);
          // deleteRow(rowMap, data.item.key);
        }}>
        <Image source={deleteService} />
      </TouchableOpacity>
    </View>
  );
  return (
    <SwipeListView
      ItemSeparatorComponent={() => (
        <View style={{width: 10, height: 14}}></View>
      )}
      disableRightSwipe
      data={data ?? []}
      renderItem={(rowData, rowMap) => {
        return renderItem(rowData, rowMap);
      }}
      renderHiddenItem={(rowData, rowMap) => {
        return renderHiddenItem(rowData, rowMap);
      }}
      leftOpenValue={75}
      rightOpenValue={-150}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      onRowDidOpen={onRowDidOpen}
    />
  );
}
