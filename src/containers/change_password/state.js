import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  isOldPasswordFocused: false,
  isNewPasswordFocused: false,
  isNewPasswordConfirmedFocused: false,

  isOldPasswordValid: true,
  isNewPasswordValid: true,
  isNewPasswordConfirmedValid: true,

  isLoading: false,

  successMessage: '',
  errorMessage: '',

  canShowPassword: false,

  isOldPasswordEncrypted: true,
  isNewPasswordEncrypted: true,
  isConfirmedPasswordEncrypted: true,
};

const changePassword = createSlice({
  name: 'changePassword',
  initialState: initialState,
  reducers: {
    setIsOldPasswordEncrypted: (state, action) => {
      state.isOldPasswordEncrypted = !state.isOldPasswordEncrypted;
    },
    setIsNewPasswordEncrypted: (state, action) => {
      state.isNewPasswordEncrypted = !state.isNewPasswordEncrypted;
    },
    setIsConfirmedPasswordEncrypted: (state, action) => {
      state.isConfirmedPasswordEncrypted = !state.isConfirmedPasswordEncrypted;
    },
    setCanShowPassword: (state, action) => {
      const {value} = action.payload;
      state.canShowPassword = value;
    },

    setSuccessMessage: (state, action) => {
      const {value} = action.payload;
      state.successMessage = value;
    },

    setErrorMessage: (state, action) => {
      const {value} = action.payload;
      state.errorMessage = value;
    },

    setInputFocused: (state, action) => {
      const {name, isFocused} = action.payload;
      switch (name) {
        case 'oldPassword':
          state.isOldPasswordFocused = isFocused;
          state.isOldPasswordValid = isFocused;
          break;
        case 'newPassword':
          state.isNewPasswordFocused = isFocused;
          state.isNewPasswordValid = isFocused;
          break;
        case 'newPasswordConfirmed':
          state.isNewPasswordConfirmedFocused = isFocused;
          state.isNewPasswordConfirmedValid = isFocused;
      }
    },
    changePasswordLoading: (state, action) => {
      state.isLoading = true;
    },
    changePasswordSuccess: (state, action) => {
      state.isLoading = false;
      const {message} = action.payload;
      state.successMessage = message;
    },
    changePasswordFaild: (state, action) => {
      state.isLoading = false;
      const {message} = action.payload;
      state.errorMessage = message;
    },

    clearReducer: (state, action) => {},
  },
});

const {reducer, actions} = changePassword;
export const {
  changePasswordAction,
  setInputFocused,
  changePasswordLoading,
  changePasswordSuccess,
  changePasswordFaild,
  setErrMsg,
  clearReducer,
  setCanShowSuccessPopUp,
  setSuccessMessage,
  setErrorMessage,
  setCanShowPassword,
  setIsOldPasswordEncrypted,
  setIsNewPasswordEncrypted,
  setIsConfirmedPasswordEncrypted,
} = actions;

const changePasswordReducerWrapper = (state, action) => {
  if (action.type === 'changePassword/clearReducer') {
    state = undefined;
  }
  return reducer(state, action);
};

export default changePasswordReducerWrapper;
