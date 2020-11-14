import {createSlice} from '@reduxjs/toolkit';
import reactotron from 'reactotron-react-native';

const initialState = {
  isFullNameFocused: false,
  isMobileFocused: false,
  isFullNameValid: true,
  isMobileValid: true,
  isLoading: false,
  errorMessage: '',
  successMessage: '',
};
export const reducerName = 'addCustomer1';
const slice = createSlice({
  name: reducerName,
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

    createCustomerLoading: (state, action) => {
      state.isLoading = true;
    },
    createCustomerSuccess: (state, action) => {
      state.isLoading = false;
      const {message} = action.payload;
      state.successMessage = message;
    },
    createCustomerFaild: (state, action) => {
      state.isLoading = false;
      const {message} = action.payload;
      state.errorMessage = message;
    },
    setInputValues: (state, action) => {
      const {name, value} = action.payload;
      if (name === 'fullname') {
        state.isFullNameFocused = value;
        state.isFullNameValid = value;
      }
      if (name === 'mobile') {
        state.isMobileFocused = value;
        state.isMobileValid = value;
      }
    },
    resetState: () => {},
  },
});

const {reducer, actions} = slice;

export const {
  resetState,
  setInputValues,
  createCustomerLoading,
  createCustomerSuccess,
  createCustomerFaild,
  setErrorMessage,
  setSuccessMessage,
} = actions;

export default (state, action) => {
  if (action.type === `${reducerName}/resetState`) {
    state = undefined;
  }
  return reducer(state, action);
};
