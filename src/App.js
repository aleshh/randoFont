import React, { Component } from 'react';
import WebFont from 'webfontloader';

import Fonts from './components/Fonts';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  state = {
    allFonts: [],
    randomFonts: [],
    categoriesWanted: ['serif', 'sans-serif', 'display', 'handwriting', 'monospace'],
    sampleSentence: 'Pack my box with five dozen liquor jugs.',
    fontCount: 3
  };

  getRandomFont = arr => arr[this.random(arr.length) - 1];
  random = max => Math.floor(Math.random() * max) + 1;

  componentDidMount() {
    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY)
      .then(response => response.json())
      .then(data => {
        this.setState({
          allFonts: data.items
        });
        this.refreshFonts();
      });
  }

  refreshFonts = () => {
    const fontList = [];
    while (fontList.length < this.state.fontCount) {
      const font = this.getRandomFont(this.state.allFonts);
      if (this.state.categoriesWanted.includes(font.category)) {
        fontList.push(font);
      }
    }

    this.setState({
      randomFonts: fontList
    });
    console.log('state after random fonts set: ', this.state);
    WebFont.load({
      google: {
        families: fontList.map(font => font.family)
      }
    });
    console.log(this.state.randomFonts[0]);
  }

  render() {
    return (
      <div className="App">
        <div className="navbar">
          <h1>randoFont</h1>
          <div className="controls">
            <div>
              <input className="checkbox" name="serif" type="checkbox" value="name" />Serif
            </div>
            <div>
              <input className="checkbox" name="sans-serif" type="checkbox" value="name" />Sans Serif
            </div>
            <div>
              <input className="checkbox" name="display" type="checkbox" value="name" />Display
            </div>
            <div>
              <input className="checkbox" name="handwriting" type="checkbox" value="name" />Handwriting
            </div>
            <div>
              <input className="checkbox" name="monospace" type="checkbox" value="name" />Monospace
            </div>
            <button onClick={this.refreshFonts}>Reload</button>
          </div>
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
