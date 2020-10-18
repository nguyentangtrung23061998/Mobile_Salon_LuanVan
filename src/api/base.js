import { ErrorObject, StatusResponse } from '../constants/api'
import { create } from 'apisauce';
import { baseURL } from './urls';
import { getSafeValue } from '../utils/api';
import queryString from 'query-string';
const api = create({
    baseURL,
    headers: {},
    paramsSerializer: params => queryString.stringify(params)

});

api.addAsyncRequestTransform(request => { // run before calling api
    // request.headers['Authorization'] = 'Bearer' + token
})

const TIMEOUT_ERROR = 'TIMEOUT_ERROR';
const NETWORK_ERROR = 'NETWORK_ERROR';

const handleRes = (res) => {
    return new Promise((resolve, reject) => {
        const data = getSafeValue(res, 'data.data', null);//
        const message = getSafeValue(res, 'data.message', '');//
        const status = getSafeValue(res, 'data.status', StatusResponse.success);//

        if (!res.ok && res.problem) {
            if (message === '') {
                let customError = ErrorObject.sysErr;
                switch (res.problem) {
                    case TIMEOUT_ERROR:
                        customError = ErrorObject.timeOutErr;
                        break;

                    case NETWORK_ERROR:
                        customError = ErrorObject.networkErr;
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
