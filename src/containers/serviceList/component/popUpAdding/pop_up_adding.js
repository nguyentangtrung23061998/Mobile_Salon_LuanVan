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
import Lodash from 'lodash';
import React, {useState} from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Button} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import styles from './style';
import useServiceListAccount from '../../use_service_list';
import ErrorPopUp from '../../../error_pop_up/error_pop_up';

const PopUpAdding = ({
  onSelect,
  onChangeText,
  onCreate,
  onCancel,
  loading,
  disabledCancel,
  editable,
  errorText,
}) => {
  const [data, setData] = useState([
    {isActive: true, name: 'hairCut', image: hairCut},
    {isActive: false, name: 'hairCurling', image: hairCurling},
    {isActive: false, name: 'hairStraighten', image: hairStraighten},
    {isActive: false, name: 'skinCare', image: skinCare},
    {isActive: false, name: 'nailPolish', image: nailPolish},
    {isActive: false, name: 'lashPaint', image: lashPaint},
    {isActive: false, name: 'specialTreatment', image: specialTreatment},
    {isActive: false, name: 'hairDye', image: hairDye},
    {isActive: false, name: 'hairBrush', image: hairBrush},
    {isActive: false, name: 'elecrazor', image: elecrazor},
  ]);
  const {state, onSetErrorMessageEvent} = useServiceListAccount();

  const [value, setValue] = useState('');
  const [image, setImage] = useState(hairCut);

  const _selectImage = (name) => {
    onSelect(name);
    const newData = data.slice();

    newData.forEach((el) => {
      if (el.name === name) {
        el.isActive = true;
        setImage(el.image);
      } else {
        el.isActive = false;
      }
      setData(newData);
    });
  };
  return (
    <KeyboardAwareScrollView style={styles.keyboardAwareScrollView0}>
      <Modal isVisible={true} backdropOpacity={0.3} style={[styles.modal0]}>
        <View style={[styles.view0]}>
          <Text style={[styles.text0]}>Tạo mới dịch vụ</Text>
          <Image style={[styles.image0]} source={image} />
          <TextInput
            editable={editable}
            onChangeText={(val) => {
              if (val === ' ') {
                val = val.substr(1);
              }
              onChangeText(val);
              setValue(val);
            }}
            value={value}
            style={[
              styles.textInput0,
              {color: value !== '' ? '#000' : '#8d8d8d'},
            ]}
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
              isActive={data[0].isActive}
              onPress={() => _selectImage('hairCut')}
            />
            <IconAdding
              image={hairCurling}
              isActive={data[1].isActive}
              onPress={() => _selectImage('hairCurling')}
            />
            <IconAdding
              image={hairStraighten}
              isActive={data[2].isActive}
              onPress={() => _selectImage('hairStraighten')}
            />
            <IconAdding
              image={skinCare}
              isActive={data[3].isActive}
              onPress={() => _selectImage('skinCare')}
            />
            <IconAdding
              image={nailPolish}
              isActive={data[4].isActive}
              onPress={() => _selectImage('nailPolish')}
            />
          </View>
          <View style={[styles.view1]}>
            <IconAdding
              image={lashPaint}
              isActive={data[5].isActive}
              onPress={() => _selectImage('lashPaint')}
            />
            <IconAdding
              image={specialTreatment}
              isActive={data[6].isActive}
              onPress={() => _selectImage('specialTreatment')}
            />
            <IconAdding
              image={hairDye}
              isActive={data[7].isActive}
              onPress={() => _selectImage('hairDye')}
            />
            <IconAdding
              image={hairBrush}
              isActive={data[8].isActive}
              onPress={() => _selectImage('hairBrush')}
            />
            <IconAdding
              image={elecrazor}
              isActive={data[9].isActive}
              onPress={() => _selectImage('elecrazor')}
            />
          </View>
          <View style={[styles.view2]} />

          <Button
            title="Xác nhận"
            containerStyle={[styles.myButton0, {borderRadius: 5}]}
            buttonStyle={{backgroundColor: '#00c4ae'}}
            disabledStyle={{backgroundColor: '#00c4ae'}}
            onPress={onCreate}
            loading={loading}
            disabled={Lodash.isEmpty(value)}
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
        {state.errorMessage && (
          <ErrorPopUp
            msg={state.errorMessage}
            buttonText="Quay lại"
            onPress={() => onSetErrorMessageEvent(undefined)}
          />
        )}
      </Modal>
    </KeyboardAwareScrollView>
  );
};

export default PopUpAdding;
