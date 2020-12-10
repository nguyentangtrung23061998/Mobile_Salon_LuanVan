import {createSlice} from '@reduxjs/toolkit';
import reactotron from 'reactotron-react-native';
const initialState = {
  isPhoneFocused: false,
  isPhoneValid: true,
  canShowSendPhonePopUp: false,
  mobile:'',
  otp:'',
  status:true,
  errorMsg:''
};

const forgotPassword = createSlice({
  name: 'forgotPassword',
  initialState: initialState,
  reducers: {
    setIsPhoneFocused: (state, action) => {
      state.isPhoneFocused = action.payload;
      state.isPhoneValid = action.payload;
    },
    setCanShowSendPhonePopUp: (state, action) => {
      state.canShowSendPhonePopUp = action.payload;
    },
    setMobile: (state,action)=>{
      state.mobile = action.payload;
    },
    setOtp:(state,action)=>{
      state.otp =action.payload;
    },
    setMobileStattus: (state, action) =>{
      state.status = action.payload;
    },
    onCloseErrorPopUp:(state,action)=>{
      state.status = action.payload;
    }
  },
});

const {reducer, actions} = forgotPassword;
export const {
  forgotPasswordAction,
  setIsPhoneFocused,
  setCanShowSendPhonePopUp,
  setMobile,
  setOtp,
  setMobileStattus,
  onCloseErrorPopUp
} = actions;

const forgotPasswordReducerWrapper = (state, action) => {
  // if (action.type === 'app/setAuth') {
  //   state = undefined;
  // }
  return reducer(state, action);
};

export default forgotPasswordReducerWrapper;
