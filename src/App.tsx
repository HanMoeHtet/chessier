import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Game from './pages/Game';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/play" exact>
          <Game />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
