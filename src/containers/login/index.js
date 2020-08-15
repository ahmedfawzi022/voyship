import React, { useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios'
import logo from '../../assets/logo.png';
import {useForm} from '../../lib/useForm';
import { useAuth } from "../../state/auth";
import { useError } from "../../state/error";

import {baseUrl} from'../../lib/constants'
const Login = (props) => {
  const [values, handleChange] = useForm({ username: '', password: ''});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const {setIsError} = useError();
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthTokens } = useAuth();
  useEffect(() => {
    // if(props.location.state.username) {
    
    // }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    axios.post(`${baseUrl}/admins/login`, values).then(response => {
      if (response.status === true || response.status === 200) {
        setAuthTokens(response.data.data);
        setIsLoading(false);
        setLoggedIn(true);
      }
      if (response.status === false || response.status === 400) {
        setLoggedIn(false);
        setIsError(response.data.data)
      }
    }).catch(e => {
      // setIsError(e.message);
      setLoggedIn(false);
      setIsLoading(false);
      setIsError(e.message);
    });
  }

  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }
  return (
    <div className="page">
      <div className="page-single">
        <div className="container">
          <div className="row">
            <div className="col col-login mx-auto">
              <div className="text-center mb-6">
                <img src={logo} className="h-9" alt="" />
              </div>
              <form 
                className="card"
                method="post"
                onSubmit={handleSubmit}
              >
                <div className="card-body p-6">
                  <div className="card-title">Login to your account</div>
                  <div className="form-group">
                    <label className="form-label">User Name</label>
                    <input
                      name="username"
                      type="text" 
                      className="form-control"
                      placeholder="Enter username"
                      value={values.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <span>Password</span>
                      <Link to="/forgot" className="float-right small">I forgot password</Link>
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                    />
                  </div>
                  {/* <div className="form-group">
                    <label className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" />
                      <span className="custom-control-label">Remember me</span>
                    </label>
                  </div> */}
                  <div className="form-footer">
                    <button 
                      type="submit" 
                      className={`btn btn-primary btn-block ${isLoading ? 'btn-loading' : ''}`}
                      // onClick={handleSubmit}
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-center text-muted">
                  <span>Don't have account yet? </span>
                  <Link to="/signup">Sign Up</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login;