import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isSubmitting: false,
  isSuccess: false,
  isFailure: false,
  errorText: null,

  isFullNameFocused: false,
  isFullNameValid: true,
  isPositionFocused: false,
  isPosistionValid: true,
  isEmailValid: true,
  isEmailFocused: false,
  isMobileValid: true,
  isMobileFocused: false,
  isUsernameValid: true,
  isUsernameFocused: false,
  isPasswordValid: true,
  isPasswordFocused: false,
  isPasswordConfirmedValid: true,
  isPasswordConfirmedFocused: false,

  errorMessage: undefined,
  data: undefined,
  canShowCamera: false,
};

const CreateStaff = createSlice({
  name: 'CreateStaff',
  initialState: initialState,
  reducers: {
    updateErrorText: (state, action) => {
      state.errorText = null;
    },
    onCloseErrorPopUp: (state, action) => {
      state.errorText = null;
    },
    onCloseSuccessPopUp: (state, action) => {
      state.isSuccess = null;
    },
    postRegisterEmployeeStart: (state, action) => {
      state.isSubmitting = true;
      state.isSuccess = false;
      state.isFailure = false;
      state.errorText = null;
      state.errorRegister = false;
    },
    postRegisterEmployeeSuccess: (state, action) => {
      state.isSubmitting = false;
      state.isSuccess = true;
      state.isFailure = false;
    },
    postRegisterEmployeeFaild: (state, action) => {
      state.isSubmitting = false;
      state.isSuccess = false;
      state.isFailure = true;
      state.errorText = action.payload.errMsg;
      const {message} = action.payload;
      state.errorMessage = message;
    },
    updateInputValid: (state, action) => {
      const name = action.payload.name;
      const isValid = action.payload.isValid;
      switch (name) {
        case 'fullname':
          state.isFullNameValid = isValid;
          state.isFullNameFocused = isValid;
          break;

        case 'position':
          state.isPosistionValid = isValid;
          state.isPositionFocused = isValid;
          break;

        case 'email':
          state.isEmailValid = isValid;
          state.isEmailFocused = isValid;
          state.errorMessage = isValid;
          break;

        case 'mobile':
          state.isMobileValid = isValid;
          state.isMobileFocused = isValid;
          state.errorMessage = isValid;
          break;

        case 'username':
          state.isUsernameValid = isValid;
          state.isUsernameFocused = isValid;
          break;

        case 'password':
          state.isPasswordValid = isValid;
          state.isPasswordFocused = isValid;
          state.errorMessage = isValid;
          break;

        case 'passwordConfirmed':
          state.isPasswordConfirmedValid = isValid;
          state.isPasswordConfirmedFocused = isValid;
      }
    },
    sendErrorInput: (state, action) => {
      state.isSubmitting = false;
      state.isSuccess = false;
      state.isFailure = true;
    },
    resetCreateStaff: (state, action) => {},
    setErrorMessage: (state, action) => {
      const {value} = action.payload;
      state.errorMessage = value;
    },
    setCanShowCamera: (state, action) => {
      const {value} = action.payload;
      state.canShowCamera = value;
    },
  },
});

const {reducer, actions} = CreateStaff;
export const {
  postRegisterEmployeeStart,
  postRegisterEmployeeFaild,
  postRegisterEmployeeSuccess,
  updateErrorText,
  updateInputValid,
  onCloseErrorPopUp,
  sendErrorInput,
  onCloseSuccessPopUp,
  resetCreateStaff,
  setErrorMessage,
  setCanShowCamera,
} = actions;

const reducerWrapper = (state, action) => {
  if (action.type === 'CreateStaff/postRegisterEmployeeStart') {
    state = undefined;
  }

  return reducer(state, action);
};

export default reducerWrapper;
