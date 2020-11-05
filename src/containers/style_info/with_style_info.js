import {createSlice} from '@reduxjs/toolkit';
import React, {useReducer} from 'react';

const initialState = {
  isLoading: false,
  isSuccess: false,

  styleInfoData: {},
  serviceId: '',
};

const StyleInfoAccount = createSlice({
  name: 'StyleInfoAccount',
  initialState: initialState,
  reducers: {
    deleteStyleLoading: (state, action) => {
      state.isLoading = true;
    },
    deleteStyleSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    deleteStyleFaild: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
    },
    sendStyleInfoData: (state, action) => {
      const {styleInfoData, serviceId} = action.payload;
      state.styleInfoData = styleInfoData;
      state.serviceId = serviceId;
    },

    updateStyleInfoData: (state, action) => {
      state.styleInfoData = action?.payload?.data;
    },
  },
});

const {reducer, actions} = StyleInfoAccount;
export const {
  deleteStyleLoading,
  deleteStyleSuccess,
  deleteStyleFaild,
  sendStyleInfoData,
  updateStyleInfoData,
} = actions;

const reducerWrapper = (state, action) => {
  // if (action.type === 'ServiceListAccount/getAllServicesLoading') {
  //   state = undefined;
  // }

  return reducer(state, action);
};

export default reducerWrapper;
