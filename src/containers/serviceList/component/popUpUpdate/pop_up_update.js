import elecrazor from '../../../../assets/icon/elecrazor/elecrazor.png';
import hairBrush from '../../../../assets/icon/hairBrush/hair_brush.png';
import hairCurling from '../../../../assets/icon/hairCurling/hair_curling.png';
import hairCut from '../../../../assets/icon/hairCut/hair_cut.png';
import hairDye from '../../../../assets/icon/hairDye/hair_dye.png';
import hairStraighten from '../../../../assets/icon/hairStraighten/hair_straignten.png';
import lashPaint from '../../../../assets/icon/lashPaint/lashPaint.png';
import nailPolish from '../../../../assets/icon/nailPolish/nail_polish.png';
import skinCare from '../../../../assets/icon/skinCare/skin_care.png';
import specialTreatment from '../../../../assets/icon/specialTreatment/special_treatment.png';
import MyButton from '../../../mybutton/my_button.js';
import IconAdding from '../iconAdding/icon_adding.js';
import React from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Button} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import styles from './style';

const PopUpUpdate = ({
  onChangeText,
  onUpdate,
  onCancel,
  loading,
  disabled,
  disabledCancel,
  editable,
  errorText,
  serviceUpdateData,
  serviceUpdateImage,
  serviceUpdateTitle,
  onSelectImage,
}) => {
  return (
    <KeyboardAwareScrollView style={styles.keyboardAwareScrollView0}>
      <Modal isVisible={true} backdropOpacity={0.3} style={[styles.modal0]}>
        <View style={[styles.view0]}>
          <Text style={[styles.text0]}>Tạo mới dịch vụ</Text>
          <Image style={[styles.image0]} source={serviceUpdateImage} />
          <TextInput
            editable={editable}
            onChangeText={onChangeText}
            value={serviceUpdateTitle}
            style={[styles.textInput0]}
            placeholder="Nhập tên của dịch vụ"
          />
          <Animatable.Text
            animation={errorText ? 'fadeIn' : 'fadeOut'}
            style={[styles.text1]}
            duration={300}>
            {errorText}
          </Animatable.Text>
          <View style={[styles.view1]}>
            <IconAdding
              image={hairCut}
              isActive={serviceUpdateData[0].isActive}
              onPress={() => onSelectImage('hairCut')}
            />
            <IconAdding
              image={hairCurling}
              isActive={serviceUpdateData[1].isActive}
              onPress={() => onSelectImage('hairCurling')}
            />
            <IconAdding
              image={hairStraighten}
              isActive={serviceUpdateData[2].isActive}
              onPress={() => onSelectImage('hairStraighten')}
            />
            <IconAdding
              image={skinCare}
              isActive={serviceUpdateData[3].isActive}
              onPress={() => onSelectImage('skinCare')}
            />
            <IconAdding
              image={nailPolish}
              isActive={serviceUpdateData[4].isActive}
              onPress={() => onSelectImage('nailPolish')}
            />
          </View>
          <View style={[styles.view1]}>
            <IconAdding
              image={lashPaint}
              isActive={serviceUpdateData[5].isActive}
              onPress={() => onSelectImage('lashPaint')}
            />
            <IconAdding
              image={specialTreatment}
              isActive={serviceUpdateData[6].isActive}
              onPress={() => onSelectImage('specialTreatment')}
            />
            <IconAdding
              image={hairDye}
              isActive={serviceUpdateData[7].isActive}
              onPress={() => onSelectImage('hairDye')}
            />
            <IconAdding
              image={hairBrush}
              isActive={serviceUpdateData[8].isActive}
              onPress={() => onSelectImage('hairBrush')}
            />
            <IconAdding
              image={elecrazor}
              isActive={serviceUpdateData[9].isActive}
              onPress={() => onSelectImage('elecrazor')}
            />
          </View>
          <View style={[styles.view2]} />

          <Button
            title="Xác nhận"
            containerStyle={[styles.myButton0, {borderRadius: 5}]}
            buttonStyle={{backgroundColor: '#00c4ae'}}
            disabledStyle={{backgroundColor: '#00c4ae'}}
            onPress={onUpdate}
            loading={loading}
            disabled={disabled}
          />
          <View style={[styles.view3]} />
          <View style={{width: '100%'}}>
            <MyButton
              title="Hủy"
              bgColor="#004386"
              borderRadius={5}
              containerStyle={[styles.myButton0]}
              onPress={onCancel}
              disabled={disabledCancel}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
};

export default PopUpUpdate;
