import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';
const FORMAT = 'YYYY-MM-DD';
const FORMAT2 = 'DD/MM/YYYY';
const TODAY = moment().format(FORMAT);
const TODAY2 = moment().format(FORMAT2);
export const INIT_CUSTOMER_NAME = 'Chọn khách hàng đặt đơn';
const initialState = {
  selectedPhone: '',
  confirmedDate: TODAY2,
  selectedDate: TODAY,
  markedDates: {[TODAY]: {selected: true}},
  customerName: INIT_CUSTOMER_NAME,
  customerId: '',
  isNumberOfCustomerFocused: false,
  calendarTime: null,
  date: null,
  time: null,
  pickerTime: null,
  canShowCalendar: false,
  isLoading: undefined,
  msgSuccess: undefined,
  msgErr: undefined,
};

const createAppointment = createSlice({
  name: 'createAppointment',
  initialState: initialState,
  reducers: {
    setPickerTime: (state, action) => {
      const {value} = action.payload;
      state.pickerTime = value;
    },
    setCalendarTime: (state, action) => {
      state.calendarTime = action.payload;
    },
    resetCalendarTime: (state, action) => {
      state.calendarTime = state.time;
    },
    setDate: (state, action) => {
      const date = moment(Object.keys(action.payload)[0], 'YYYY-MM-DD').format(
        'DD/MM/YYYY',
      );
      state.date = date;
    },
    setTime: (state, action) => {
      state.time = state.calendarTime;
    },
    setMsgErr: (state, action) => {
      state.msgErr = action.payload;
    },
    setMsgSuccess: (state, action) => {
      state.msgSuccess = action.payload;
    },
    createAppointmentLoading: (state, action) => {
      state.isLoading = true;
    },
    createAppointmentSuccess: (state, action) => {
      const {message, data} = action.payload;
      state.msgSuccess = message;
      state.isLoading = false;
    },
    createAppointmentFaild: (state, action) => {
      state.isLoading = false;
      state.msgErr = action.payload;
    },
    createAppointmentAction: (state, action) => {},
    setSelectedName: (state, action) => {
      const {name, mobile} = action.payload;
      const selectedInfo = name + ' - ' + mobile;
      state.selectedInfo = selectedInfo;
    },
    setSelectedDate: (state, action) => {
      const date0 = action.payload;
      const date1 = {
        [date0]: {selected: true},
      };
      state.markedDates = date1;
    },
    resetSelectedDate: (state, action) => {
      if (state.date) {
        const date0 = moment(state.date, 'DD/MM/YYYY').format('YYYY-MM-DD');
        const date1 = {
          [date0]: {selected: true},
        };
        state.markedDates = date1;
      }
    },
    setCustomerName: (state, action) => {
      state.customerName = action.payload;
    },
    setCustomerName1: (state, action) => {
      const {value} = action.payload;
      state.customerName = value;
    },
    setIsNumberOfCustomerFocused: (state, action) => {
      state.isNumberOfCustomerFocused = action.payload;
    },
    setCanShowCalendar: (state, action) => {
      state.canShowCalendar = action.payload;
    },
    resetCreateAppointment: (state, action) => {},
    setCustomerId1: (state, action) => {
      const {value} = action.payload;
      state.customerId = value;
    },
  },
});

const {reducer, actions} = createAppointment;
export const {
  setDate,
  createAppointmentAction,
  setSelectedName,
  setSelectedDate,
  setCustomerName,
  setIsNumberOfCustomerFocused,
  setCanShowCalendar,
  setCustomerId,
  createAppointmentLoading,
  createAppointmentSuccess,
  createAppointmentFaild,
  setMsgSuccess,
  setMsgErr,
  resetSelectedDate,
  setCalendarTime,
  setTime,
  resetCalendarTime,
  resetCreateAppointment,
  setCustomerName1,
  setCustomerId1,
  setPickerTime,
} = actions;

const createAppointmentReducerWrapper = (state, action) => {
  const {type} = action;
  if (type === 'createAppointment/resetCreateAppointment') {
    state = undefined;
  }
  return reducer(state, action);
};

export default createAppointmentReducerWrapper;
