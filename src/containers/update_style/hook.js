import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    getImagePath,
    sendUpdateStyleData,
    updateCanShowSuccess,
    updateInputValid,
    updateStyle,
    updateStyleFail,
    updateStyleLoading,
    updateStyleSuccess,
    setSuccessMessage,
    setErrorMessage,
} from './state';
import { updateStyleInfoData } from '../style_info/with_style_info';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateStyleApi } from '../../api/index';
import { editStyleList } from '../styleList/with_style_list';
import reactotron from 'reactotron-react-native';

const useTodo = () => {
    const state = useSelector((rootReducer) => rootReducer.updateStyle);
    const navigation = useNavigation();

    const onGoBackEvent = () => navigation.goBack();

    const { data } = state;
    const dispatch = useDispatch();
    const initValues = {
        name: data?.name ?? '',
        price: data?.price ? data?.price?.toString() : '',
        description: data.description ?? '',
    }
    const validation = yup.object().shape({
        name: yup.string().required('Nhập tên kiểu dáng'),
        price: yup.string().required('Nhập giá cho kiểu dáng'),
    });
    const onSubmitSuccess = async (values) => {
        let formData = new FormData();

        const { name, price, description } = values;
        const { firstImg, secondImg, thirdImg, fourthImg, serviceId } = state;

        if (firstImg) {
            formData.append('files', {
                name: 'image1.jpg',
                uri: firstImg,
                type: 'image/jpeg',
            });
        }
        if (secondImg) {
            formData.append('files', {
                name: 'image2.jpg',
                uri: secondImg,
                type: 'image/jpeg',
            });
        }
        if (thirdImg) {
            formData.append('files', {
                name: 'image3.jpg',
                uri: thirdImg,
                type: 'image/jpeg',
            });
        }
        if (fourthImg) {
            formData.append('files', {
                name: 'image4.jpg',
                uri: fourthImg,
                type: 'image/jpeg',
            });
        }
        formData.append('_idService', serviceId);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        dispatch(updateStyleLoading());
        try {
            reactotron.log("_idService",serviceId);
            reactotron.log("name",name);
            reactotron.log("price",price);
            reactotron.log("description",description);
            const response = await updateStyleApi(data?.id, formData);
            if (response?.status === 'success') {
                const { message, data } = response;
                const updateData = {
                    id: data?.id,
                    name,
                    price,
                    description,
                    image: [firstImg, secondImg, thirdImg, fourthImg],
                };
                const updateData2 = JSON.stringify(updateData);
                const finalUpdateData = JSON.parse(updateData2);

                dispatch(updateStyleSuccess({ message, data }));
                dispatch(editStyleList({ data: finalUpdateData }));
                dispatch(updateStyleInfoData({ data: finalUpdateData }));
            }
        } catch (err) {
            dispatch(updateStyleFail({ errorMessage: err.errMsg }));
        }
    }

    const form = useFormik({
        initialValues: initValues,
        validationSchema: validation,
        onSubmit: onSubmitSuccess,
    });

    const updateStyleEvent = () => {
        dispatch(updateStyle());
    };

    const sendUpdateStyleDataEvent = (serviceId, data) => {
        dispatch(sendUpdateStyleData({ data, serviceId }));
    };
    const getImagePathEvent = (name, path) => {
        dispatch(getImagePath({ name, path }));
    };
    const updateInputValidEvent = (name, isValid) => {
        dispatch(updateInputValid({ name, isValid }));
    };

    const updateCanShowSuccessEvent = () => {
        setTimeout(() => {
            dispatch(updateCanShowSuccess());
        }, 3000);
    };

    const onSetSuccessMessageEvent = (value) =>
        dispatch(setSuccessMessage({ value }));

    const onSetErrorMessageEvent = (value) => dispatch(setErrorMessage({ value }));
    return {
        state,
        form,
        updateStyleEvent,
        sendUpdateStyleDataEvent,
        getImagePathEvent,
        updateInputValidEvent,
        updateCanShowSuccessEvent,
        onGoBackEvent,
        onSetSuccessMessageEvent,
        onSetErrorMessageEvent,
    };

};


export default useTodo;