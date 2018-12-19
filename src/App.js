import React from 'react';

import Navbar from './components/Navbar';
import RandomFonts from './components/RandomFonts';
import FavoriteFonts from './components/FavoriteFonts';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar/>
        <RandomFonts/>
        <h3>Favorites</h3>
        <FavoriteFonts/>
      </div>
    </Provider>
  )
}

export default App;