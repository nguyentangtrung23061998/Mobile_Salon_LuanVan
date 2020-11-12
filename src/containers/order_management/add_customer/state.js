import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isSubmitting: false,
  isSuccess: false,
  isFailure: false,
  errorText: null,

  isFullNameFocused: false,
  isFullNameValid: true,
  isMobileValid: true,
  isMobileFocused: false,

  errorTextInput: false,
};

const addCustomer = createSlice({
  name: 'addCustomer',
  initialState: initialState,
  reducers: {
    updateErrorText: (state, action) => {
      state.errorText = null;
    },
    postAddCustomerStart: (state, action) => {
      state.isSubmitting = true;
      state.isSuccess = false;
      state.isFailure = false;
      state.errorText = null;
    },
    postAddCustomerSuccess: (state, action) => {
      state.isSubmitting = false;
      state.isSuccess = true;
      state.isFailure = false;
      state.errorText = null;
    },
    postAddCustomerFaild: (state, action) => {
      state.isSubmitting = false;
      state.isSuccess = false;
      state.isFailure = true;
      state.errorText = action.payload.errMsg;
    },
    updateInputValid: (state, action) => {
      const name = action.payload.name;
      const isValid = action.payload.isValid;
      switch (name) {
        case 'fullname':
          state.isFullNameValid = isValid;
          state.isFullNameFocused = isValid;
          state.errorTextInput = isValid;
          break;

        case 'mobile':
          state.isMobileValid = isValid;
          state.isMobileFocused = isValid;
          state.errorTextInput = isValid;
      }
    },
    sendErrorInput: (state, action) => {
      state.isSubmitting = false;
      state.isSuccess = false;
      state.isFailure = true;
      state.errorTextInput = action.payload.errMsg;
    },
    onCloseSuccessPopUp: (state, action) => {
      state.isSuccess = null;
    },
  },
});

const {reducer, actions} = addCustomer;
export const {
  postAddCustomerStart,
  postAddCustomerFaild,
  postAddCustomerSuccess,
  updateErrorText,
  updateInputValid,
  sendErrorInput,
  onCloseSuccessPopUp,
} = actions;

const addCustomerReducerWrapper = (state, action) => {
  if (action.type === 'addCustomer/postAddCustomerStart') {
    state = undefined;
  }
  return reducer(state, action);
};

export default addCustomerReducerWrapper;
