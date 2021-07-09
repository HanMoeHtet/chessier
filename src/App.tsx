import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Authenticated from './guards/Authenticated';
import Game from './pages/Game';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/" exact>
          <Authenticated>
            <Home />
          </Authenticated>
        </Route>
        <Route path="/play" exact>
          <Authenticated>
            <Game />
          </Authenticated>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
