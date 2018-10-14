import React, { Component } from 'react';
import WebFont from 'webfontloader';

import Fonts from './components/Fonts';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  state = {
    allFonts: [],
    randomFonts: [],
    categoriesWanted: ['serif', 'sans serif', 'display', 'handwriting', 'monospace'],
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
      if (this.state.categoriesWanted.includes(font.category)) {
        fontList.push(font);
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
    console.log(this.state.randomFonts[0]);
    console.log('categoriesWanted: ', this.state.categoriesWanted);
  };

  changeStyles = e => {
    const style = e.target.name,
          checked = e.target.checked;
    if (checked) {
      console.log('style checked, adding', style);
      this.setState({
        categoriesWanted: [...this.state.categoriesWanted, style]
      });
    } else {
      console.log('style unchecked, removing: ', style );
      const newCategories = this.state.categoriesWanted.filter(c => c !== style);
      console.log('newCagetories: ', newCategories);
      this.setState({
        categoriesWanted: newCategories
      });
    }
    console.log('categories wanted: ', this.state.categoriesWanted);
    console.log('····························································');
  }

  render() {
    return (
      <div className="App">
        <div className="navbar">
          <h1>randoFont</h1>
          <div className="controls">
            <div>
              <input
                checked={this.state.categoriesWanted.includes('serif')}
                className="checkbox"
                name="serif"
                type="checkbox"
                value="name"
                onChange={this.changeStyles}
              /> Serif
            </div>
            <div>
              <input
                checked={this.state.categoriesWanted.includes('sans serif')}
                className="checkbox"
                name="sans serif"
                type="checkbox"
                value="name"
                onChange={this.changeStyles}
              /> Sans Serif
            </div>
            <div>
              <input
                checked={this.state.categoriesWanted.includes('display')}
                className="checkbox"
                name="display"
                type="checkbox"
                value="name"
                onChange={this.changeStyles}
                /> Display
            </div>
            <div>
              <input
                checked={this.state.categoriesWanted.includes('handwriting')}
                className="checkbox"
                name="handwriting"
                type="checkbox"
                value="name"
                onChange={this.changeStyles}
              /> Handwriting
            </div>
            <div>
              <input
                checked={this.state.categoriesWanted.includes('monospace')}
                className="checkbox"
                name="monospace"
                type="checkbox"
                value="name"
                onChange={this.changeStyles}
              /> Monospace
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
