import { Switch, Route, BrowserRouter } from 'react-router-dom';
import AppModal from './components/AppModal';
import Page from './components/Page';
import Authenticated from './guards/Authenticated';
import Guest from './guards/Guest';
import PlayingGame from './guards/PlayingGame';
import 'tippy.js/dist/tippy.css';
import Offline from './guards/Offline';
import ConnectionProvider from './composables/ConnectionProvider';

function App() {
  return (
    <BrowserRouter>
      <ConnectionProvider>
        <Switch>
          <Route path="/" exact>
            <Page
              loadComponent={() =>
                import(
                  /* webpackChunkName: 'LandingPage' */ 'src/pages/LandingPage'
                )
              }
            />
          </Route>
          <Route path="/about" exact>
            <Page
              loadComponent={() =>
                import(/* webpackChunkName: 'About' */ 'src/pages/About')
              }
            />
          </Route>
          <Route path="/terms" exact>
            <Page
              loadComponent={() =>
                import(/* webpackChunkName: 'TOS' */ 'src/pages/TOS')
              }
            />
          </Route>
          <Route path="/policies" exact>
            <Page
              loadComponent={() =>
                import(
                  /* webpackChunkName: 'Policies' */ 'src/pages/PrivacyPolicies'
                )
              }
            />
          </Route>
          <Route path="/login" exact>
            <Offline redirectTo="/">
              <Guest>
                <Page
                  loadComponent={() =>
                    import(/* webpackChunkName: 'Login' */ './pages/Login')
                  }
                />
              </Guest>
            </Offline>
          </Route>
          <Route path="/home" exact>
            <Page
              loadComponent={() =>
                import(/* webpackChunkName: 'Home' */ './pages/Home')
              }
            />
          </Route>
          <Route path="/play/online" exact>
            <Offline redirectTo="/">
              <Authenticated>
                <PlayingGame>
                  <Page
                    loadComponent={() =>
                      import(/* webpackChunkName: 'Game' */ './pages/Game')
                    }
                  />
                </PlayingGame>
              </Authenticated>
            </Offline>
          </Route>
          <Route path="/play/computer" exact>
            <PlayingGame>
              <Page
                loadComponent={() =>
                  import(/* webpackChunkName: 'Game' */ './pages/Game')
                }
              />
            </PlayingGame>
          </Route>
          <Route path="/*">
            <div>404 not found</div>
          </Route>
        </Switch>
        <AppModal />
      </ConnectionProvider>
    </BrowserRouter>
  );
}

export default App;
