import React from 'react';

import Fonts from './components/Fonts';
import Navbar from './components/Navbar';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar/>
        <Fonts/>
      </div>
    </Provider>
  )
}

export default App;