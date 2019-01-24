import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import RandomFonts from './components/RandomFonts';
import FavoriteFonts from './components/FavoriteFonts';
import Footer from './components/Footer';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className="wrapper">
            <Navbar/>
            <Switch>
              <Route exact path="/" component={RandomFonts} />
              <Route exact path="/favorites" component={FavoriteFonts} />
              <Route component={RandomFonts} />
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    </Provider>
  )
}

export default App;