import { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import { useAuth } from '../state/auth';
import { useError } from "../state/error";
import {baseUrl} from '../lib/constants';

export const useFetch = (url,reload=false) => {
  const isCurrent = useRef(true);
  const [state, setState] = useState({
    data: null,
    loading: true,
    totalCount: null
  });
  const {authTokens} = useAuth();
  const {setIsError} = useError();

  useEffect(() => {return () => {isCurrent.current = false}}, []);

  useEffect(() => {
    setState(state => ({data: state.data, loading: true}))
    axios.get(`${baseUrl}/${url}`, {headers:{ Authorization: authTokens }})
      .then(response =>{
        if(response.status === 200 || response.data.data.status===200){
          if (isCurrent.current){
            setState({
              data: response.data.data, 
              loading: false, 
              totalCount: response.data.totalCount
            });
          }
        }
        else{ setIsError(response.data.data)}
      }).catch( error => setIsError(error.message));
  }, [url,reload]);
  return state;
}
