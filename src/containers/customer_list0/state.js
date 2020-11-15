import {createSlice} from '@reduxjs/toolkit';
import reactotron from 'reactotron-react-native';

const initialState = {
  searchText: '',
  isLoading: false,
  isEnabled: false,
  canShowSearchList: false,
  data: [],
  searchData: [],
};
export const sliceName = 'customerList0';
const slice = createSlice({
  name: sliceName,
  initialState: initialState,
  reducers: {
    setSearchText: (state, action) => {
      const {value} = action.payload;
      state.searchText = value;
    },

    getAllCustomersLoading: (state, action) => {
      state.isLoading = true;
    },
    getAllCustomersSuccess: (state, action) => {
      state.isLoading = false;
      const {data} = action.payload;
      state.data = data;
      state.isEnabled = true;
    },
    getAllCustomersFaild: (state, action) => {
      state.isLoading = false;
      state.isEnabled = true;
    },

    searchCustomersLoading: (state, action) => {},
    searchCustomersSuccess: (state, action) => {
      const {data} = action.payload;
      state.searchData = data;
    },
    searchCustomersFaild: (state, action) => {},

    setcanShowSearchList: (state, action) => {
      const {value} = action.payload;
      state.canShowSearchList = value;
    },

    resetState: () => {},
  },
});

const {reducer, actions} = slice;

export const {
  resetState,
  setSearchText,
  getAllCustomersLoading,
  getAllCustomersSuccess,
  getAllCustomersFaild,
  setcanShowSearchList,
  searchCustomersLoading,
  searchCustomersSuccess,
  searchCustomersFaild,
} = actions;

export default (state, action) => {
  if (action.type === `${sliceName}/resetState`) {
    state = undefined;
  }
  return reducer(state, action);
};
