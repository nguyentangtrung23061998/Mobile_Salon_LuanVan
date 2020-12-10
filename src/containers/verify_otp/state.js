import {createSlice} from '@reduxjs/toolkit';
import {OTP_COUNT_DOWN} from '../../constants/app';
const initialState = {
  counter: OTP_COUNT_DOWN,
  otp: '',
  status:true
};

const verifyOtp = createSlice({
  name: 'verifyOtp',
  initialState: initialState,
  reducers: {
    setCounter: (state, action) => {
      const type = action.payload;
      if (type === 'start') {
        state.counter = state.counter - 1;
      }
      if (type === 'restart') {
        state.counter = OTP_COUNT_DOWN;
      }
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    onCloseErrorPopUp:(state,action)=>{
      state.status = action.payload;
    }
  },
});

const {reducer, actions} = verifyOtp;
export const {verifyOtpAction, 
            setCounter, 
            setOtp,
            onCloseErrorPopUp} = actions;

const verifyOtpReducerWrapper = (state, action) => {
  // if (action.type === 'app/setAuth') {
  //   state = undefined;
  // }
  return reducer(state, action);
};

export default verifyOtpReducerWrapper;
