import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  isStoreNameValid: true,
  isDomainNameValid: true,

  isStoreNameFocused: false,
  isDomainNameFocused: false,
  isNumberOfStaffFocused: false,
  isMobileFocused: false,
  isAddressFocused: false,
  isOpenTimeFocused: false,
  isCloseTimeFocused: false,

  canShowTimePicker: undefined,
  popUpTitle: undefined,

  isLoading: undefined,

  errorMessage: undefined,
  successMessage: undefined,

  data: undefined,
  pickerOpenTime: '08:30',
  pickerCloseTime: '18:30',

  canShowOpenTimePicker: undefined,
  canShowCloseTimePicker: undefined,
  canShowCamera: false,
};

const StoreInfoAccount = createSlice({
  name: 'StoreInfoAccount',
  initialState: initialState,
  reducers: {
    resetData: (state, action) => {
      const {value} = action.payload;
      state.data = value;
    },
    setData: (state, action) => {
      const {value} = action.payload;
      const {openTime, closeTime} = value;
      state.data = value;
      if (openTime) {
        state.pickerOpenTime = openTime;
      }
      if (closeTime) {
        state.pickerCloseTime = closeTime;
      }
    },
    setOpenTime: (state, action) => {
      const {value} = action.payload;
      state.data.openTime = value;
    },
    setCloseTime: (state, action) => {
      const {value} = action.payload;
      state.data.closeTime = value;
    },
    setCanShowOpenTimePicker: (state, action) => {
      const {value} = action.payload;
      state.canShowOpenTimePicker = value;
    },
    setCanShowCloseTimePicker: (state, action) => {
      const {value} = action.payload;
      state.canShowCloseTimePicker = value;
    },

    setCanShowTimePicker: (state, action) => {
      const {titleText, value} = action.payload;
      state.popUpTitle = titleText;
      state.canShowTimePicker = value;
    },
    updateStoreLoading: (state, action) => {
      state.isLoading = true;
    },
    updateStoreSuccess: (state, action) => {
      const {data, message} = action.payload;
      state.isLoading = false;
      state.data = data;
      state.successMessage = message;

      state.canShowSuccessPopUp = true;
    },
    updateStoreFaild: (state, action) => {
      const {message} = action.payload;
      state.isLoading = false;
      state.errorMessage = message;
    },

    updateInputValid: (state, action) => {
      const name = action.payload.name;
      const isValid = action.payload.isValid;
      switch (name) {
        case 'name':
          state.isStoreNameValid = isValid;
          state.isStoreNameFocused = isValid;
          break;
        case 'domainAddress':
          state.isDomainNameValid = isValid;
          state.isDomainNameFocused = isValid;
          break;
        case 'numberEmployee':
          state.isNumberOfStaffFocused = isValid;
          break;
        case 'mobile':
          state.isMobileFocused = isValid;
          break;
        case 'address':
          state.isAddressFocused = isValid;
          break;
        case 'openTime':
          state.isOpenTimeFocused = isValid;
          break;
        case 'closeTime':
          state.isCloseTimeFocused = isValid;
          break;
      }
    },

    setCoverImage: (state, action) => {
      state.data.image[0] = action?.payload;
    },
    setCanShowSuccessPopUp: (state, action) => {
      state.canShowSuccessPopUp = action?.payload;
    },

    setTime: (state, action) => {
      const {name, value} = action.payload;
      if (name === 'Giờ mở cửa') {
        state.data.openTime = value;
      } else {
        state.data.closeTime = value;
      }
    },

    setInputValue: (state, action) => {
      const {key, value} = action.payload;
      switch (key) {
        case 'name':
          state.data.name = value;
          break;
        case 'domainAddress':
          state.data.domainAddress = value;
          break;
        case 'numberEmployee':
          state.data.numberEmployee = value;
          break;
        case 'mobile':
          state.data.mobile = value;
          break;
        case 'address':
          state.data.address = value;
          break;
        case 'image':
          state.data.image = value;
      }
    },

    setPickerOpenTime: (state, action) => {
      const {value} = action.payload;
      state.pickerOpenTime = value;
    },
    setPickerCloseTime: (state, action) => {
      const {value} = action.payload;
      state.pickerCloseTime = value;
    },

    setSuccessMessage: (state, action) => {
      const {value} = action.payload;
      state.successMessage = value;
    },

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

const {reducer, actions} = StoreInfoAccount;
export const {
  updateStoreLoading,
  updateStoreSuccess,
  updateStoreFaild,
  updateInputValid,
  setCoverImage,
  setCanShowSuccessPopUp,
  setMsgErr,
  setCanShowTimePicker,
  setTime,
  setInputValue,
  setCanShowOpenTimePicker,
  setOpenTime,
  setPickerOpenTime,
  setCanShowCloseTimePicker,
  setPickerCloseTime,
  setCloseTime,
  setData,
  setSuccessMessage,
  setErrorMessage,
  setCanShowCamera,
  resetData,
} = actions;

const reducerWrapper = (state, action) => {
  return reducer(state, action);
};

export default reducerWrapper;
