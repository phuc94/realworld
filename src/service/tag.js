import request from './request';

export const getTagAPI = () => {
  return request('/tags', 'get');
}