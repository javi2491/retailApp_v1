import axios from 'axios';
import {SERVICE_URL} from '../../Config/AppSetting';

import {ILoginBody} from '../models/ModelApp';

const ax = axios.create({
  baseURL: SERVICE_URL,
});
// userName: 'correoapi7@correo.com',
//       password: 'API**ipa07',
export const fetchLogin = (body: ILoginBody) => {
  console.log('fetchLogin');
  return new Promise((resolve, reject) => {
    ax.post('api/login', {
      userName: body.email,
      password: body.password,
    })
      .then((response: {data: never[]}) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};
