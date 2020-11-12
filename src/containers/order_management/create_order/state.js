import {createSlice} from '@reduxjs/toolkit';
export const INIT_CUSTOMER_NAME = 'Chọn khách hàng đặt đơn';
export const INIT_CUSTOMER_SERVICE = 'Chọn dịch vụ và kiểu dáng';

const initialState = {
  customerName: INIT_CUSTOMER_NAME,
  customerService: INIT_CUSTOMER_SERVICE,
  customerId: '',
  isLoading: undefined,
  errorText: undefined,
  serviceId: '',
  customerMobile: '',
  isSuccess: undefined,
  data: undefined,

  serviceData: [],
};

const createOrder = createSlice({
  name: 'createOrder',
  initialState: initialState,
  reducers: {
    resetState: () => {},
    setServiceDataCreateOrder0: (state, action) => {
      const {value} = action.payload;
      state.serviceData = value;
    },
    setCustomerIdFromCustomerList: (state, action) => {
      const {value} = action.payload;
      state.customerId = value;
    },
    setCustomerNameFromCustomerList: (state, action) => {
      const {value} = action.payload;
      state.customerName = value;
    },
    setCustomerMobileFromCustomerList: (state, action) => {
      const {value} = action.payload;
      state.customerMobile = value;
    },
    setCustomerName: (state, action) => {
      state.customerName = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setCustomerServiceId: (state, action) => {
      state.serviceId = action.payload;
    },
    setCustomerMobile: (state, action) => {
      state.customerMobile = action.payload;
    },
    setCustomerService: (state, action) => {
      state.customerService = action.payload;
    },
    createOrderLoading: (state, action) => {
      state.isLoading = true;
    },
    createOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    createOrderFaild: (state, action) => {
      state.isLoading = false;
      state.errorText = action.payload;
      state.errorText = action.payload.errMsg;
    },
    setMsgErr: (state, action) => {
      state.errorText = action.payload.errMsg;
    },
    onCloseSuccessPopUp: (state, action) => {
      state.isSuccess = null;
    },
  },
});

const {reducer, actions} = createOrder;
export const {
  setCustomerName,
  setCustomerService,
  createOrderLoading,
  createOrderSuccess,
  createOrderFaild,
  setCustomerId,
  setMsgErr,
  setCustomerMobile,
  setCustomerNameFromCustomerList,
  setCustomerMobileFromCustomerList,
  setCustomerIdFromCustomerList,
  onCloseSuccessPopUp,
  setServiceDataCreateOrder0,
  resetState,
} = actions;

const createOderReducerWrapper = (state, action) => {
  if (action.type === 'createOrder/resetState') {
    state = undefined;
  }
  return reducer(state, action);
};

export default createOderReducerWrapper;
