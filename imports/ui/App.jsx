import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UserContextProvider from './../context/userContext.js'

import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Create from './pages/Create/Create';
import PetitionPage from './pages/Petition/PetitionPage';
import MyPetition from './pages/Petition/MyPetition';
import Header from './layout/Header.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import About from './pages/About/About.jsx';
import Page404 from './pages/404/Page404.jsx';

export const App = () => {

  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { userLogged, isUserLogging, isUserLoggedLoading } = useTracker(() => {

    const handler = Meteor.subscribe('userData');
    const isUserLogging = Meteor.loggingIn()
    const userLogged = Meteor.userId();

    if (!handler) {
      return {
        userLogged: null,
        isUserLogging, isUserLoggedLoading: true
      };
    }

    return { userLogged, isUserLogging, isUserLoggedLoading: null };

  })

  useEffect(() => {
    setIsAuth(() => userLogged)
    if (!isUserLoggedLoading) {
      setIsLoading(() => null)
    } else {
      setIsLoading(() => true)
    }
  }, [userLogged, isUserLoggedLoading, isUserLogging])

  return (
    <>
      {isLoading ?
        <div className="text-center">Loading, please wait...</div>
        :
        <Router>
          <Switch>
            <Route path={["/create", "/about", "/petition", "/info", "/profile", "/petitionAdmin", "/"]}>

              <UserContextProvider>
                <Header />
              </UserContextProvider>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/petition/:id">
                  <PetitionPage />
                </Route>
                <Route path="/profile">
                  <UserContextProvider>
                    <Profile />
                  </UserContextProvider>
                </Route>
                <Route path="/my-petition">
                  <MyPetition />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/info">
                  <div>
                    <h1>Info page</h1>
                  </div>
                </Route>
                <ProtectedRoute path="/create" component={Create} isAuth={isAuth} />
                <Route path='*'>
                  <Page404 />
                </Route>
              </Switch>

            </Route>
          </Switch>
        </Router>
      }
    </>

  )

};

