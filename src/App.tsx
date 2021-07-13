import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppModal from './components/AppModal';
import Authenticated from './guards/Authenticated';
import Guest from './guards/Guest';
import Game from './pages/Game';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <p>Chessier</p>
        </Route>
        <Route path="/terms" exact>
          <p>Chessier terms</p>
        </Route>
        <Route path="/policies" exact>
          <p>Chessier policies</p>
        </Route>
        <Route path="/login" exact>
          <Guest>
            <Login />
          </Guest>
        </Route>
        <Route path="/home" exact>
          <Authenticated>
            <Home />
          </Authenticated>
        </Route>
        <Route path="/play/online" exact>
          <Authenticated>
            <Game />
          </Authenticated>
        </Route>
        <Route path="/play/computer" exact>
          <Authenticated>
            <Game />
          </Authenticated>
        </Route>
        <Route path="/*">
          <div>404 not found</div>
        </Route>
      </Switch>
      <AppModal />
    </BrowserRouter>
  );
}

export default App;
