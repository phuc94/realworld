import request from './request';

export const signinAPI = (data) => {
  return request('/users/login','post',data);
};

export const signupAPI = (data) => {
  return request('/users','post',data);
};

export const getCurrentUserAPI = () => {
  return request('/user','get');
};

export const updateUserAPI = (data) => {
  return request('/user','put',data);
};