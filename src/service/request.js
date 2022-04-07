// import superagent from 'superagent';
import axios from 'axios';

const controller = new AbortController();
const baseURL = 'https://api.realworld.io/api';
const jwtToken = localStorage.getItem('jwt-token');

const request = (path, method, body={}, controller = undefined) => {
  let options = {
    url: baseURL + path,
    method,
    data: body,
  }

  if (jwtToken) {
    options.headers = {
      Authorization: 'Token ' + jwtToken
    }
  }

  if (controller) {
    options.signal = controller.signal;
  }

  return axios(options).catch(err => console.log(err));
}

// const request = (path,method,body={}) => {

//   if (jwtToken) {
//     return superagent
//       [method](baseURL + path)
//       .send(body)
//       .set('Authorization', 'Token ' + jwtToken)
//   }
//   return superagent
//     [method](baseURL + path)
//     .send(body)
// };
export default request;