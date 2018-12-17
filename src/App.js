import React, { Component } from 'react';

import Fonts from './components/Fonts';
import Navbar from './components/Navbar';

import { Provider } from 'react-redux';
import store from './store';


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Navbar/>
          <Fonts/>
        </div>
      </Provider>
    );
  }
}

export default App;
