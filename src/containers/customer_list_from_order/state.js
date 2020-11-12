import {createSlice} from '@reduxjs/toolkit';
import reactotron from 'reactotron-react-native';

const initialState = {
  isLoading: false,
  canShowUI: false,
  data: [],
};

const slice = createSlice({
  name: 'customerListFromOrder',
  initialState: initialState,
  reducers: {
    getAllCustomersLoading: (state, action) => {
      state.isLoading = true;
    },
    getAllCustomersSuccess: (state, action) => {
      const {data} = action.payload;
      state.isLoading = false;
      state.canShowUI = true;
      state.data = data;
    },
    getAllCustomersFaild: (state, action) => {
      state.isLoading = false;
      state.canShowUI = true;
    },

    resetState: (state, action) => {},
  },
});

const {reducer, actions} = slice;

export const {
  getAllCustomersLoading,
  getAllCustomersSuccess,
  getAllCustomersFaild,
  resetState,
} = actions;

export default (state, action) => {
  if (action.type === 'customerListFromOrder/resetState') {
    state = undefined;
  }
  return reducer(state, action);
};
