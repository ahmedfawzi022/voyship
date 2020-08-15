import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from 'axios'
import logo from '../../assets/logo.png';
import {useForm} from '../../lib/useForm';
import { useError } from "../../state/error";

import {baseUrl} from'../../lib/constants'

const RegisterUser = (props) => {
  const {setIsError} = useError();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const [values, handleChange] = useForm({
    firstName: '', lastName: '', email:'', 
    password: '', roles: ["shopper"] 
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    axios.post(`${baseUrl}/users/register`, values).then(response => {
      if (response.data.status === true || response.status === 200) {
        const username = response.data.data.username || ""
        setIsLoading(false);
        setIsError(response.data.message, 'success');
        history.push('/login', {from: props.location, username});
      }
      if (response.status === false || response.status === 400) {
        setIsError(response.data.data)
        setIsLoading(false);
      }
    }).catch(e => {
      setIsError(e.message);
    });
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
              <form className="card" onSubmit={handleSubmit}>
                <div className="card-body p-6">
                  <div className="card-title">Create new account</div>
                  <div className="form-group">
                    <label className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter name"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter name"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                  </div>
                  {/* <div className="form-group">
                    <label className="form-label">Password Confirmation</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="passwordConfirm"
                      value={values.passwordConfirm}
                      onChange={handleChange}
                    />
                  </div> */}
                  {/* <div className="form-group">
                    <label className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" />
                      <span className="custom-control-label">Agree the <a href="terms.html">terms and policy</a></span>
                    </label>
                  </div> */}
                  <div className="form-footer">
                    <button type="submit" 
                      className={`btn btn-primary btn-block ${isLoading && 'btn-loading'}`}>Create new account</button>
                  </div>
                  <br/>
                </div>
                
              </form>
              <div>
                  <span>Already have account? </span>
                  <Link to="/login" className="text-center text-muted">Sign in</Link>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RegisterUser;