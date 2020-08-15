import React from 'react';
import axios from 'axios'
import { useAuth } from '../state/auth';
import { useError } from "../state/error";
import {baseUrl} from './constants';
import { toast } from 'react-toastify';
const mapTypetoEndPoint = (type)=>{
  const types = {
    'country':'countries',
  }
  return types[type] || type;
}
const DeleteObject = (type, id) => {
  const authTokens = JSON.parse(
    localStorage.getItem('tokens')
  );
  const payload={headers:{ Authorization: authTokens }}
  axios.delete(`${baseUrl}/${mapTypetoEndPoint(type)}/${id}`, payload)
  .then(response =>{
    console.log(response)
    if(response.status === 200 || response.data.data.status===200){ toast.success(response.data.message)}
  }).catch( error => toast.error(error.message));
}

export default DeleteObject;