import {createSlice} from '@reduxjs/toolkit';
import reactotron from 'reactotron-react-native';

const initialState = {};
export const reducerName = 'analytic';
const slice = createSlice({
  name: reducerName,
  initialState: initialState,
  reducers: {
    resetState: () => {},
  },
});

const {reducer, actions} = slice;

export const {resetState} = actions;

export default (state, action) => {
  if (action.type === `${reducerName}/resetState`) {
    state = undefined;
  }
  return reducer(state, action);
};
