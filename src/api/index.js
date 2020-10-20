import Lodash from 'lodash';
import validator from 'validator';

import {getAPI, postAPI, deleteAPI, putAPI} from './base';
export const postLogin = (domainAddress, mobile, password) => {
    var url = `http://10.0.3.2:3001/login`
    return postAPI(url, {
      domainAddress,
      mobile,
      password,
    });
  };