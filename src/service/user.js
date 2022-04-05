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

export const getUserAPI = (username) => {
  return request(`/profiles/${username}`,'get');
};

export const updateUserAPI = (data) => {
  return request('/user','put',data);
};

export const followUserAPI = (username) => {
  return request(`/profiles/${username}/follow`,'post');
};

export const unfollowUserAPI = (username) => {
  return request(`/profiles/${username}/follow`,'delete');
};