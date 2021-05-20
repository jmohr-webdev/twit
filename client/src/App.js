import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Toast from './components/layout/Toast';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/home/Home';
import setAuthToken from './utility/setAuthToken';
import { loadUser } from './actions/auth';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <div className="overlay">
            <Navbar />
            <Toast />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
