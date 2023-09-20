import { readToken, removeToken } from '@/storage/token';
import { Toast as aMessage, Notification } from '@douyinfe/semi-ui';
import fetch from 'isomorphic-fetch';
import { stringify } from 'querystring';
import { whiteList } from './enum';
let baseUrl = '/api/v1';
export function setBaseUrl(url) {
  baseUrl = url;
}

interface RError extends Error {
  code?: number;
  response?: Response;
}
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  413: '请求体过大。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
function checkStatus(response, url) {
  console.log(response);
  const isNotMsg = whiteList.some(item => response.url.indexOf(item) !== -1);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errorText = codeMessage[response.status] || response.statusText;
  return response.json().then(
    ({ message, detail, code }) => {
      if (!isNotMsg) {
        Notification.error({ title: message || 'network error' });
      }
      return Promise.reject({ code, message, detail });
    },
    e => {
      Notification.error({ title: response.message || 'network error' });
      // const error: RError = Error(errorText);
      // error.code = response.status;
      // error.response = response;
      return Promise.reject({
        code: response.status,
        response,
      });
    },
  );
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  newOptions.method = (newOptions.method || 'get').toUpperCase();
  const token = readToken();

  if (token) {
    newOptions.headers = {
      ...newOptions.headers,
      Authorization: token,
      'seeds-user-token': token,
    };
  }
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }
  const requestUrl = /^http(s)?:/.test(url)
    ? url
    : `${newOptions.baseUrl ? newOptions.baseUrl : baseUrl}${url}`;
  return fetch(requestUrl, newOptions)
    .then(checkStatus)
    .then(response => {
      if (response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .catch(e => {
      console.log('http code ', +e.code);
      if (+e.code === 401) {
        localStorage.removeItem('auth');
        //removeToken();
        //window.location.reload();
        return Promise.reject(e);
      }
      return Promise.reject(e);
    });
}

interface HttpOptions {
  headers?: any;
  query?: { [x: string]: any };
  params?: { [x: string]: any };
  formData?: FormData;
  baseUrl?: string;
}

export default {
  get(url, { query = null, ...rest }: HttpOptions = {}) {
    const newQuery = stringify(query);
    return request(newQuery ? `${url}?${newQuery}` : url, {
      ...rest,
      method: 'GET',
    });
  },
  post(url, { params = {}, ...rest }: HttpOptions = {}) {
    return request(url, {
      ...rest,
      method: 'POST',
      body: params,
    });
  },
  put(url, { params = {}, ...rest }: HttpOptions = {}) {
    return request(url, {
      ...rest,
      method: 'PUT',
      body: params,
    });
  },
  del(url, { params = {}, ...rest }: HttpOptions = {}) {
    return request(url, {
      ...rest,
      method: 'DELETE',
      body: params,
    });
  },
  upload(url, { formData, ...rest }: HttpOptions = {}) {
    return request(url, { ...rest, method: 'POST', formData });
  },
};

