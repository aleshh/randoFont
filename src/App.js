import React, { Component } from 'react';
import WebFont from 'webfontloader';

import Fonts from './components/Fonts';
import Navbar from './components/Navbar';

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

    if (this.state.categoriesWanted.length === 0) {
      this.setState({
        randomFonts: []
      });
      return null;
    }

    while (fontList.length < this.state.fontCount) {
      const font = this.getRandomFont(this.state.allFonts);

      // add the font if it's the right category and it's not
      // already in the list
      if (this.state.categoriesWanted.includes(font.category)
          && !fontList.includes(font)) {
        fontList.push(font);
        // console.log(font);
      }
    }

    this.setState({
      randomFonts: fontList
    });
    WebFont.load({
      google: {
        families: fontList.map(font => font.family)
      }
    });
  };

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
      <div className="App">
        <Navbar
          state={this.state}
          changeStyles={this.changeStyles}
          changeCount={this.changeCount}
          refreshFonts={this.refreshFonts}
        />

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
