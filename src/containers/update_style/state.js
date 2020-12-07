import {createSlice} from '@reduxjs/toolkit';
import reactotron from 'reactotron-react-native';
const initialState = {
  data: {},

  isStyleNameValid: true,
  isStylePriceValid: true,
  isStyleNameFocused: false,
  isStylePriceFocused: false,
  serviceId: '',

  isLoading: false,
  isSuccess: false,
  canShowSuccess: undefined,

  successMessage: '',
  errorMessage: '',

  canShowSelectPicker: false,
};

const updateStyleSlice = createSlice({
  name: 'updateStyle',
  initialState: initialState,
  reducers: {
    setCanShowSelectPicker: (state, action) => {
      const {value} = action.payload;
      state.canShowSelectPicker = value;
    },
    setDataUpdateStyle0: (state, action) => {
      state.data = action.payload.data;
    },

    updateStyle: (state, action) => {},

    getImagePath: (state, action) => {
      const {name, path} = action.payload;
      switch (name) {
        case 'first':
          state.firstImg = path;
          break;
        case 'second':
          state.secondImg = path;
          break;
        case 'third':
          state.thirdImg = path;
          break;
        case 'fourth':
          state.fourthImg = path;
          break;
      }
    },
    updateInputValid: (state, action) => {
      const name = action.payload.name;
      const isValid = action.payload.isValid;
      if (name === 'name') {
        state.isStyleNameValid = isValid;
        state.isStyleNameFocused = isValid;
      } else {
        state.isStylePriceValid = isValid;
        state.isStylePriceFocused = isValid;
      }
    },

    updateStyleLoading: (state, action) => {
      state.isLoading = true;
    },
    updateStyleSuccess: (state, action) => {
      const {message, data} = action.payload;
      state.successMessage = message;
      state.isLoading = false;
      state.isSuccess = true;
      state.canShowSuccess = true;
    },
    updateStyleFaild: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      const {errorMessage} = action.payload;
      state.errorMessage = errorMessage;
    },
    updateCanShowSuccess: (state, action) => {
      state.canShowSuccess = false;
    },

    setSuccessMessage: (state, action) => {
      const {value} = action.payload;
      state.successMessage = value;
    },

    setErrorMessage: (state, action) => {
      const {value} = action.payload;
      state.errorMessage = value;
    },
    setData: (state) => {
      state.data.maxImageFiles = state.data.maxImageFiles + 1;
    },
    setData0: (state, action) => {
      const {value} = action.payload;
      state.data?.image?.splice(value, 1);
    },
    setData1: (state) => {
      state.data.maxImageFiles = state.data.maxImageFiles - 1;
    },
    setData2: (state, action) => {
      const {value} = action.payload;
      if (
        state?.data?.image[0] &&
        state?.data?.image[1] &&
        state?.data?.image[2] &&
        !state?.data?.image[3]
      ) {
        if (value[0]) {
          state.data.image[3] = value[0];
        }
      }
      if (
        state?.data?.image[0] &&
        state?.data?.image[1] &&
        !state?.data?.image[2] &&
        !state?.data?.image[3]
      ) {
        if (value[0]) {
          state.data.image[2] = value[0];
        }
        if (value[1]) {
          state.data.image[3] = value[1];
        }
      }
      if (
        state?.data?.image[0] &&
        !state?.data?.image[1] &&
        !state?.data?.image[2] &&
        !state?.data?.image[3]
      ) {
        if (value[0]) {
          state.data.image[1] = value[0];
        }
        if (value[1]) {
          state.data.image[2] = value[1];
        }
        if (value[2]) {
          state.data.image[3] = value[2];
        }
      }
      if (
        !state?.data?.image[0] &&
        !state?.data?.image[1] &&
        !state?.data?.image[2] &&
        !state?.data?.image[3]
      ) {
        if (value[0]) {
          state.data.image[0] = value[0];
        }
        if (value[1]) {
          state.data.image[1] = value[1];
        }
        if (value[2]) {
          state.data.image[2] = value[2];
        }
        if (value[3]) {
          state.data.image[3] = value[3];
        }
      }
    },
    setData3: (state, action) => {
      const {value} = action.payload;
      state.data.note = value;
    },

    resetState: () => {},
  },
});

const {reducer, actions} = updateStyleSlice;
export const {
  updateStyle,
  sendUpdateStyleData,
  getImagePath,
  updateInputValid,
  updateStyleLoading,
  updateStyleSuccess,
  updateStyleFaild,
  updateCanShowSuccess,
  setSuccessMessage,
  setErrorMessage,
  resetState,
  setDataUpdateStyle0,
  setData,
  setData0,
  setData1,
  setData2,
  setData3,
  setCanShowSelectPicker,
} = actions;

export default (state, action) => {
  if (action.type === 'updateStyle/resetState') {
    state = undefined;
  }
  return reducer(state, action);
};
