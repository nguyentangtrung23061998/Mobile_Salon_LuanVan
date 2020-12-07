import uploadImage from '../../assets/icon/upImage/upload_image.png';
import {Container} from 'native-base';
import React, {useCallback} from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {Button, Header} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ErrorPopUp from '../error_pop_up/error_pop_up';
import Input, {TextArea} from '../input/input';
import Loading from '../loading/loading';
import {MyScrollView0} from '../my_scroll_view/my_scroll_view';
import {PrimaryButton} from '../primary_button/primary_button';
import SuccessPopUp from '../success_pop_up/success_pop_up';
import {MAX_DIGITS_PRICE, STYLE_NAME_MAX_LENGTH} from '../../constants/app';
import {separateNumberWithDot} from '../../utility/number';
import {noSpaceAtEntry} from '../../utility/string';
import {ImageView0} from '../createStyle/image_view/image_view';
import CameraPopUp from '../storeInfo/component/cameraPopUp/camera_pop_up';
import useUpdateStyle from './hook';
import styles from './style';
import reactotron from 'reactotron-react-native';
export default React.memo(() => {
  // myhook
  const {
    state,
    form,
    updateInputValidEvent,
    onPressConfirmEvent,
    onPressLeftHeaderItemEvent,
    onRemoveImagesEvent,
    onPressSelectorPopUpEvent,
    onOpenSelectorPickerEvent,
    onSetNoteEvent,
    onSetErrorMessageEvent,
  } = useUpdateStyle();

  const {errors, handleBlur, handleSubmit} = form;

  // myfunction
  const _canUploadImage = () =>
    !state.data?.image[0] ||
    !state.data?.image[1] ||
    !state.data?.image[2] ||
    !state.data?.image[3];

  const _canUpdate = () =>
    form.values.name !== '' &&
    (state.data?.image[0] ||
      state.data?.image[1] ||
      state.data?.image[2] ||
      state.data?.image[3]);

  // mysub
  const _leftComponent = useCallback(
    () => (
      <TouchableOpacity onPress={onPressLeftHeaderItemEvent}>
        <Text style={[styles.text0]}>HỦY</Text>
      </TouchableOpacity>
    ),
    [],
  );

  const _centerComponent = useCallback(
    () => <Text style={[styles.text1]}>Chỉnh sửa kiểu dáng</Text>,
    [],
  );


  // mymain
  return (
    <Container>
      <Header
        leftComponent={_leftComponent}
        centerComponent={_centerComponent}
        containerStyle={[styles.header0]}
      />
      <View style={[styles.view4]}>
        <MyScrollView0 contentContainerStyle={styles.myScrollView00}>
          <Input
            borderBottomColor={state.isStyleNameFocused ? '#0077be' : '#d0d0d0'}
            errorText={
              state.isStyleNameValid || !errors.name ? null : errors.name
            }
            maxLength={STYLE_NAME_MAX_LENGTH}
            placeholder={'Uốn đuôi chữ C'}
            title={'Tên kiểu dáng:  '}
            required
            onBlur={handleBlur('name')}
            value={form.values.name}
            onChangeText={(value) =>
              form.setFieldValue('name', noSpaceAtEntry(value))
            }
            onFocus={() => updateInputValidEvent('name', true)}
            onEndEditing={() => updateInputValidEvent('name', false)}
          />
          <View style={[styles.view6]} />
          <Input
            maxLength={MAX_DIGITS_PRICE}
            borderBottomColor={
              state.isStylePriceFocused ? '#0077be' : '#d0d0d0'
            }
            errorText={
              state.isStylePriceValid || !errors.price ? null : errors.price
            }
            keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
            placeholder={'Nhập giá tiền của kiểu dáng'}
            title={'Giá tiền:  '}
            required
            rightText={'VND'}
            onBlur={handleBlur('price')}
            value={form.values.price}
            onChangeText={(value) => {
              const value0 = value.replace(/[^-a-zA-Z0-9]+/g, '');
              const value1 = Number(value0);
              form.setFieldValue('price', separateNumberWithDot(value1));
            }}
            onFocus={() => updateInputValidEvent('price', true)}
            onEndEditing={() => updateInputValidEvent('price', false)}
          />
          <View style={[styles.view6]} />

          <TextArea
             title={'Mô tả kiểu dáng:'}
            placeholder={'Nhập ghi chú cho kiểu dáng'}
            characterCount={state.data.description.length + '/200'}
            value={form.values.description}
            onChangeText={(value) => {
              const formattedValue = noSpaceAtEntry(value);
              form.setFieldValue('description', formattedValue);
              onSetNoteEvent(formattedValue);
            }}
          />
          <View style={[styles.view6]} />
          <View style={[styles.view3]}>
            {state.data?.image[0] && (
              <ImageView0
                source={state.data?.image[0]}
                onRemove={() => onRemoveImagesEvent(0)}
              />
            )}
            {state.data?.image[0] && <View style={[styles.view2]} />}
            {state.data?.image[1] && (
              <ImageView0
                source={state.data?.image[1]}
                onRemove={() => onRemoveImagesEvent(1)}
              />
            )}
            {state.data?.image[1] && <View style={[styles.view2]} />}
            {state.data?.image[2] && (
              <ImageView0
                source={state.data?.image[2]}
                onRemove={() => onRemoveImagesEvent(2)}
              />
            )}
            {state.data?.image[2] && <View style={[styles.view2]} />}
            {state.data?.image[3] && (
              <ImageView0
                source={state.data?.image[3]}
                onRemove={() => onRemoveImagesEvent(3)}
              />
            )}

            {state.data?.image[3] && <View style={[styles.view2]} />}
            {_canUploadImage() && (
              <TouchableOpacity
                onPress={() => onOpenSelectorPickerEvent(true)}
                style={[styles.touchableOpacity0]}>
                <Image style={[styles.image2]} source={uploadImage} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.text2}>
            {'(Lưu ý: Chỉ chọn tối đa 4 tấm hình)'}
          </Text>

          <View style={{flex: 1}}></View>
          <PrimaryButton
            disabled={!_canUpdate()}
            containerStyle={[styles.button0]}
            title={'CẬP NHẬT'}
            onPress={handleSubmit}
          />
        </MyScrollView0>
      </View>
      <CameraPopUp
        onPress={onPressSelectorPopUpEvent}
        isVisible={state.canShowSelectPicker}
      />

      {state.isLoading && <Loading />}
      {state.successMessage !== '' && (
        <SuccessPopUp
          msg={state.successMessage}
          buttonText="Xác nhận"
          onPress={onPressConfirmEvent}
        />
      )}
      {state.errorMessage !== '' && (
        <ErrorPopUp
          onPress={() => onSetErrorMessageEvent('')}
          msg={state.errorMessage}
          buttonText="Quay lại"
        />
      )}
    </Container>
  );
});
