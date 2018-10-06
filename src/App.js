import React, { Component } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;
console.log('API_KEY: ', API_KEY);

class App extends Component {
  state = {
    fonts: []
  };

  componentDidMount() {
    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY)
      .then(response => response.json())
      .then(data => {
        console.log('data: ', data);
        this.setState({
          fonts: data.items
        })
      });
  }

  render() {
    console.log(this.state.fonts[0]);
    return (
      <div className="App">
        <h1>randoFont</h1>
        {this.state.fonts.map(font => (<p key={font.family}>{font.family}</p>))}
      </div>
    );
  }
}

export default App;
