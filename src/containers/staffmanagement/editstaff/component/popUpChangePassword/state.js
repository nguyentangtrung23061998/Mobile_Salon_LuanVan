import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  isOldPasswordFocused: false,
  isNewPasswordFocused: false,
  isNewPasswordConfirmedFocused: false,

  isOldPasswordValid: true,
  isNewPasswordValid: true,
  isNewPasswordConfirmedValid: true,

  isLoading: undefined,
  isSuccess: undefined,
  errMsg: undefined,

  canShowSuccessPopUp: undefined,
};

const changePassword = createSlice({
  name: 'changePassword',
  initialState: initialState,
  reducers: {
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
      state.isSuccess = true;
      state.canShowSuccessPopUp = true;
    },
    changePasswordFaild: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errMsg = action.payload;
    },
    setErrMsg: (state, action) => {
      state.errMsg = action.payload;
    },
    setCanShowSuccessPopUp: (state, action) => {
      state.canShowSuccessPopUp = action.payload;
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
} = actions;

const changePasswordReducerWrapper = (state, action) => {
  if (action.type === 'changePassword/clearReducer') {
    state = undefined;
  }
  return reducer(state, action);
};

export default changePasswordReducerWrapper;
