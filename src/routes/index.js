
import React, {useState} from 'react'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {AuthContext} from '../state/auth';
import {ErrorContext} from '../state/error';
import { ToastContainer, toast } from 'react-toastify';

import PrivateRoute from './private-route';
import Login from '../containers/login';
import Logout from '../containers/login/logout';
import ForgotPass from '../containers/login/forgot';
import RegisterUser from '../containers/login/register';
import DashBoard from '../containers/dashboard';
import AdminUsers from '../containers/adminUsers';
import Users from '../containers/users';
import Trips from '../containers/trips';
import Shipments from '../containers/shipments';
import Products from '../containers/products';
import Stores from '../containers/products/stores';
import Countries from '../containers/countries';
import Stories from '../containers/countries/stories';
import Reports from '../containers/reports';
import Settings from '../containers/settings';
import Categories from '../containers/products/categories';
import SubCategories from '../containers/products/sub-categories';
const Root = props => {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [isError, setIsError] = useState(false);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  const setErrors = (msg, type='error')=>{
    setIsError(msg);
    console.log(msg)
    if (type === 'success'){
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  }

  return (
    <ErrorContext.Provider value={{isError, setIsError:setErrors}}>
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
      <>
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot" component={ForgotPass} />
          <Route exact path="/signup" component={RegisterUser} />

          <PrivateRoute path="/home" component={DashBoard} />
          <PrivateRoute path="/admins" component={AdminUsers} />
          <PrivateRoute path="/users" component={Users} />

          <PrivateRoute path="/trips" component={Trips} />
          <PrivateRoute path="/shipments" component={Shipments} />

          <PrivateRoute path="/products/stores" component={Stores} />
          <PrivateRoute path="/products/categories" component={Categories} />
          <PrivateRoute path="/products/categories/:id/subcategories" component={SubCategories} />
          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/countries/stories" component={Stories} />
          <PrivateRoute path="/countries" component={Countries} />
          <PrivateRoute path="/reports" component={Reports} />
          <PrivateRoute path="/settings" component={Settings} />
        </Switch>
      </>
      </Router>
    </AuthContext.Provider>
    </ErrorContext.Provider>
  );
};

export default Root;