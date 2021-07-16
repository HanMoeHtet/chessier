import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppModal from './components/AppModal';
import Authenticated from './guards/Authenticated';
import Guest from './guards/Guest';
import PlayingGame from './guards/PlayingGame';
import Game from './pages/Game';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/about" exact>
          <p>Chessier about</p>
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
            <PlayingGame>
              <Game />
            </PlayingGame>
          </Authenticated>
        </Route>
        <Route path="/play/computer" exact>
          <Authenticated>
            <PlayingGame>
              <Game />
            </PlayingGame>
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
