import {createSlice} from '@reduxjs/toolkit';
import reactotron from 'reactotron-react-native';
import {PAID_STATUS, CANCELLED_STATUS} from '../../../constants/api';

const initialState = {
  data: {},
  isLoading: false,
  successMessage: '',
  errorMessage: '',
  canShowCancelPopUp: false,
};

const infoOrder = createSlice({
  name: 'infoOrder',
  initialState: initialState,
  reducers: {
    setCanShowCancelPopUp: (state, action) => {
      const {value} = action.payload;
      state.canShowCancelPopUp = value;
    },

    setDataInfoOrder1: (state, action) => {
      const {value} = action.payload;
      state.data = value;
    },

    setSuccessMessage: (state, action) => {
      const {value} = action.payload;
      state.successMessage = value;
    },
    setErrorMessage: (state, action) => {
      const {value} = action.payload;
      state.errorMessage = value;
    },
    cancelOrderLoading: (state, action) => {
      state.isLoading = true;
    },
    cancelOrderSuccess: (state, action) => {
      state.isLoading = false;
      const {message} = action.payload;
      state.successMessage = message;
      state.data.status = CANCELLED_STATUS;
    },
    cancelOrderFaild: (state, action) => {
      state.isLoading = false;
      const {message} = action.payload;
      state.errorMessage = message;
    },

    finishOrderLoading: (state, action) => {
      state.isLoading = true;
    },
    finishOrderSuccess: (state, action) => {
      state.isLoading = false;
      const {message} = action.payload;
      state.successMessage = message;
      // state.data.status = PAID_STATUS;
    },
    finishOrderFaild: (state, action) => {
      state.isLoading = false;
      const {message} = action.payload;
      state.errorMessage = message;
    },

    setDataInfoOrder0: (state, action) => {
      const {value} = action.payload;
      state.data = value;
    },
  },
});

const {reducer, actions} = infoOrder;
export const {
  setDataInfoOrder0,
  cancelOrderLoading,
  cancelOrderSuccess,
  cancelOrderFaild,
  setSuccessMessage,
  setErrorMessage,
  finishOrderLoading,
  finishOrderSuccess,
  finishOrderFaild,
  setDataInfoOrder1,
  setCanShowCancelPopUp,
} = actions;

const infoOrderReducerWrapper = (state, action) => {
  // if (action.type === 'app/setAuth') {
  //   state = undefined;
  // }
  return reducer(state, action);
};

export default infoOrderReducerWrapper;
