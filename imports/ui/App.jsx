import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UserContextProvider from './../context/userContext.js'

import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Create from './pages/Create/Create';
import { Button } from '@material-ui/core';
import PetitionPage from './pages/Petition/PetitionPage';
import MyPetition from './pages/Petition/MyPetition';

import LoginOrRegister from './pages/SignUp/LoginOrRegister.jsx';

import Header from './layout/Header.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import CustomLoader from './components/CustomLoader.jsx';

// import { createBrowserHistory } from "history";

// const history = createBrowserHistory();

export const App = () => {

  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { userLogged, isUserLogging, isUserLoggedLoading } = useTracker(() => {

   
    const handler = Meteor.subscribe('userData');

    const isUserLogging = Meteor.loggingIn()

    const userLogged = Meteor.userId();


    if (!handler) {
        return { userLogged: null,
          isUserLogging, isUserLoggedLoading: true };
    }


    return { userLogged, isUserLogging, isUserLoggedLoading: null};

  })

  useEffect(() => {
    console.log('setIsAuth')
    console.log(userLogged)
    setIsAuth(()=>userLogged)
    if (!isUserLoggedLoading) {
      setIsLoading(()=>null)
    } else {
      setIsLoading(()=>true)
    }
    // console.log({history})
  }, [userLogged, isUserLoggedLoading, isUserLogging])

  return (
    <>
    {isLoading ? 
         <div className="text-center">Loading, please wait...</div>
     : 
    <Router>
      <Switch>
        <Route path={["/create", "/petition", "/info", "/profile", "/petitionAdmin", "/test", "/"]}>
        <UserContextProvider>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
                <Create />
            </Route>
            <Route path="/petition/:id">
                <PetitionPage />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route>
            <Route path="/my-petition">
                <MyPetition />
            </Route>
            <Route path="/info">
              <div>
                <h1>Info page</h1>
              </div>
            </Route>
            <ProtectedRoute path="/test" component={LoginOrRegister} isAuth={isAuth}/>
          </Switch>
          </UserContextProvider>
          </Route>
      </Switch>
    </Router>
    }
    </>

  )

};

