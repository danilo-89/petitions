import React, { useState } from 'react';
import { Route, Redirect } from 'react-router';
import LoginOrRegister from './pages/SignUp/LoginOrRegister';

const ProtectedRoute = ({ isAuth: isAuth, component: Component, ...rest}) => {
  return ( 
    <Route 
      {...rest} 
      render={(props) => {
        if (isAuth) {
          return <Component />
        }
        else {
          return (
            <Redirect to={{ pathname: "/", state: {from: props.location} }} />
          )
        }
      }
    }/>
  );
}
 
export default ProtectedRoute;