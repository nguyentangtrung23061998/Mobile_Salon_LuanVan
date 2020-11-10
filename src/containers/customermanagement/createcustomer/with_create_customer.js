import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isSubmitting: false,
  isSuccess: undefined,
  isFailure: false,
  errorText: undefined,

  isFullNameFocused: false,
  isFullNameValid: true,
  isMobileFocused: false,
  isMobileValid: true,
  isYearOfBirthValid: true,
  isYearOfBirthFocused: false,
  isEmailValid: true,
  isEmailFocused: false,
  isCurrentPlaceValid: true,
  isCurrentPlaceFocused: false,
  isFacebookValid: true,
  isFacebookFocused: false,

  errorTextInput: undefined,
  pickerDate: '1998/09/05',
  canShowDatePicker: false,
  errorMessage: undefined,
  canShowCamera: false,
  avatar: '',
};

const CreateCustomer = createSlice({
  name: 'CreateCustomer',
  initialState: initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      const {value} = action.payload;
      state.errorMessage = value;
    },
    updateErrorText: (state, action) => {
      state.errorText = null;
    },
    onCloseErrorPopUp: (state, action) => {
      state.errorText = null;
    },
    postCreateCustomerStart: (state, action) => {
      state.isSubmitting = true;
      state.isSuccess = false;
      state.isFailure = false;
      state.errorText = null;
    },
    postCreateCustomerSuccess: (state, action) => {
      state.isSubmitting = false;
      state.isSuccess = true;
      state.isFailure = false;
      state.errorText = null;
    },
    postCreateCustomerFaild: (state, action) => {
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

        case 'mobile':
          state.isMobileValid = isValid;
          state.isMobileFocused = isValid;
          state.errorMessage = isValid;
          break;

        case 'yearOfBirth':
          state.isYearOfBirthValid = isValid;
          state.isYearOfBirthFocused = isValid;
          break;

        case 'email':
          state.isEmailValid = isValid;
          state.isEmailFocused = isValid;
          state.errorMessage = isValid;
          break;

        case 'currentPlace':
          state.isCurrentPlaceValid = isValid;
          state.isCurrentPlaceFocused = isValid;
          break;

        case 'facebook':
          state.isFacebookValid = isValid;
          state.isFacebookFocused = isValid;
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
    setCanShowDatePicker: (state, action) => {
      const {value} = action.payload;
      state.canShowDatePicker = value;
    },
    setPickerDate: (state, action) => {
      const {value} = action.payload;
      state.pickerDate = value;
    },
    setCanShowCamera: (state, action) => {
      const {value} = action.payload;
      state.canShowCamera = value;
    },
    setData0: (state, action) => {
      const {value} = action.payload;
      state.avatar = value;
    },
    resetState:(state,action)=>{}
  },
});

const {reducer, actions} = CreateCustomer;
export const {
  postCreateCustomerStart,
  postCreateCustomerFaild,
  postCreateCustomerSuccess,
  updateErrorText,
  updateInputValid,
  onCloseErrorPopUp,
  sendErrorInput,
  onCloseSuccessPopUp,
  setCanShowDatePicker,
  setPickerDate,
  setErrorMessage,
  setCanShowCamera,
  setData0,
  resetState
} = actions;

const withCreateCustomer = (state, action) => {
  if (action.type === 'CreateCustomer/resetState') {
    state = undefined;
  }
  return reducer(state, action);
};

export default withCreateCustomer;
