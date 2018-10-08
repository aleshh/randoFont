import React, { Component } from 'react';
import WebFont from 'webfontloader';

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
        const fontList = [];
        for (let i = 0; i < this.state.fontCount; i++) {
          fontList.push(this.getRandomFont(data.items));
        }

        this.setState({
          randomFonts: fontList
        });
        WebFont.load({
          google: {
            families: fontList.map(font => font.family)
          }
        });
        console.log(this.state.randomFonts[0]);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="navbar">
          <h1>randoFont</h1>
        </div>
        <div className="container">
          {this.state.randomFonts.map(
            font => (
              <div key={font.family}>
                <h2>{font.family}</h2>
                <p style={{fontFamily: font.family}}>
                  Pack my box with five dozen liquor jugs
                </p>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default App;
