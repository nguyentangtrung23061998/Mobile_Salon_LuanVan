import Lodash from 'lodash';
import reactotron from 'reactotron-react-native';
import validator from 'validator';

import { getAPI, postAPI, deleteAPI, putAPI } from './base';

import { checkCheckdomainUrl, 
          urlLogin, 
          getStoreDetailsUrl,
          updateStoreUrl,
          serviceUrl,
          deleteServiceUrl,
          createServiceUrl,
          updateServiceUrl,
          getStylesByServiceUrl,
          createStyleUrl,
          deleteStyleUrl,
          updateStyleUrl,
          registerEmployeeUrl,
          getAllEmployeesUrl,
          updateStaffUrl,
          changePasswordUrl,
          getAllCustomersUrl,
          createCustomerUrl,
          updateCustomerUrl,
          deleteEmployeeUrl,
          deleteCustomerUrl,
          getAllOrderUrl,
          finishOrderUrl,
          updateOrderUrl,
          cancelOnrderUrl,
          getCustomersByPhoneUrl,
          getOrdersByDateUrl,
          createOrderUrl,
          addCustomerUrl
        } from './urls';

export const postLogin = (domainAddress, mobile, password) => {
  return postAPI(urlLogin, {
    domainAddress,
    mobile,
    password,
  });
};

export const checkCheckdomain = (domainAddress) => {
  return getAPI(
    checkCheckdomainUrl,
    {},
    {
      params: {
        domainAddress
      }
    }
  )
}
export const getStoreDetails = () => {
  return getAPI(getStoreDetailsUrl);
};

export const updateStore = (formData) => {
  return putAPI(updateStoreUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'multipart/form-data',
    },
  });
};

export const createService = (name, image) => {
  return postAPI(createServiceUrl, {name, image});
};
export const deleteService = (id) => {
  return deleteAPI(`${deleteServiceUrl}${id}`);
};

export const updateService = (id, name, image) => {
  return putAPI(updateServiceUrl + id, {name, image});
};

export const getAllServices = () => {
  return getAPI(serviceUrl);
};

export const getStylesByService = (id) => {
  return getAPI(`${getStylesByServiceUrl}${id}`);
};

export const createStyle = (formData) => {
  return postAPI(createStyleUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'multipart/form-data',
    },
  });
};

export const deleteStyle = (id) => {
  return deleteAPI(deleteStyleUrl + id);
};

export const updateStyleApi = (styleId, formData) => {
  return putAPI(updateStyleUrl + styleId, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'multipart/form-data',
    },
  });
};

export const postRegisterEmployee = (formData) => {
  return postAPI(registerEmployeeUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'multipart/form-data',
    },
  });
};

export const getUser = () => {
  return getAPI(getUserUrl, {});
};

export const deleteEmployee = (id) => {
  return deleteAPI(deleteEmployeeUrl + id);
};

export const updateStaff = (id, formData) => {
  return putAPI(updateStaffUrl + id, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'multipart/form-data',
    },
  });
};

export const getAllEmployees = () => {
  return getAPI(getAllEmployeesUrl);
};

export const getAllCustomers = (pageNumber) => {
  return getAPI(
    getAllCustomersUrl,
    {},
    {
      params: {
        pageNumber,
      },
    },
  );
};

export const createCustomer = (formData) => {
  return postAPI(createCustomerUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'multipart/form-data',
    },
  });
};
export const updateCustomer = (id, formData) => {
  return putAPI(updateCustomerUrl + id, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'multipart/form-data',
    },
  });
};
export const deleteCustomer = (id) => {
  return deleteAPI(deleteCustomerUrl + id);
};

export const getAllOrder = (idCustomer) => {
  return getAPI(getAllOrderUrl + idCustomer);
};

export const updateOrder = (orderId, customerId, services, note) => {
  const data = {
    userId: customerId,
    services,
    note,
  };
  return putAPI(updateOrderUrl + orderId, data);
};

export const finishOrder = (orderId) => {
  return putAPI(finishOrderUrl + orderId);
};
export const cancelOnrder = (orderId) => {
  return putAPI(cancelOnrderUrl + orderId);
};

export const getCustomersByPhone = (mobile) => {
  return getAPI(getCustomersByPhoneUrl, {}, {params: {mobile}});
};

export const getOrdersByDate = (status, date) => {
  return getAPI(
    getOrdersByDateUrl,
    {},
    {
      params: {
        status,
        date,
      },
    },
  );
};

export const createOrder = (userId, services, description, total) => {
  let data = {
    userId,
    description,
    services,
    // total,
  };
  return postAPI(createOrderUrl, data);
};

export const addCustomer = (fullname, mobile) => {
  return postAPI(addCustomerUrl, {fullname, mobile});
};


export const PROCESSING_ORDERS_PARAM = '1';
export const COMPLETED_ORDERS_PARAM = '2';
export const CANCALLED_ORDERS_PARAM = '3';

export const PROCESSING_STATUS = 'Đang thực hiện';
export const PAID_STATUS = 'Đã thanh toán';
export const CANCELLED_STATUS = 'Đã hủy';
