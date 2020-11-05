import useStyleList from '../styleList/use_style_list';
import useServiceList from '../serviceList/use_service_list';
import {
    createServiceFail,
    createStyleLoading,
    CreateStyleAccountContext,
    createStyleSuccess,
    getImagePath,
    getServiceId,
    updateInputValid,
    setSuccessMessage,
    setErrorMessage,
} from './with_create_style';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';

import { createStyle } from '../../api/index';
import { useFormik } from 'formik';
import reactotron from 'reactotron-react-native';

const useTodo = () => {
    const context = React.useContext(CreateStyleAccountContext);
    if (context === undefined) {
        throw new Error('No provider ListTodoContext');
    }
    const { updateStyleListEvent } = useStyleList();
    const { updateServiceData } = useServiceList();

    const { state, dispatch } = context;
    const navigation = useNavigation();
    const initialValues = {
        name: '',
        price: '',
        description: ''
    }

    const validation = yup.object().shape({
        name: yup.string().required('Nhập tên kiểu dáng'),
        price: yup.string().required('Nhập giá cho kiểu dáng'),
    });

    const onSubmitSuccess = async (values) => {
        let formData = new FormData();
        const { firstImg, secondImg, thirdImg, fourthImg, serviceId } = state;
        const { name, price, description } = values;
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

        dispatch(createStyleLoading());
        try {
            const response = await createStyle(formData);
            reactotron.log('response', response);
            if (response.status === 'success') {
                const {data, message} = response;
                dispatch(createStyleSuccess({ message }));
                updateStyleListEvent(response?.data);
                updateServiceData(serviceId);
            } else {
                const message = error.errMsg;
                dispatch(createServiceFail({ message }));
            }
        } catch (error) {
            const message = error.errMsg;
            dispatch(createServiceFail({ message }));
        }
    }

    const form = useFormik({
        initialValues: initialValues,
        validationSchema: validation,
        onSubmit: onSubmitSuccess
    });

    const updateInputValidEvent = (name, isValid) => {
        dispatch(updateInputValid({ name, isValid }));
    }

    const onGoBackEvent = () => {
        navigation.goBack();
    };

    const getImagePathEvent = (name, path) => {
        dispatch(getImagePath({ name, path }));
    }

    const getServiceIdEvent = (serviceId) => {
        dispatch(getServiceId({ serviceId }));
    };

    const onSetSuccessMessageEvent = (value) =>
        dispatch(setSuccessMessage({ value }));
        
    const onSetErrorMessageEvent = (value) => dispatch(setErrorMessage({ value }));
    return {
        form,
        state,
        updateInputValidEvent,
        getImagePathEvent,
        getServiceIdEvent,
        onGoBackEvent,
        onSetSuccessMessageEvent,
        onSetErrorMessageEvent,
    };

}
export default useTodo;