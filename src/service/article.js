import request from './request';

export const getFeedAPI = (feed = 'user', query=undefined,controller) => {
  let param = '';
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      param += `?${key}=${value}`;
    }
  }
  const path = (feed == 'global') ? ('/' + param) : ('/feed' + param);
  return request('/articles' + path,'get', {}, controller);
};

export const createArticleAPI = (data) => {
  return request('/articles', 'post', data)
};