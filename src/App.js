import React, { Component } from 'react';

class App extends Component {
  state = {
    fonts: []
  };

  componentDidMount() {
    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCe4LqABmOtcBdPHrn8t58EEeqMb7xKG_E')
      .then(response => response.json())
      .then(data => {
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
