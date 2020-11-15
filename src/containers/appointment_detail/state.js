import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  data: undefined,
  isLoading: undefined,
  msgSuccess: undefined,
  msgErr: undefined,
};

const slice = createSlice({
  name: 'appointmentDetail',
  initialState: initialState,
  reducers: {
    setDataFromUpdateAppointment: (state, action) => {
      const {value} = action.payload;
      state.data = value;
    },
    setMsgErr: (state, action) => {
      state.msgErr = action.payload;
    },
    setMsgSuccess: (state, action) => {
      state.msgSuccess = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    confirmAppointmentSuccessLoading: (state, action) => {
      state.isLoading = true;
    },
    confirmAppointmentSuccessSuccess: (state, action) => {
      const message = action.payload;
      state.msgSuccess = message;
      // state.data.state = 'Đã đến';
      state.isLoading = false;
    },

    confirmAppointmentSuccessFaild: (state, action) => {
      const message = action.payload;
      state.msgErr = message;
      state.isLoading = false;
    },

    cancelAppointmentLoading: (state, action) => {
      state.isLoading = true;
    },
    cancelAppointmentSuccess: (state, action) => {
      const {message} = action.payload;
      state.msgSuccess = message;
      state.data.state = 'Đã hủy';
      state.isLoading = false;
    },
    cancelAppointmentFaild: (state, action) => {
      const {message} = action.payload;
      state.msgErr = message;
      state.isLoading = false;
    },
  },
});

const {reducer, actions} = slice;
export const {
  setData,
  confirmAppointmentSuccessLoading,
  confirmAppointmentSuccessSuccess,
  confirmAppointmentSuccessFaild,
  cancelAppointmentLoading,
  cancelAppointmentSuccess,
  cancelAppointmentFaild,
  setMsgSuccess,
  setMsgErr,
  setDataFromUpdateAppointment,
} = actions;

const wrapper = (state, action) => {
  return reducer(state, action);
};

export default wrapper;
