import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

const SignUpSuccessAccount = createSlice({
  name: 'SignUpSuccessAccount',
  initialState: initialState,
  reducers: {},
});

const {reducer, actions} = SignUpSuccessAccount;
export const {} = actions;

const reducerWrapper = (state, action) => {
  return reducer(state, action);
};

export default reducerWrapper;
