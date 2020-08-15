import React from 'react';
import {baseUrl} from './constants';
import { toast } from 'react-toastify';
import axios from 'axios'
const PutObject = (type, obj) => {
  const authTokens= JSON.parse(localStorage.getItem('tokens'));
  const headers = { Authorization: authTokens, 'Content-Type': 'application/json'};
  const {_id, ...data } =obj
  
  axios({
    
    url:(_id)?`${baseUrl}/${type}/${_id}`:`${baseUrl}/${type}`,
    method: 'put',
    data,
    headers
  }).then(response => {
    if(response.status === 200 || response.data.data.status===200){ toast.success(response.data.message)}
    })
    .catch(error => {
      if (error.response) {
        toast.error(error.message);
      } else {
        toast.error(error.message);
      }
    });
}

export default PutObject;
