import Lodash from 'lodash';
import validator from 'validator';

import { getAPI, postAPI, deleteAPI, putAPI } from './base';

import { checkCheckdomainUrl, urlLogin } from './urls';
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