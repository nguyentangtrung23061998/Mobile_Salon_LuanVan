import uploadImage from '../../assets/icon/upImage/upload_image.png';
import { Container } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import ImagePicker from 'react-native-image-picker';
import { Button, Header } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Input, { TextArea } from '../input/input';
import styles from './style';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import useUpdateStyle from './hook';

import CameraPopUp from '../storeInfo/component/cameraPopUp/camera_pop_up';
import SuccessPopUp from '../success_pop_up/success_pop_up';
import ErrorPopUp from '../error_pop_up/error_pop_up';
import {ImageView0} from '../createStyle/image_view/image_view';

import Loading from '../loading/loading';
export default React.memo(() => {
    //hook
    const {
        state,
        form,
        getImagePathEvent,
        updateInputValidEvent,
        updateCanShowSuccessEvent,
        onGoBackEvent,
        onSetSuccessMessageEvent,
        onSetErrorMessageEvent,
    } = useUpdateStyle();

    const {
        errors,
        values,
        isValid,
        setFieldValue,
        handleBlur,
        handleSubmit,
    } = form;

    const [canShowCamera, setCanShowCamera] = useState(false);
    const [characterCount, setCharacterCount] = useState(
        200 - values?.description?.length,
    );

    const { firstImg, secondImg, thirdImg, fourthImg } = state;
    const _onPressCamera = (type) => {
        switch (type) {
            case 'cancel':
                setCanShowCamera(false);
                break;
            case 'library':
                _openImageLibrary();
                break;
            case 'camera':
                _openCamera();
                break;
        }
    };

    const _openAndroidImageLib = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
                cameraRoll: true,
                waitUntilSaved: true,
            },
        };
        ImagePicker.launchImageLibrary(options, async (response) => {
            let imgUri;
            if (response.didCancel) {
            } else {
                try {
                    imgUri = await response.uri;
                    setFieldValue('image', imgUri);
                    // onSetInputValueEvent('image', imgUri);
                } catch (err) { }
            }
        });
    };

    const _openIosImageLib = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
                cameraRoll: true,
                waitUntilSaved: true,
            },
        };
        ImagePicker.launchImageLibrary(options, async (response) => {
            let imgUri;
            try {
                imgUri = await response.uri;
                imgUri = '~' + imgUri.substring(imgUri.indexOf('/Documents'));
                if (!firstImg) {
                    getImagePathEvent('first', imgUri);
                } else if (!secondImg) {
                    getImagePathEvent('second', imgUri);
                } else if (!thirdImg) {
                    getImagePathEvent('third', imgUri);
                } else {
                    getImagePathEvent('fourth', imgUri);
                }
            } catch (err) { }
        });
    };

    const _openImageLibrary = () => {
        if (Platform.OS === 'android') {
            _openAndroidImageLib();
        } else {
            setCanShowCamera(false);
            setTimeout(() => {
                _openIosImageLib();
            }, 300);
        }
    };
    const isFormValid = () =>
        values.name !== '' && values.price !== '' && isValid;

    const disableButton = () => {
        return isFormValid() && (firstImg || secondImg || thirdImg || fourthImg);
    };
    const _openAndroidCamera = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
                cameraRoll: true,
                waitUntilSaved: true,
            },
        };

        ImagePicker.launchCamera(options, async (response) => {
            let imgUri;
            if (response.didCancel) {
            } else {
                try {
                    imgUri = await response.uri;
                    setFieldValue('image', imgUri);
                } catch (err) { }
            }
        });
    };
    const _openIosCamera = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
                cameraRoll: true,
                waitUntilSaved: true,
            },
        };
        ImagePicker.launchCamera(options, async (response) => {
            let imgUri;
            try {
                imgUri = await response.uri;
                imgUri = '~' + imgUri.substring(imgUri.indexOf('/Documents'));
                if (!firstImg) {
                    getImagePathEvent('first', imgUri);
                } else if (!secondImg) {
                    getImagePathEvent('second', imgUri);
                } else if (!thirdImg) {
                    getImagePathEvent('third', imgUri);
                } else {
                    getImagePathEvent('fourth', imgUri);
                }
            } catch (err) { }
        });
    };
    const _openCamera = () => {
        if (Platform.OS === 'android') {
            _openAndroidCamera();
        } else {
            setCanShowCamera(false);
            setTimeout(() => {
                _openIosCamera();
            }, 300);
        }
    };

    // useeffect
    useEffect(() => {
        if (state.isSuccess) {
            updateCanShowSuccessEvent();
        }
    });

    //subs
    const _leftComponent = useCallback(
        () => (
            <TouchableOpacity onPress={onGoBackEvent}>
                <Text style={[styles.text0]}>Hủy</Text>
            </TouchableOpacity>
        )
    );

    const _centerComponent = useCallback(
        () => <Text style={[styles.text1]}>Chỉnh sửa kiểu dáng</Text>,
        []
    );

    //main
    return (
        <Container>
            <Header
                leftComponent={_leftComponent}
                centerComponent={_centerComponent}
                containerStyle={[styles.header0]}
            />
            <View style={[styles.view4]}>
                <KeyboardAwareScrollView scrollEnabled={false}>
                    <View style={[styles.view0]}>
                        <Input
                            borderBottomColor={
                                state.isStyleNameFocused ? '#0077be' : '#d0d0d0'
                            }
                            errorText={
                                state.isStyleNameValid || !errors.name ? null : errors.name
                            }
                            placeholder={'Uốn đuôi chữ C'}
                            title={'Tên kiểu dáng: '}
                            required
                            onBlur={handleBlur('name')}
                            onChangeText={(value) => {
                                setFieldValue('name', value.replace(/^\s*\s*$/, ''));
                            }}
                            value={values.name}
                            onFocus={() => updateInputValidEvent('name', true)}
                            onEndEditing={() => updateInputValidEvent('name', false)}
                        />
                        <View style={[styles.view6]} />
                        <Input
                            borderBottomColor={
                                state.isStylePriceFocused ? '#0077be' : '#d0d0d0'
                            }
                            errorText={
                                state.isStylePriceValid || !errors.price ? null : errors.price
                            }
                            keyboardType={
                                Platform.OS === 'android' ? 'numeric' : 'number-pad'
                            }
                            placeholder={'Nhập giá tiền của kiểu dáng'}
                            title={'Tên kiểu dáng: '}
                            required
                            rightText={'VND'}
                            onBlur={handleBlur('price')}
                            onChangeText={(value) => {
                                setFieldValue('price', value);
                            }}
                            value={values.price}
                            onFocus={() => updateInputValidEvent('price', true)}
                            onEndEditing={() => updateInputValidEvent('price', false)}
                        />
                        <View style={[styles.view6]} />

                        <TextArea
                            onChangeText={(value) => {
                                const finalValue = value.replace(/^\s*\s*$/, '');
                                setFieldValue('description', finalValue);
                                // setDescriptionValue(finalValue);
                                setCharacterCount(200 - finalValue.length);
                            }}
                            title={'Mô tả kiểu dáng:'}
                            placeholder={'Nhập ghi chú cho lịch hẹn'}
                            characterCount={characterCount + '/200'}
                            value={values.description}
                        />

                        <View style={[styles.view6]} />
                        <View style={[styles.view3]}>
                            {firstImg && (
                                <ImageView0
                                    source={firstImg}
                                    onRemove={() => getImagePathEvent('first', null)}
                                />
                            )}
                            {firstImg && <View style={[styles.view2]} />}
                            {secondImg && (
                                <ImageView0
                                    source={secondImg}
                                    onRemove={() => getImagePathEvent('second', null)}
                                />
                            )}
                            {secondImg && <View style={[styles.view2]} />}
                            {thirdImg && (
                                <ImageView0
                                    source={thirdImg}
                                    onRemove={() => getImagePathEvent('third', null)}
                                />
                            )}
                            {thirdImg && <View style={[styles.view2]} />}
                            {fourthImg && (
                                <ImageView0
                                    source={fourthImg}
                                    onRemove={() => getImagePathEvent('fourth', null)}
                                />
                            )}

                            {fourthImg && <View style={[styles.view2]} />}
                            {(!firstImg || !secondImg || !thirdImg || !fourthImg) && (
                                <TouchableOpacity
                                    style={[styles.touchableOpacity0]}
                                    onPress={() => {
                                        setCanShowCamera(true);
                                    }}>
                                    <Image style={[styles.image2]} source={uploadImage} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <Button
                    disabled={!disableButton()}
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: [
                            disableButton() ? '#4db1e9' : '#8d8d8d',
                            disableButton() ? '#005eff' : '#8d8d8d',
                        ],
                        start: { x: 0, y: 1 },
                        end: { x: 0, y: 0 },
                    }}
                    containerStyle={[styles.button0]}
                    title={'LƯU CHỈNH SỬA'}
                    onPress={handleSubmit}
                />
            </View>
            <CameraPopUp isVisible={canShowCamera} onPress={_onPressCamera} />
            {state.isLoading && <Loading />}
            {state.successMessage !== '' && (
                <SuccessPopUp
                    msg={state.successMessage}
                    buttonText="Xác nhận"
                    onPress={() => {
                        onSetSuccessMessageEvent('');
                        onGoBackEvent();
                    }}
                />
            )}
            {state.errorMessage !== '' && (
                <ErrorPopUp
                    msg={state.errorMessage}
                    onPress={() => onSetErrorMessageEvent('')}
                />
            )}
        </Container>
    )
})