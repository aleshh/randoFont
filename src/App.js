import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import RandomFonts from './components/RandomFonts';
import FavoriteFonts from './components/FavoriteFonts';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path="/" component={RandomFonts} />
            <Route exact path="/favorites" component={FavoriteFonts} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App;