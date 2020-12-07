import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import reactotron from 'reactotron-react-native';
import * as yup from 'yup';
import {updateStyleApi} from '../../api/index';
import {getSafeString} from '../../utility/string';
import {editStyleList} from '../styleList/with_style_list';
import {updateStyleInfoData} from '../style_info/state';
import {
  getImagePath,
  setData,
  setErrorMessage,
  setSuccessMessage,
  updateInputValid,
  updateStyle,
  updateStyleFaild,
  updateStyleLoading,
  updateStyleSuccess,
  setCanShowSelectPicker,
  setData0,
  setData2,
  setData3,
} from './state';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker0 from 'react-native-image-picker';
import {Platform} from 'react-native';

const useTodo = () => {
  const state = useSelector((rootReducer) => rootReducer.updateStyle);
  const navigation = useNavigation();

  const onGoBackEvent = () => navigation.goBack();

  const {data} = state;
  const dispatch = useDispatch();
  const initialValues = {
    name: getSafeString(state.data.name, ''),
    price: state.data.price.toLocaleString(),
    description: getSafeString(state.data.description, ''),
  };
  const validation = yup.object().shape({
    name: yup.string().required('Nhập tên kiểu dáng'),
    price: yup.string().required('Nhập giá cho kiểu dáng'),
  });
  const onSubmitSuccess = async (values) => {
    const {data} = state;
    const {serviceId, styleId} = data;
    let formData = new FormData();

    formData.append('name', form.values.name);
    const price0 = form.values.price.replace(/[^-a-zA-Z0-9]+/g, '');
    formData.append('price', price0);
    formData.append('description', form.values.description);
    formData.append('_idService', serviceId);

    if (state.data?.image[0]) {
      formData.append('files', {
        name: 'image0.jpg',
        uri: state.data?.image[0],
        type: 'image/jpeg',
      });
    }
    if (state.data?.image[1]) {
      formData.append('files', {
        name: 'image1.jpg',
        uri: state.data?.image[1],
        type: 'image/jpeg',
      });
    }
    if (state.data?.image[2]) {
      formData.append('files', {
        name: 'image2.jpg',
        uri: state.data?.image[2],
        type: 'image/jpeg',
      });
    }
    if (state.data?.image[3]) {
      formData.append('files', {
        name: 'image3.jpg',
        uri: state.data?.image[3],
        type: 'image/jpeg',
      });
    }

    dispatch(updateStyleLoading());

    try {
      const response = await updateStyleApi(styleId, formData);
      if (response?.status === 'success') {
        const {message, data} = response;
        dispatch(updateStyleSuccess({message, data}));
        dispatch(editStyleList({data}));
        dispatch(updateStyleInfoData({data}));
      } else {
        const {message} = response;
        dispatch(updateStyleFaild({errorMessage: message}));
      }
    } catch (err) {
      dispatch(updateStyleFaild({errorMessage: err.errMsg}));
    }
  };
  const form = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: onSubmitSuccess,
  });

  const updateStyleEvent = () => {
    dispatch(updateStyle());
  };

  const getImagePathEvent = (name, path) => {
    dispatch(getImagePath({name, path}));
  };
  const updateInputValidEvent = (name, isValid) => {
    dispatch(updateInputValid({name, isValid}));
  };

  const onSetSuccessMessageEvent = (value) =>
    dispatch(setSuccessMessage({value}));

  const onPressConfirmEvent = () => {
    dispatch(setSuccessMessage({value: ''}));
    navigation.goBack();
  };

  const onSetErrorMessageEvent = (value) => dispatch(setErrorMessage({value}));

  const onPressLeftHeaderItemEvent = () => {
    navigation.goBack();
  };

  const onIncreaseMaxImageFilesEvent = (fileIndex) => {
    dispatch(setData());
    switch (fileIndex) {
      case 0:
        form.setFieldValue('image0', '');
        break;
      case 1:
        form.setFieldValue('image1', '');

        break;
      case 2:
        form.setFieldValue('image2', '');

        break;
      case 3:
        form.setFieldValue('image3', '');
    }
  };

  const onRemoveImagesEvent = (i) => dispatch(setData0({value: i}));

  const onPressSelectorPopUpEvent = (selectOption) => {
    dispatch(setCanShowSelectPicker({value: false}));
    switch (selectOption) {
      case 'library':
        setTimeout(async () => {
          try {
            const images = await ImagePicker.openPicker({
              multiple: true,
              mediaType: 'photo',
            });
            const imageArr = images.map((el) => el.path);

            const finalImages = imageArr.slice(0, 4);
            dispatch(setData2({value: finalImages}));
          } catch (error) {}
        }, 300);
        break;
      case 'camera':
        setTimeout(async () => {
          ImagePicker0.launchCamera(
            {
              storageOptions: {
                skipBackup: true,
                path: 'images',
              },
            },
            async (response) => {
              if (response.didCancel) {
              } else {
                try {
                  let image = await response.uri;
                  if (Platform.OS === 'ios') {
                    image = '~' + image.substring(image.indexOf('/Documents'));
                  }
                  const finalImages = [image];
                  dispatch(setData2({value: finalImages}));
                } catch (err) {}
              }
            },
          );
        }, 300);
        break;
      case 'cancel':
        break;
    }
  };

  const onOpenSelectorPickerEvent = () =>
    dispatch(setCanShowSelectPicker({value: true}));

  const onSetNoteEvent = (value) => dispatch(setData3({value}));

  return {
    state,
    form,
    updateStyleEvent,
    getImagePathEvent,
    updateInputValidEvent,
    onGoBackEvent,
    onSetSuccessMessageEvent,
    onSetErrorMessageEvent,
    onPressConfirmEvent,
    onPressLeftHeaderItemEvent,
    onIncreaseMaxImageFilesEvent,
    onRemoveImagesEvent,
    onPressSelectorPopUpEvent,
    onOpenSelectorPickerEvent,
    onSetNoteEvent,
  };
};

export default useTodo;
