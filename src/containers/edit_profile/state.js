import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';
import {DEFAULT_PICKER_DATE} from '../../constants/app';

const initialState = {
  canShowCamera: false,
  data: {},

  canShowDatePicker: false,
  pickerDate: '',

  isFullNameFocused: false,
  isHomeTownFocused: false,
  isCurrentPlaceFocused: false,
  isIdentityCardFocused: false,
  isMobileFocused: false,
  isEmailFocused: false,

  isFullNameValid: true,
  isMobileValid: true,
  isEmailValid: true,

  isLoading: undefined,
  errorMessage: undefined,
  successMessage: undefined,
};

const editProfile = createSlice({
  name: 'editProfile',
  initialState: initialState,

  reducers: {
    setErrorMessage: (state, action) => {
      const {value} = action.payload;
      state.errorMessage = value;
    },
    setSuccessMessage: (state, action) => {
      const {value} = action.payload;
      state.successMessage = value;
    },
    updateProfileLoading: (state, action) => {
      state.isLoading = true;
    },
    updateProfileSuccess: (state, action) => {
      const {message} = action.payload;
      state.isLoading = false;
      state.successMessage = message;
    },
    updateProfileFaild: (state, action) => {
      const {message} = action.payload;
      state.isLoading = false;
      state.errorMessage = message;
    },

    initPickerDate: (state, action) => {
      const {value} = action.payload;
      if (value) {
        state.pickerDate = moment(value, 'DD/MM/YYYY').format('YYYY/MM/DD');
      } else {
        state.pickerDate = DEFAULT_PICKER_DATE;
      }
    },

    setCanShowDatePicker: (state, action) => {
      const {value} = action.payload;
      state.canShowDatePicker = value;
    },

    setPickerDate: (state, action) => {
      const {value} = action.payload;

      state.pickerDate = value;
    },

    resetPickerDate: (state, action) => {
      state.pickerDate = moment(state?.data?.yearOfBirth, 'DD/MM/YYYY').format(
        'YYYY/MM/DD',
      );
    },

    setData: (state, action) => {
      const {value} = action.payload;
      state.data = value;
    },

    resetData: (state, action) => {
      const {value} = action.payload;
      state.data = value;
    },

    setCanShowCamera: (state, action) => {
      const {value} = action.payload;
      state.canShowCamera = value;
    },

    setIsInputFieldFocused: (state, action) => {
      const {key, value} = action.payload;
      switch (key) {
        case 'fullname':
          state.isFullNameFocused = value;
          state.isFullNameValid = value;
          break;
        case 'homeTown':
          state.isHomeTownFocused = value;
          break;
        case 'currentPlace':
          state.isCurrentPlaceFocused = value;
          break;
        case 'identityCard':
          state.isIdentityCardFocused = value;
          break;
        case 'email':
          state.isEmailFocused = value;
          state.isEmailValid = value;
          break;
        case 'mobile':
          state.isMobileFocused = value;
          state.isMobileValid = value;
      }
    },
  },
});

const {reducer, actions} = editProfile;

export const {
  setCanShowCamera,
  updateInputFocused,
  setData,
  setPickerDate,
  setCanShowDatePicker,
  setIsInputFieldFocused,
  resetPickerDate,
  initPickerDate,
  updateProfileLoading,
  updateProfileSuccess,
  updateProfileFaild,
  setSuccessMessage,
  setErrorMessage,
  resetData,
} = actions;

export default reducer;
