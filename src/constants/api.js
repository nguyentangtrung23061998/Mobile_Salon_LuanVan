export const ErrorObject = {
  timeOutErr: {errCode: '100', errMsg: 'Time Out request!'},
  networkErr: {errCode: '101', errMsg: 'Please re-check your network!'},
  sysErr: {
    errCode: '102',
    errMsg: 'The system encountered an unknown error!',
  },
};
export const StatusResponse = {
  success: 'success',
  fail: 'fail',
};

export const authenRole = {
  manager: '',
  staff: '',
};

export const PROCESSING_ORDERS_PARAM = '1';
export const COMPLETED_ORDERS_PARAM = '2';
export const CANCALLED_ORDERS_PARAM = '3';

export const PROCESSING_STATUS = 'Đang thực hiện';
export const PAID_STATUS = 'Đã thanh toán';
export const CANCELLED_STATUS = 'Đã hủy';
