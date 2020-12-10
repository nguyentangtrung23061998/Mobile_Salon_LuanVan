import { ErrorObject, StatusResponse } from '../constants/api'
import { create } from 'apisauce';
import { baseURL } from './urls';
import { getSafeValue } from '../utils/api';
import queryString from 'query-string';
import reactotron from 'reactotron-react-native';
import {getToken} from '../utility/local_storage.js';

const api = create({
    baseURL,
    headers: {},
    paramsSerializer: params => queryString.stringify(params)

});

api.addAsyncRequestTransform((request) => async () => {
    const token = await getToken();
  request.headers.Authorization = `Bearer ${token}`;
})

const TIMEOUT_ERROR = 'TIMEOUT_ERROR';
const NETWORK_ERROR = 'NETWORK_ERROR';

const handleRes = (res) => {
    return new Promise((resolve, reject) => {
        const data = getSafeValue(res, 'data', null);//
        const message = getSafeValue(res, 'message', '');//
        const status = getSafeValue(res, 'status', StatusResponse.success);//
        // reactotron.log("data: ",data)
        // reactotron.log("message: ",message)
        // reactotron.log("message: ",message)

        if (!res.ok && res.problem) {
            if (message === '') {
                let customError = ErrorObject.sysErr;
                switch (res.problem) {
                    case CONNECTION_ERROR:
                        customError = { errCode: '100', errMsg: 'CONNECTION_ERROR' };
                        break;
                    case CANCEL_ERROR:
                        customError = { errCode: 'test', errMsg: 'CANCEL_ERROR' };
                        break;
                    case NONE:
                        customError = { errCode: 'test', errMsg: 'NONE' };
                        break;

                    case TIMEOUT_ERROR:
                        customError = ErrorObject.timeOutErr;
                        break;

                    case NETWORK_ERROR:
                        customError = ErrorObject.networkErr;
                        break;

                    case SERVER_ERROR:
                        customError = { errCode: '500-599', errMsg: data.message };
                        break;
                    case CLIENT_ERROR:
                        customError = { errCode: '414', errMsg: data.message };
                        break;

                    default:
                        customError = ErrorObject.sysErr;
                }

                reject(customError);
            } else {
                reject(message);
            }
        } else {
            if (status === StatusResponse.fail) {
                reject(message);
            } else {
                resolve(data);
            }
        }
    });
};

export const getAPI = async (url = '', params = {}, opt = {}) => {
    const res = await api.get(url, params, opt);
    return handleRes(res);
};

export const postAPI = async (url = '', params = {}, opt = {}) => {

    const res = await api.post(url, params, opt);
    return handleRes(res);
};

export const putAPI = async (url = '', params = {}, opt = {}) => {
    const res = await api.put(url, params, opt);
    return handleRes(res);
};

export const deleteAPI = async (url = '', params = {}, opt = {}) => {
    const res = await api.delete(url, params, opt);
    return handleRes(res);
};

export default api;
