import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UserContextProvider from './../context/userContext.js'

import Home from './pages/Home/Home';
import { Info } from './Info.jsx';
import Profile from './pages/Profile/Profile';
import Create from './pages/Create/Create';
import { Button } from '@material-ui/core';
import PetitionPage from './pages/Petition/PetitionPage';
import MyPetition from './pages/Petition/MyPetition';

import Header from './layout/Header.jsx';

export const App = () => {

  return (

    <UserContextProvider>
    <Router>
      <Switch>
      <Route path={["/create", "/petition", "/info", "/profile", "/petitionAdmin", "/"]}>
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
            <Info />
          </div>
        </Route>
        </Switch>
        </Route>
      </Switch>
    </Router>
    </UserContextProvider>
    
  )

};

