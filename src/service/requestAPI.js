import superagent from 'superagent';

const baseURL = 'https://api.realworld.io/api';

export const testAPI = () => {
  return superagent
    .get('https://api.realworld.io/api/articles')
    .set('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF3ZV9pb3AyMDA2QHlhaG9vLmNvbSIsInVzZXJuYW1lIjoieXVyaXF1eTIiLCJpYXQiOjE2NDgyNzAzNTQsImV4cCI6MTY1MzQ1NDM1NH0.f_qFjtwMoMz1QksXFBY-EOt4EPam-cc8iUGfKdYaZfY')
}