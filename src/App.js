import React, { Component } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  state = {
    randomFonts: [],
    fontCount: 3
  };

  getRandomFont = arr => arr[this.random(arr.length) - 1]
  random = max => Math.floor(Math.random() * max) + 1

  componentDidMount() {
    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY)
      .then(response => response.json())
      .then(data => {
        let fontCount = [];
        for (let i = 0; i < this.state.fontCount; i++) {
          fontCount.push(this.getRandomFont(data.items));
        }
        console.log('selected fonts: ', fontCount);
        console.log(this.state.randomFonts[0]);
        this.setState({
          randomFonts: fontCount
        });

      });
  }

  render() {

    return (
      <div className="App">
        <h1>randoFont</h1>
        {this.state.randomFonts.map(font => (<p key={font.family}>{font.family}</p>))}
      </div>
    );
  }
}

export default App;
