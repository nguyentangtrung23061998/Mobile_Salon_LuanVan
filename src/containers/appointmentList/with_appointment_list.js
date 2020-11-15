import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import moment from 'moment';
import {getAllAppointments} from '../../api/index';
import {getIndexByCondition} from '../../utility/array';
const FORMAT = 'YYYY-MM-DD';
const FORMAT2 = 'DD/MM/YYYY';

const TODAY = moment().format(FORMAT);
const TODAY2 = moment().format(FORMAT2);
const INIT_DAY = moment().format('DD');
const INIT_MONTH = moment().format('MM');
const INIT_YEAR = moment().format('YYYY');

export const test = createAsyncThunk(
  'must-be-unique',
  async (params, thunkAPI) => {
    const response = await getAllAppointments();
    return response;
  },
);

const initialState = {
  appointmentList: undefined,
  isLoading: undefined,
  canShowCalendar: false,
  markedDates: {[TODAY]: {selected: true}},

  selectedDate: TODAY2,

  selectedDay: INIT_DAY,
  selectedMonth: INIT_MONTH,
  selectedYear: INIT_YEAR,
  isEnabled: false,
};

const AppointmentListAccount = createSlice({
  name: 'AppointmentListAccount',
  initialState: initialState,
  reducers: {
    setAppointmentListFromUpdateAppointment: (state, action) => {
      const {value} = action.payload;
      const {appointmentList} = state;
      const i = getIndexByCondition(appointmentList, 'id', value.id);
      appointmentList[i] = value;
    },
    setAppointmentState: (state, action) => {
      const {appointmentState, id} = action.payload;
      const index = getIndexByCondition(state.appointmentList, 'id', id);
      state.appointmentList[index].state = appointmentState;
    },
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },

    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setMarkedDates: (state, action) => {
      const selectedDate = moment(action.payload).format(FORMAT);
      const updatedMarkedDates = {
        [selectedDate]: {selected: true},
      };
      state.markedDates = updatedMarkedDates;
    },
    getAllAppointmentsLoading: (state, action) => {
      state.isLoading = true;
    },
    getAllAppointmentsSuccess: (state, action) => {
      state.isLoading = false;
      state.appointmentList = action.payload;
    },
    getAllAppointmentsFaild: (state, action) => {
      state.isLoading = false;
    },
    setCanShowCalendar: (state, action) => {
      state.canShowCalendar = action.payload;
    },
    setAppointmentList: (state, action) => {
      if (state.appointmentList) {
        state.appointmentList.push(action.payload);
      } else {
        state.appointmentList = [action.payload];
      }
    },
    resetState: (state, action) => {},
    setIsEnabled: (state, action) => {
      const {value} = action.payload;
      state.isEnabled = value;
    },
  },
  extraReducers: {
    [test.pending]: (state, action) => {},
    [test.rejected]: (state, action) => {},
    [test.fulfilled]: (state, action) => {},
  },
});

const {reducer, actions} = AppointmentListAccount;
export const {
  getAllAppointmentsLoading,
  getAllAppointmentsSuccess,
  getAllAppointmentsFaild,
  setCanShowCalendar,
  setMarkedDates,
  setSelectedDate,
  setSelectedDay,
  setSelectedMonth,
  setSelectedYear,
  setAppointmentState,
  setAppointmentList,
  resetState,
  setIsEnabled,
  setAppointmentListFromUpdateAppointment,
} = actions;

const appointmentReducerWrapper = (state, action) => {
  if (action.type === 'AppointmentListAccount/resetState') {
    state = undefined;
  }
  return reducer(state, action);
};

export default appointmentReducerWrapper;
