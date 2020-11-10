import {createSlice} from '@reduxjs/toolkit';
import reactotron from 'reactotron-react-native';
import moment from 'moment';

const initialState = {
  isSubmitting: false,
  isSuccess: false,
  isFailure: false,
  errorText: null,

  isFullNameFocused: false,
  isFullNameValid: true,
  isPositionFocused: false,
  isPosistionValid: true,
  isUsernameValid: true,
  isUsernameFocused: false,
  isHowTownValid: true,
  isHowTownFocused: false,
  isYearOfBirthValid: true,
  isYearOfBirthFocused: false,
  isCurrentPlaceValid: true,
  isCurrentPlaceFocused: false,
  isIdentityCardValid: true,
  isIdentityCardFocused: false,
  isMobileValid: true,
  isMobileFocused: false,
  isEmailValid: true,
  isEmailFocused: false,
  data: undefined,
  isShowPopupSuccess: undefined,
  canShowCamera: false,
  canShowDatePicker: false,
  dateOfDatePicker: null,
};

const EditStaff = createSlice({
  name: 'EditStaff',
  initialState: initialState,
  reducers: {
    setCanShowDatePicker: (state, action) => {
      state.canShowDatePicker = action.payload;
    },
    setData: (state, action) => {
      const data = action.payload;
      const {yearOfBirth} = data;
      state.data = data;
      if (yearOfBirth === '') {
        state.dateOfDatePicker = yearOfBirth;
      }
      if (yearOfBirth !== '') {
        const date0 = moment(yearOfBirth, 'DD/MM/YYYY').format('YYYY/MM/DD');
        state.dateOfDatePicker = date0;
      }
    },
    updateErrorText: (state, action) => {
      state.errorText = null;
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

        case 'username':
          state.isUsernameValid = isValid;
          state.isUsernameFocused = isValid;
          break;

        case 'homeTown':
          state.isHowTownValid = isValid;
          state.isHowTownFocused = isValid;
          break;

        case 'yearOfBirth':
          state.isYearOfBirthValid = isValid;
          state.isYearOfBirthFocused = isValid;
          break;

        case 'currentPlace':
          state.isCurrentPlaceValid = isValid;
          state.isCurrentPlaceFocused = isValid;
          break;

        case 'identityCard':
          state.isIdentityCardValid = isValid;
          state.isIdentityCardFocused = isValid;
          break;

        case 'mobile':
          state.isMobileValid = isValid;
          state.isMobileFocused = isValid;
          break;

        case 'email':
          state.isEmailValid = isValid;
          state.isEmailFocused = isValid;
      }
    },
    putUpdateStaffStart: (state, action) => {
      state.isSubmitting = true;
      state.isSuccess = false;
      state.isFailure = false;
      state.errorText = null;
    },
    putUpdateStaffSuccess: (state, action) => {
      state.isSubmitting = false;
      state.isSuccess = true;
      state.isFailure = false;
      state.errorText = null;
      state.isShowPopupSuccess = true;
    },
    putUpdateStaffFaild: (state, action) => {
      state.isSubmitting = false;
      state.isSuccess = false;
      state.isFailure = true;
      state.errorText = action.payload.errMsg;
    },
    changePasswordEmployeeLoading: (state, action) => {
      state.isSubmitting = true;
      state.isSuccess = false;
      state.isFailure = false;
      state.errorText = null;
    },
    changePasswordEmployeeSuccess: (state, action) => {
      state.isSubmitting = false;
      state.isSuccess = true;
      state.isFailure = false;
      state.errorText = null;
      state.canShowSuccess = true;
    },
    changePasswordEmployeeFaild: (state, action) => {
      state.isSubmitting = false;
      state.isSuccess = false;
      state.isFailure = true;
      state.errorText = action.payload.errMsg;
    },
    onCloseSuccessPopUp: (state, action) => {
      state.isShowPopupSuccess = null;
    },
    onCloseSuccess: (state, action) => {
      state.canShowSuccess = null;
    },
    setCanShowCamera: (state, action) => {
      const {value} = action.payload;
      state.canShowCamera = value;
    },
    setData0: (state, action) => {
      const {value} = action.payload;
      state.data.avatar = value;
    },
    setYearOfBirth: (state, action) => {
      state.data.yearOfBirth = action.payload;
    },
    setPickerDate: (state, action) => {
      const {value} = action.payload;
      state.dateOfDatePicker = value;
    },

    setDateOfDatePicker: (state, action) => {
      state.dateOfDatePicker = action.payload;
    },
  },
});

const {reducer, actions} = EditStaff;
export const {
  putUpdateStaffStart,
  putUpdateStaffFaild,
  putUpdateStaffSuccess,
  updateErrorText,
  updateInputValid,
  setData,
  updateCanShowSuccess,
  changePasswordEmployeeLoading,
  changePasswordEmployeeSuccess,
  changePasswordEmployeeFaild,
  onCloseSuccessPopUp,
  onCloseSuccess,
  setCanShowCamera,
  setData0,
  setCanShowDatePicker,
  setPickerDate,
  setDateOfDatePicker,
  setYearOfBirth,
} = actions;

const reducerWrapper = (state, action) => {
  return reducer(state, action);
};

export default reducerWrapper;
