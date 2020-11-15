import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';
import reactotron from 'reactotron-react-native';
export const INIT_CUSTOMER_NAME = 'Chọn khách hàng đặt đơn';
const FORMAT = 'YYYY-MM-DD';
const FORMAT2 = 'DD/MM/YYYY';
const TODAY = moment().format(FORMAT);
const TODAY2 = moment().format(FORMAT2);
const INIT_TIME = moment().add(1.5, 'hour').format('HH:mm');
const INIT_DATE = moment().format('DD/MM/YYYY');

const initialState = {
  isCustomerFocused: false,
  isCustomerValid: true,
  timeCalendar: undefined,
  timePicker: undefined,
  successMessage: '',
  errorMessage: '',
  note: '',
  confirmedDate: TODAY2,
  selectedDate: TODAY,
  markedDates: {[TODAY]: {selected: true}},
  customerName: INIT_CUSTOMER_NAME,
  customerId: '',
  isNumberOfCustomerFocused: false,
  calendarTime: INIT_TIME,
  date: null,
  time: null,
  pickerTime: null,
  timeOfCalendarPicker: null,
  canShowCalendar: false,
  isLoading: undefined,
  msgSuccess: undefined,
  msgErr: undefined,
  openTime: '',
  closeTime: '',
};

const createAppointment = createSlice({
  name: 'createAppointment',
  initialState: initialState,
  reducers: {
    setSuccessMessage: (state, action) => {
      const {value} = action.payload;
      state.successMessage = value;
    },
    setErrorMessage: (state, action) => {
      const {value} = action.payload;
      state.errorMessage = value;
    },
    setNote: (state, action) => {
      const {value} = action.payload;
      state.note = value;
    },
    updateAppointmentLoading: (state, action) => {
      state.isLoading = true;
    },
    updateAppointmentSuccess: (state, action) => {
      const {message} = action.payload;
      state.isLoading = false;
      state.successMessage = message;
    },
    updateAppointmentFaild: (state, action) => {
      const {message} = action.payload;
      state.isLoading = false;
      state.errorMessage = message;
    },

    setNumberCustomer: (state, action) => {
      const {value} = action.payload;
      if (value === '0') {
        state.data.numberCustomer = '';
      } else {
        state.data.numberCustomer = value;
      }
    },
    setIsCustomerFocused: (state, action) => {
      const {value} = action.payload;
      state.isCustomerFocused = value;
      state.isCustomerValid = value;
    },
    resetTimePicker: (state, action) => {
      const {timeCalendar} = state;
      state.timePicker = timeCalendar;
    },
    setTimePicker: (state, action) => {
      const {value} = action.payload;
      state.timePicker = value;
    },
    setData: (state, action) => {
      const dt = action.payload;
      const {date, time, note} = dt;
      state.date = date;
      state.time = time;
      state.timeOfCalendarPicker = time;
      state.note = note;
      state.data = dt;
    },
    setCanShowCalendar: (state, action) => {
      state.canShowCalendar = action.payload;
    },
    setMarkedDates: (state, action) => {
      const newMarkedDate = {
        [action.payload]: {selected: true},
      };
      state.markedDates = newMarkedDate;
    },

    updateData: (state, action) => {
      state.data.idCustomer = action.payload.idCustomer;
      state.data.customerName = action.payload.customerName;
    },
    setPickerTime: (state, action) => {
      const {value} = action.payload;
      state.pickerTime = value;
    },
    setCalendarTime: (state, action) => {
      state.timeOfCalendarPicker = action.payload;
    },
    resetSelectedDate: (state, action) => {
      const date0 = moment(state.date, 'DD/MM/YYYY').format('YYYY-MM-DD');
      const date1 = {
        [date0]: {selected: true},
      };
      state.markedDates = date1;
    },
    resetCalendarTime: (state, action) => {
      state.timeOfCalendarPicker = state.time;
      state.pickerTime = state.openTime;
    },
    setDate: (state, action) => {
      const date = moment(Object.keys(action.payload)[0], 'YYYY-MM-DD').format(
        'DD/MM/YYYY',
      );
      state.date = date;
    },
    setTime: (state, action) => {
      state.time = state.timeOfCalendarPicker;
    },

    setOpenTime: (state, action) => {
      const {value} = action.payload;
      state.openTime = value;
      state.pickerTime = value;
    },
    setCloseTime: (state, action) => {
      const {value} = action.payload;
      state.closeTime = value;
    },
  },
});

const {reducer, actions} = createAppointment;
export const {
  setOpenTime,
  setCloseTime,
  setData,
  setTime,
  updateData,
  setCanShowCalendar,
  setMarkedDates,
  setTimePicker,
  resetTimePicker,
  setIsCustomerFocused,
  setNumberCustomer,
  updateAppointmentLoading,
  updateAppointmentSuccess,
  updateAppointmentFaild,
  setNote,
  setSuccessMessage,
  setErrorMessage,
  setPickerTime,
  setCalendarTime,
  resetSelectedDate,
  resetCalendarTime,
  setDate,
} = actions;

const updateAppointmentReducerWrapper = (state, action) => {
  return reducer(state, action);
};

export default updateAppointmentReducerWrapper;
