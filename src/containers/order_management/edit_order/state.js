import {createSlice} from '@reduxjs/toolkit';
import reactotron from 'reactotron-react-native';

const initialState = {
  data: {},
  isLoading: false,
  errorMessage: '',
  successMessage: '',
};

const createOder = createSlice({
  name: 'createOder',
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
    updateOrderLoading: (state, action) => {
      state.isLoading = true;
    },
    updateOrderSuccess: (state, action) => {
      state.isLoading = false;
      const {message} = action.payload;
      state.successMessage = message;
    },
    updateOrderFaild: (state, action) => {
      state.isLoading = false;
      const {message} = action.payload;
      state.errorMessage = message;
    },
    setDataEditOrder0: (state, action) => {
      const {value} = action.payload;
      state.data = value;
    },
    setDataEditOrder1: (state, action) => {
      const {id, fullname, mobile} = action.payload;
      state.data.customerName = fullname;
      state.data.mobile = mobile;
      state.data.customerId = id;
    },
    setDataEditOrder2: (state, action) => {
      const {value} = action.payload;
      state.data.services = value;
    },

    setData: (state, action) => {
      const {value} = action.payload;
      state.data.note = value;
    },
  },
});

const {reducer, actions} = createOder;
export const {
  setDataEditOrder0,
  setDataEditOrder1,
  setDataEditOrder2,
  updateOrderLoading,
  updateOrderSuccess,
  updateOrderFaild,
  setErrorMessage,
  setSuccessMessage,
  setData,
} = actions;

const createOderReducerWrapper = (state, action) => {
  return reducer(state, action);
};

export default createOderReducerWrapper;
