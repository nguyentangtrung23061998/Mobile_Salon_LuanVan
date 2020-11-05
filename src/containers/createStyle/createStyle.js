import uploadImage from '../../assets/icon/upImage/upload_image.png';
import {Container} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {Button, Header} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import useCreateStyleAccount from './use_create_style';
import withCreateStyleAccount from './with_create_style';

import styles from './style';
import Input, {TextArea} from '../input/input';
import CameraPopUp from '../storeInfo/component/cameraPopUp/camera_pop_up';
import SuccessPopUp from '../success_pop_up/success_pop_up';
import Loading from '../loading/loading';
import ErrorPopUp from '../error_pop_up/error_pop_up';
import ImageView from './image_view/image_view';

const CreateStyleAccount = ({ route }) => {
    const { id } = route.params;
    const [canShowCamera, setCanShowCamera] = useState(false);

    const [firstImg, setFirstImg] = useState(null);
    const [secondImg, setSecondImg] = useState(null);
    const [thirdImg, setThirdImg] = useState(null);
    const [fourthImg, setFourthImg] = useState(null);

    const {
        form,
        state,
        updateInputValidEvent,
        getImagePathEvent,
        getServiceIdEvent,
        onGoBackEvent,
        onSetSuccessMessageEvent,
        onSetErrorMessageEvent
    } = useCreateStyleAccount();

    const {
        errors,
        values,
        isValid,
        setFieldValue,
        handleBlur,
        handleSubmit,
    } = form;
    const { isStyleNameValid, isStylePriceValid } = state;
    const [characterCount, setCharacterCount] = useState(200);
    const [, setDescriptionValue] = useState('');

    const _onPressCamera = (type) => {
        switch (type) {
            case 'cancle':
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
            storeOptions: {
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
                    if (!firstImg) {
                        setFirstImg(imgUri);
                        getImagePathEvent('first', imgUri);
                    } else if (!secondImg) {
                        setSecondImg(imgUri);
                        getImagePathEvent('second', imgUri);
                    } else if (!thirdImg) {
                        setThirdImg(imgUri);
                        getImagePathEvent('third', imgUri);
                    } else {
                        setFourthImg(imgUri);
                        getImagePathEvent('fourth', imgUri);
                    }
                } catch (error) {
                }

            }
        })
    }

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
                    setFirstImg(imgUri);
                    getImagePathEvent('first', imgUri);
                } else if (!secondImg) {
                    setSecondImg(imgUri);
                    getImagePathEvent('second', imgUri);
                } else if (!thirdImg) {
                    setThirdImg(imgUri);
                    getImagePathEvent('third', imgUri);
                } else {
                    setFourthImg(imgUri);
                    getImagePathEvent('fourth', imgUri);
                }
            } catch (err) { }
        });
    }

    const _openImageLibrary = () => {
        setCanShowCamera(false);
        if (Platform.OS === 'android') {
            _openAndroidImageLib();
        } else {
            setTimeout(() => {
                _openIosImageLib();
            }, 300);
        }
    }
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
                    if (!firstImg) {
                        setFirstImg(imgUri);
                        getImagePathEvent('first', imgUri);
                    } else if (!secondImg) {
                        setSecondImg(imgUri);
                        getImagePathEvent('second', imgUri);
                    } else if (!thirdImg) {
                        setThirdImg(imgUri);
                        getImagePathEvent('third', imgUri);
                    } else {
                        setFourthImg(imgUri);
                        getImagePathEvent('fourth', imgUri);
                    }
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
                    setFirstImg(imgUri);
                    getImagePathEvent('first', imgUri);
                } else if (!secondImg) {
                    setSecondImg(imgUri);
                    getImagePathEvent('second', imgUri);
                } else if (!thirdImg) {
                    setThirdImg(imgUri);
                    getImagePathEvent('third', imgUri);
                } else {
                    setFourthImg(imgUri);
                    getImagePathEvent('fourth', imgUri);
                }
            } catch (err) { }
        });
    };
    const _openCamera = () => {
        setCanShowCamera(false);
        if (Platform.OS === 'android') {
            _openAndroidCamera();
        } else {
            setTimeout(() => {
                _openIosCamera();
            }, 300);
        }
    };
    const isFormValid = () =>
        values.name !== '' && values.price !== '' && isValid;

    const disableButton = () => {
        return isFormValid && (firstImg || secondImg || thirdImg || fourthImg);
    };

    useEffect(() => {
        getServiceIdEvent(id);
    }, []);

    //subs
    const _leftComponent = () => {
        <TouchableOpacity onPress={onGoBackEvent}>
            <Text style={[styles.text0]}>HỦY</Text>
        </TouchableOpacity>
    }

    const _centerComponent = () => (
        <Text style={[styles.text1]}>Tạo mới kiểu dáng</Text>
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
                            errorText={isStyleNameValid || !errors.name ? null : errors.name}
                            placeholder={'Uốn đuôi chữ C'}
                            title={'Tên kiểu dáng:  '}
                            required
                            onBlur={handleBlur('name')}
                            onChangeText={(value) => {
                                if (value === ' ') {
                                    value = value.substr(1);
                                }
                                setFieldValue('name', value);
                            }}
                            value={values.name}
                            onFocus={() => updateInputValidEvent('name', true)}
                            onEndEditing={() => updateInputValidEvent('name', false)}
                        />
                        <Input
                            borderBottomColor={
                                state.isStyleNameFocused ? '#0077be' : '#d0d0d0'
                            }
                            errorText={
                                isStylePriceValid || !errors.price ? null : errors.price
                            }
                            keyboardType={
                                Platform.OS === 'android' ? 'numeric' : 'number-pad'
                            }
                            placeholder={'Nhập giá tiền của kiểu dáng'}
                            title={'Giá tiền:  '}
                            required
                            rightText={'VND'}
                            onBlur={handleBlur('price')}
                            onChangeText={(value) => {
                                if (value === '') {
                                    value = value.substr(1);
                                }
                                setFieldValue('price',value)
                            }}
                            value={values.price}
                            onFocus={() => updateInputValidEvent('price', true)}
                            onEndEditing={() => updateInputValidEvent('price', false)}
                        />
                        <TextArea
                            onChangeText={(value) => {
                                const finalValue = value.replace(/^\s*\s*$/, '');
                                setFieldValue('description', finalValue);
                                setDescriptionValue(finalValue);
                                setCharacterCount(200 - finalValue.length);
                            }}
                            title={'Mô tả kiểu dáng:'}
                            placeholder={'Nhập ghi chú cho lịch hẹn'}
                            characterCount={characterCount + '/200'}
                            value={values.description}
                        />
                        <View style={[styles.view3]}>
                            {firstImg && (
                                <ImageView
                                    imageUri={firstImg}
                                    onRemove={() => {
                                        getImagePathEvent('first', null);
                                        setFirstImg(null);
                                    }}
                                />
                            )}
                            {firstImg && <View style={[styles.view2]} />}
                            {secondImg && (
                                <ImageView
                                    imageUri={secondImg}
                                    onRemove={() => {
                                        getImagePathEvent('second', null);
                                        setSecondImg(null);
                                    }}
                                />
                            )}
                            {secondImg && <View style={[styles.view2]} />}

                            {thirdImg && (
                                <ImageView
                                    imageUri={thirdImg}
                                    onRemove={() => {
                                        getImagePathEvent('third', null);
                                        setThirdImg(null);
                                    }}
                                />
                            )}
                            {thirdImg && <View style={[styles.view2]} />}

                            {fourthImg && (
                                <ImageView
                                    imageUri={fourthImg}
                                    onRemove={() => {
                                        getImagePathEvent('fourth', null);
                                        setFourthImg(null);
                                    }}
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
                    title={'THÊM'}
                    onPress={handleSubmit}
                />
                <CameraPopUp isVisible={canShowCamera} onPress={_onPressCamera} />
                {state?.isLoading && <Loading />}
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
                        buttonText="Quay lại"
                        onPress={() => onSetErrorMessageEvent('')}
                    />
                )}
            </View>
        </Container>
    )
}
export default withCreateStyleAccount(CreateStyleAccount);