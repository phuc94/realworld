import request from './request';

export const getFeedAPI = (path, query=undefined,controller) => {
  let param = '';
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      param += `?${key}=${value}`;
    }
  }
  const url = path + param;
  return request(url,'get', {}, controller);
};

export const createArticleAPI = (data) => {
  return request('/articles', 'post', data)
};

export const getArticleAPI = (slug) => {
  return request(`/articles/${slug}`, 'get')
};

export const favoriteArticleAPI = (slug) => {
  return request(`/articles/${slug}/favorite`, 'post')
};

export const unfavoriteArticleAPI = (slug) => {
  return request(`/articles/${slug}/favorite`, 'delete')
};