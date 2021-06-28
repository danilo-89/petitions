import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home/Home';
import { Info } from './Info.jsx';
import Create from './pages/Create/Create';
import { Button } from '@material-ui/core';

import Header from './layout/Header.jsx';

export const App = () => {

  return (

    <Router>
      <Switch>
      <Route path={["/create", "/info", "/"]}>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
          <div>fghftgh fhf gh</div>
        </Route>
        <Route path="/create">
            <Create />
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
  )

};

