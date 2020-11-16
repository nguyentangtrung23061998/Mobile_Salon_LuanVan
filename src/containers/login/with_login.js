import {createSlice} from '@reduxjs/toolkit';
// globalState
const initialState = {
  isSubmitting: false,
  isSuccess: false,
  isFailure: false,
  errorMsg: null,

  isMobileValid: true,
  isPasswordValid: true,

  isMobileFocused: false,
  isPasswordFocused: false,
  domainAddress: '',
};

const Login = createSlice({
  name: 'Login',
  initialState: initialState,
  reducers: {
    setDomainAddress: (state, action) => {
      state.domainAddress = action.payload;
    },
    updateInputValid: (state, action) => {
      const name = action.payload.name;
      const isValid = action.payload.isValid;
      if (name === 'mobile') {
        state.isMobileValid = isValid;
        state.isMobileFocused = isValid;
      }

      if (name === 'password') {
        state.isPasswordValid = isValid;
        state.isPasswordFocused = isValid;
      }
    },

    postLoginStart: (state, action) => {
      state.isSubmitting = true;
      state.isSuccess = false;
      state.isFailure = false;
      state.errorMsg = null;
    },

    postLoginSuccess: (state, action) => {
      state.isSubmitting = false;
      state.isSuccess = true;
      state.isFailure = false;
      state.errorMsg = null;
    },

    postLoginFaild: (state, action) => {
      state.isSubmitting = false;
      state.isSuccess = false;
      state.isFailure = true;
      state.errorMsg = action.payload.errMsg;
    },

    onCloseErrorPopUp: (state, action) => {
      state.errorMsg = null;
    },
  },
});

const {reducer, actions} = Login;
export const {
  updateInputValid,
  postLoginStart,
  postLoginSuccess,
  postLoginFaild,
  onCloseErrorPopUp,
  setDomainAddress,
} = actions;

const loginReducerWrapper = (state, action) => {
  return reducer(state, action);
};

export default loginReducerWrapper;
