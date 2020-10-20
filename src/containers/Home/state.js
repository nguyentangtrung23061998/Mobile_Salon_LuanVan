import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  data: {},
};

const HomeAccount = createSlice({
  name: 'HomeAccount',
  initialState: initialState,
  reducers: {
    setData: (state, action) => {
      const {value} = action.payload;
      state.data = value;
    },
  },
});

const {reducer, actions} = HomeAccount;
export const {setData} = actions;

const homeReducerWrapper = (state, action) => {
  return reducer(state, action);
};

export default homeReducerWrapper;
