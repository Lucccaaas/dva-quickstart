import fetch from 'dva/fetch';
import {message} from 'antd';

function parseJSON (response) {
    return response.json();
}

function checkStatus (response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

function addExtraInfo (response) {
    if (response.code != 200) {
        message.error(response.message);
        response.success = false;
    } else {
        response.success = true;
    }
    return response;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request (url, options) {
    options = options || {};
    options.headers = options.headers || {};
    options.headers['content-type'] = 'application/json;charset=utf-8';
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(addExtraInfo)
        .then((data) => ({data}))
        .catch((err) => ({err}));
}
