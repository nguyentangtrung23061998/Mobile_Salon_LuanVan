import {createSlice} from '@reduxjs/toolkit';
import React, {useReducer} from 'react';

const initialState = {
  data: {},
};

const ProfileAccount = createSlice({
  name: 'ProfileAccount',
  initialState: initialState,
  reducers: {
    setData: (state, action) => {
      const {value} = action.payload;
      state.data = value;
    }
  },
});

const {reducer, actions} = ProfileAccount;
export const {setData} = actions;

const reducerWrapper = (state, action) => {
  // if (action.type === 'ServiceListAccount/getAllServicesLoading') {
  //   state = undefined;
  // }

  return reducer(state, action);
};

export default reducerWrapper;
