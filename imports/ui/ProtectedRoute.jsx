import React from 'react';
import { Route, Redirect } from 'react-router';

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
            <Redirect to={{ pathname: "/profile", state: {from: props.location} }} />
          )
        }
      }
    }/>
  );
}
 
export default ProtectedRoute;