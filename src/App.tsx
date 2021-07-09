import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Game from './pages/Game';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/play" exact>
          <Game />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
