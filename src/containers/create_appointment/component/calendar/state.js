import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  canShowTimePicker: false,
  pickerTime: '',
};

const CalendarOrder = createSlice({
  name: 'StoreInfoAccount',
  initialState: initialState,
  reducers: {
    setCanShowTimePicker: (state, action) => {
      const {value} = action.payload;
      state.canShowTimePicker = value;
    },
    setPickerTime: (state, action) => {
      const {value} = action.payload;
      state.pickerTime = value;
    },
  },
});

const {reducer, actions} = CalendarOrder;
export const {setCanShowTimePicker, setPickerTime} = actions;

const reducerWrapper = (state, action) => {
  return reducer(state, action);
};

export default reducerWrapper;
