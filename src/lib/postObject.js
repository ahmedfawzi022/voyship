import React from 'react';
import {baseUrl} from './constants';
import { toast } from 'react-toastify';
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const PostObject = async (url, obj) => {
  console.log("inside post")
  const authTokens= JSON.parse(localStorage.getItem('tokens'));
  const headers = { Authorization: authTokens};
  const data ={...obj}


  return new Promise((resolve, reject) => {
    axios({
      url: `${baseUrl}/${url}`,
      method: 'post',
      data,
      headers
    }).then(response => {
      if(response.status === 201 || response.status === 200 || response.data.data.status===200){
        toast.success(response.data.message)
      }
      resolve(response.data)
    })
    .catch(error => {
      if (error.response) {
        toast.error(error.message);
      } else {
        toast.error(error.message);
      }
    });
  });
}


export default PostObject;
