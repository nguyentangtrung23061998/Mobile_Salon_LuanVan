import {createSlice} from '@reduxjs/toolkit';
const initialState = {};

const slice = createSlice({
  name: 'timePicker',
  initialState: initialState,
  reducers: {},
});

const {reducer, actions} = slice;

export const {} = actions;

const wrapper = (state, action) => {
  return reducer(state, action);
};

export default wrapper;
