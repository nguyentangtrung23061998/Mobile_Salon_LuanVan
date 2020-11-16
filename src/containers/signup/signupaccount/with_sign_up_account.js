import {createSlice} from '@reduxjs/toolkit';
import React, {useReducer} from 'react';

const initialState = {
  isSubmitting: false,
  isSuccess: false,
  isFailure: false,
  errorText: null,
  successMessage: '',

  isFullNameValid: true,
  isEmailValid: true,
  isPhoneValid: true,
  isPasswordValid: true,
  isPasswordConfirmedValid: true,
  isStoreNameValid: true,
  isDomainNameValid: true,

  isFullNameFocused: false,
  isEmailFocused: false,
  isPhoneFocused: false,
  isPasswordFocused: false,
  isPasswordConfirmedFocused: false,
  isStoreNameFocused: false,
  isDomainNameFocused: false,
};

const SignUpAccount = createSlice({
  name: 'SignUpAccount',
  initialState: initialState,
  reducers: {
    setSuccessMessage: (state, action) => {
      const {value} = action.payload;
      state.successMessage = value;
    },
    updateErrorText: (state, action) => {
      state.errorText = null;
    },
    postRegisterStart: (state, action) => {
      state.isSubmitting = true;
      state.isSuccess = false;
      state.isFailure = false;
      state.errorText = null;
    },
    postRegisterSuccess: (state, action) => {
      state.isSubmitting = false;
      state.isSuccess = true;
      state.isFailure = false;
      state.errorText = null;
      const {message} = action.payload;
      state.successMessage = message;
    },
    postRegisterFaild: (state, action) => {
      state.isSubmitting = false;
      state.isSuccess = false;
      state.isFailure = true;
      state.errorText = action.payload.errMsg;
    },

    updateInputValid: (state, action) => {
      const name = action.payload.name;
      const isValid = action.payload.isValid;
      switch (name) {
        case 'fullName':
          state.isFullNameValid = isValid;
          state.isFullNameFocused = isValid;
          break;

        case 'email':
          state.isEmailValid = isValid;
          state.isEmailFocused = isValid;
          break;

        case 'phone':
          state.isPhoneValid = isValid;
          state.isPhoneFocused = isValid;
          break;

        case 'password':
          state.isPasswordValid = isValid;
          state.isPasswordFocused = isValid;
          break;

        case 'passwordConfirmed':
          state.isPasswordConfirmedValid = isValid;
          state.isPasswordConfirmedFocused = isValid;
          break;

        case 'storeName':
          state.isStoreNameValid = isValid;
          state.isStoreNameFocused = isValid;
          break;

        case 'domainAddress':
          state.isDomainNameValid = isValid;
          state.isDomainNameFocused = isValid;
      }
    },
  },
});

const {reducer, actions} = SignUpAccount;
export const {
  updateInputValid,
  postRegisterStart,
  postRegisterSuccess,
  postRegisterFaild,
  updateErrorText,
  setSuccessMessage,
} = actions;

export const SignUpAccountContext = React.createContext(initialState);
const SignUpAccountProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = React.useMemo(() => ({state, dispatch}), [state]);

  return (
    <SignUpAccountContext.Provider value={value}>
      {props.children}
    </SignUpAccountContext.Provider>
  );
};

const withSignUpAccount = (WrappedComponent) => {
  return ({...props}) => {
    return (
      <SignUpAccountProvider>
        <WrappedComponent {...props} />
      </SignUpAccountProvider>
    );
  };
};

export default withSignUpAccount;
