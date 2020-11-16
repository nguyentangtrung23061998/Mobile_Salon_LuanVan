import React from 'react';
import {postRegister} from '../../../api/index';
import {
  postRegisterFaild,
  postRegisterStart,
  postRegisterSuccess,
  SignUpAccountContext,
  updateErrorText,
  updateInputValid,
  setSuccessMessage,
} from './with_sign_up_account';
import {useNavigation} from '@react-navigation/native';
import {
  setProfile,
  setStoreInfo,
  setToken,
} from '../../../utility/local_storage';
import reacttron from 'reactotron-react-native';

const useTodo = () => {
  const context = React.useContext(SignUpAccountContext);
  if (context === undefined) {
    throw new Error('No provider ListTodoContext');
  }
  const {state, dispatch} = context;

  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  const onGoBackEvent = () => navigation.goBack();

  const onNavigateEvent = (name) => navigation.navigate(name);

  const updateInputValidEvent = (name, isValid) => {
    dispatch(updateInputValid({name: name, isValid: isValid}));
  };

  const onSubmitSuccess = async (values) => {
    dispatch(postRegisterStart());
    try {
      const response = await postRegister(
        values.fullName,
        values.password,
        values.domainAddress,
        values.storeName,
        values.email,
        values.phone,
      );
      if (response.status === 'success') {
        const {message} = response;
        const {storeInfo} = response.data.user;
        const {token} = response.data.Auth;
        const {profile} = response.data;
        await setStoreInfo(storeInfo);
        await setToken(token);
        await setProfile(profile);

        dispatch(postRegisterSuccess({message}));
      } else {
        const {message} = response;
        dispatch(postRegisterFaild({errMsg: message}));
      }
    } catch (error) {
      dispatch(postRegisterFaild({errMsg: error.errMsg}));
    }
  };

  const onCloseErrorPopUp = () => {
    dispatch(updateErrorText());
  };

  const onSetSuccessMessageEvent = (value) =>
    dispatch(setSuccessMessage({value}));

  return {
    state,
    updateInputValidEvent,
    onSubmitSuccess,
    onCloseErrorPopUp,
    goBack,
    onGoBackEvent,
    onSetSuccessMessageEvent,
    onNavigateEvent,
  };
};

export default useTodo;
