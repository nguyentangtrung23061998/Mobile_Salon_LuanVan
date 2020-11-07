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
          deleteEmployeeUrl
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
