import React, { Component } from 'react';
import WebFont from 'webfontloader';

import Fonts from './components/Fonts';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  state = {
    allFonts: [],
    randomFonts: [],
    sampleSentence: 'Pack my box with five dozen liquor jugs.',
    fontCount: 3
  };

  getRandomFont = arr => arr[this.random(arr.length) - 1]
  random = max => Math.floor(Math.random() * max) + 1

  componentDidMount() {
    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY)
      .then(response => response.json())
      .then(data => {
        this.setState({
          allFonts: data.items
        })
        const fontList = [];
        for (let i = 0; i < this.state.fontCount; i++) {
          fontList.push(this.getRandomFont(this.state.allFonts));
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
        <Fonts
          randomFonts={this.state.randomFonts}
          sampleSentence={this.state.sampleSentence}
          fontCount={this.state.fontCount}
        />
      </div>
    );
  }
}

export default App;
