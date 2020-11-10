import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isSubmitting: false,
  isSuccess: false,
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
  canShowSuccess: undefined,
  canShowCamera: false,
  canShowDatePicker: false,
  pickerDate: '1998/09/05',
};

const EditCustomer = createSlice({
  name: 'EditCustomer',
  initialState: initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    onCloseErrorPopUp: (state, action) => {
      state.errorText = null;
    },
    postEditCustomerStart: (state, action) => {
      state.isSubmitting = true;
      state.isSuccess = false;
      state.isFailure = false;
      state.errorText = null;
    },
    postEditCustomerSuccess: (state, action) => {
      state.isSubmitting = false;
      state.isSuccess = true;
      state.isFailure = false;
      state.errorText = null;
      state.canShowSuccess = true;
    },
    postEditCustomerFaild: (state, action) => {
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
          break;

        case 'mobile':
          state.isMobileValid = isValid;
          state.isMobileFocused = isValid;
          break;

        case 'yearOfBirth':
          state.isYearOfBirthValid = isValid;
          state.isYearOfBirthFocused = isValid;
          break;

        case 'email':
          state.isEmailValid = isValid;
          state.isEmailFocused = isValid;
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
    onCloseSuccessPopUp: (state, action) => {
      state.isSuccess = null;
    },
    setCanShowCamera: (state, action) => {
      const {value} = action.payload;
      state.canShowCamera = value;
    },
    setCanShowDatePicker: (state, action) => {
      const {value} = action.payload;
      state.canShowDatePicker = value;
    },
    setPickerDate: (state, action) => {
      const {value} = action.payload;
      state.pickerDate = value;
    },
    setData0: (state, action) => {
      const {value} = action.payload;
      state.data.avatar = value;
    },
  },
});

const {reducer, actions} = EditCustomer;
export const {
  postEditCustomerStart,
  postEditCustomerFaild,
  postEditCustomerSuccess,
  onCloseErrorPopUp,
  updateInputValid,
  setData,
  onCloseSuccessPopUp,
  setCanShowCamera,
  setCanShowDatePicker,
  setPickerDate,
  setData0,
} = actions;

const withEditCustomer = (state, action) => {
  return reducer(state, action);
};

export default withEditCustomer;
