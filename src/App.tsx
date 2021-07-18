import { Switch, Route } from 'react-router-dom';
import AppModal from './components/AppModal';
import Page from './components/Page';
import Authenticated from './guards/Authenticated';
import Guest from './guards/Guest';
import PlayingGame from './guards/PlayingGame';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          {/* <LandingPage /> */}
          <Page
            loadComponent={() =>
              import(
                /* webpackChunkName: 'LandingPage' */ 'src/pages/LandingPage'
              )
            }
          />
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
            {/* <Login /> */}
            <Page
              loadComponent={() =>
                import(/* webpackChunkName: 'Login' */ './pages/Login')
              }
            />
          </Guest>
        </Route>
        <Route path="/home" exact>
          <Authenticated>
            {/* <Home /> */}
            <Page
              loadComponent={() =>
                import(/* webpackChunkName: 'Home' */ './pages/Home')
              }
            />
          </Authenticated>
        </Route>
        <Route path="/play/online" exact>
          <Authenticated>
            <PlayingGame>
              <Page loadComponent={() => import('src/pages/Game')} />
            </PlayingGame>
          </Authenticated>
        </Route>
        <Route path="/play/computer" exact>
          <Authenticated>
            <PlayingGame>
              <Page loadComponent={() => import('src/pages/Game')} />
            </PlayingGame>
          </Authenticated>
        </Route>
        <Route path="/*">
          <div>404 not found</div>
        </Route>
      </Switch>
      <AppModal />
    </>
  );
}

export default App;
