import React, { Component } from 'react';

import Fonts from './components/Fonts';
import Navbar from './components/Navbar';

import { Provider } from 'react-redux';
import store from './store';


class App extends Component {

  changeStyles = e => {
    const style = e.target.name,
          checked = e.target.checked;
    if (checked) {
      this.setState({
        categoriesWanted: [...this.state.categoriesWanted, style]
      });
    } else {
      const newCategories = this.state.categoriesWanted.filter(c => c !== style);
      this.setState({
        categoriesWanted: newCategories
      });
    }
  }

  changeCount = e => {
    this.setState({
      fontCount: e.target.value
    });
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          {/* <Navbar/> */}
          <Fonts/>
        </div>
      </Provider>
    );
  }
}

export default App;
