import React, { useState } from 'react';
import { Route, Redirect } from 'react-router';
import LoginOrRegister from './pages/SignUp/LoginOrRegister';

const ProtectedRoute = () => {
  return ( 
    <Route {...rest} render={(props) => {
        <LoginOrRegister />
      }
    }/>
  );
}
 
export default ProtectedRoute;