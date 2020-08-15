import React, {useEffect} from 'react';
import { useAuth } from "../../state/auth";
import { Link, Redirect } from "react-router-dom";
const Logout = (props) => {
  const { setAuthTokens } = useAuth();
  useEffect(() => {
    setAuthTokens(null);
  }, []);
  return(
    <Redirect to="/" />
  );
}

export default Logout;