import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';
import reactotron from 'reactotron-react-native';
import {PAID_STATUS, PROCESSING_ORDERS_PARAM} from '../../../constants/api';
import {getIndexByCondition} from '../../../utility/array';
import {getStringFromIndexRange} from '../../../utility/string';
const initialState = {
  status: PROCESSING_ORDERS_PARAM,
  date: moment().format('DD/MM/YYYY'),
  day: getStringFromIndexRange(moment().format('DD/MM/YYYY'), 0, 2),
  month: getStringFromIndexRange(moment().format('DD/MM/YYYY'), 3, 5),
  year: getStringFromIndexRange(moment().format('DD/MM/YYYY'), 6, 10),
  calendarMarkedDate: {
    [moment().format('YYYY-MM-DD')]: {selected: true, disableTouchEvent: true},
  },
  isCalendarVisible: false,
  isLoading: false,
  processingData: [],
  completedData: [],
  cancelledData: [],
  isProcessingOrdersCalled: false,
  isCompletedOrdersCalled: false,
  isCancelledOrdersCalled: false,

  isLoadingProcessing: false,
  isLoadingCompleted: false,
  isLoadingCancelled: false,

  isEnabled: false,

  errorMessage: '',
};

const Oder = createSlice({
  name: 'Oder',
  initialState: initialState,
  reducers: {
    setPaidDataOrder0: (state, action) => {
      let {value} = action.payload;
      state.completedData.push(value);
    },
    setCancelledDataOrder0: (state, action) => {
      const {value} = action.payload;
      state.cancelledData.push(value);
    },

    setErrorMessage: (state, action) => {
      const {value} = action.payload;
      state.errorMessage = value;
    },

    setIsEnabled: (state, action) => {
      const {value} = action.payload;
      state.isEnabled = value;
    },

    setProcessingData: (state, action) => {
      const {value} = action.payload;
      state.processingData = value;
    },
    setProcessingDataOrder0: (state, action) => {
      const {value} = action.payload;
      state.processingData.push(value);
    },
    setProcessingDataOrder1: (state, action) => {
      const {orderId} = action.payload;
      const newProcessingData = state.processingData.filter(
        (el) => el.orderId !== orderId,
      );
      state.processingData = newProcessingData;
    },
    setProcessingDataOrder2: (state, action) => {
      const {value} = action.payload;
      const i = getIndexByCondition(
        state.processingData,
        'orderId',
        value.orderId,
      );
      state.processingData[i] = value;
    },
    setCompletedData: (state, action) => {
      const {value} = action.payload;
      state.completedData = value;
    },
    setCancelledData: (state, action) => {
      const {value} = action.payload;
      state.cancelledData = value;
    },
    setIsProcessingOrdersCalled: (state, action) => {
      const {value} = action.payload;
      state.isProcessingOrdersCalled = value;
    },
    setIsCompletedOrdersCalled: (state, action) => {
      const {value} = action.payload;
      state.isCompletedOrdersCalled = value;
    },
    setIsCancelledOrdersCalled: (state, action) => {
      const {value} = action.payload;
      state.isCancelledOrdersCalled = value;
    },
    getProcessingOrdersLoading: (state, action) => {
      state.isLoadingProcessing = true;
    },
    getProcessingOrdersSuccess: (state, action) => {
      const {data} = action.payload;
      state.processingData = data;
      state.isLoadingProcessing = false;
      state.isProcessingOrdersCalled = true;
      if (!state.isEnabled) {
        state.isEnabled = true;
      }
    },
    getProcessingOrdersFaild: (state, action) => {
      state.isLoadingProcessing = false;
      if (!state.isEnabled) {
        state.isEnabled = true;
      }
      const {message} = action.payload;
      state.errorMessage = message;
    },

    getCompletedOrdersLoading: (state, action) => {
      state.isLoadingCompleted = true;
    },
    getCompletedOrdersSuccess: (state, action) => {
      state.isLoadingCompleted = false;
      const {data} = action.payload;
      state.completedData = data;
      state.isCompletedOrdersCalled = true;
    },
    getCompletedOrdersFaild: (state, action) => {
      state.isLoadingCompleted = false;
      state.isCompletedOrdersCalled = true;
    },

    getCancelOrdersLoading: (state, action) => {
      state.isLoadingCancelled = true;
    },
    getCancelOrdersSuccess: (state, action) => {
      state.isLoadingCancelled = false;
      const {data} = action.payload;
      state.cancelledData = data;
      state.isCancelledOrdersCalled = true;
    },
    getCancelOrdersFaild: (state, action) => {
      state.isLoadingCancelled = false;
      state.isCancelledOrdersCalled = true;
    },

    setStatus: (state, action) => {
      const {value} = action.payload;
      state.status = value;
    },
    setDate: (state, action) => {
      const {value} = action.payload;
      state.date = value;
    },
    setCalendarMarkedDate: (state, action) => {
      const {value} = action.payload;
      state.calendarMarkedDate = value;
    },
    setDay: (state, action) => {
      const {value} = action.payload;
      state.day = value;
    },
    setMonth: (state, action) => {
      const {value} = action.payload;
      state.month = value;
    },
    setYear: (state, action) => {
      const {value} = action.payload;
      state.year = value;
    },
    setIsCalendarVisible: (state, action) => {
      const {value} = action.payload;
      state.isCalendarVisible = value;
    },
    resetState: (state, action) => {},
  },
});

const {reducer, actions} = Oder;
export const {
  setIsCalendarVisible,
  setDay,
  setMonth,
  setYear,
  setCalendarMarkedDate,
  setDate,
  setStatus,
  resetState,
  getProcessingOrdersLoading,
  getProcessingOrdersSuccess,
  getProcessingOrdersFaild,

  getCompletedOrdersLoading,
  getCompletedOrdersSuccess,
  getCompletedOrdersFaild,

  getCancelOrdersLoading,
  getCancelOrdersSuccess,
  getCancelOrdersFaild,
  setIsProcessingOrdersCalled,
  setIsCompletedOrdersCalled,
  setIsCancelledOrdersCalled,
  setProcessingData,
  setCompletedData,
  setCancelledData,
  setIsEnabled,
  setProcessingDataOrder0,
  setProcessingDataOrder1,
  setProcessingDataOrder2,
  setErrorMessage,
  setCancelledDataOrder0,
  setPaidDataOrder0,
} = actions;

export default (state, action) => {
  if (action.type === 'Oder/resetState') {
    state = undefined;
  }
  return reducer(state, action);
};
