import {createSlice} from '@reduxjs/toolkit';
import reactotron from 'reactotron-react-native';

const initialState = {
  isLoading: false,
  isSuccess: false,
  successMessage: null,
  errorMessage: null,
  styleInfoData: {},
  serviceId: '',
  isDeleteSuccess: undefined,
  canShowDeleteStylePopUp: false,
  role:''
};

const StyleInfoAccount = createSlice({
  name: 'StyleInfoAccount',
  initialState: initialState,
  reducers: {
    setCanShowDeleteStylePopUp: (state, action) => {
      state.canShowDeleteStylePopUp = action.payload;
    },
    deleteStyleLoading: (state, action) => {
      state.isLoading = true;
    },
    deleteStyleSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isDeleteSuccess = true;
      const {message} = action.payload;
      state.successMessage = message;
      
    },
    deleteStyleFaild: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      const {message} = action.payload;
      state.errorMessage = message;
    },
    sendStyleInfoData: (state, action) => {
      const {styleInfoData, serviceId} = action.payload;
      state.styleInfoData = styleInfoData;
      state.serviceId = serviceId;
    },

    updateStyleInfoData: (state, action) => {
      const {data} = action.payload;
      state.styleInfoData = data;
    },
    setErrorMessage:(state,action)=>{
      const {value} = action.payload;
      state.errorMessage = value;
    },

    setSuccessMessage:(state,action)=>{
      const {value} = action.payload;
      state.successMessage = value;
    },
    setRole: (state,action) =>{
      const{value} = action.payload;
      state.role = value;
    }
  },
});

const {reducer, actions} = StyleInfoAccount;
export const {
  deleteStyleLoading,
  deleteStyleSuccess,
  deleteStyleFaild,
  sendStyleInfoData,
  updateStyleInfoData,
  setCanShowDeleteStylePopUp,
  setErrorMessage,
  setSuccessMessage,
  setRole
} = actions;

const reducerWrapper = (state, action) => {
  return reducer(state, action);
};

export default reducerWrapper;
