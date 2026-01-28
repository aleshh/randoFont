import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Navbar from './components/Navbar';
import RandomFonts from './components/RandomFonts';
import FavoriteFonts from './components/FavoriteFonts';
import Footer from './components/Footer';

import { Provider } from 'react-redux';
import store from './store';

const theme = createTheme({
  palette: {
    primary: { main: 'rgba(187, 233, 180, 1)' },
    secondary: { main: '#0f7e00'},
  },
  typography: {
    fontFamily: [
      'Helvetica Neue',
      'Helvetica',
      'Open Sans',
      'sans-serif',
    ].join(','),
  },
});

const wrapperStyle = {
  minHeight: 'calc(100vh - 50px)',
  marginBottom: 0,
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <div className="App" >
            <CssBaseline />
            <div style={wrapperStyle}>
              <Navbar/>
              <Switch>
                <Route exact path="/" component={RandomFonts} />
                <Route exact path="/favorites" component={FavoriteFonts} />
                <Route component={RandomFonts} />
              </Switch>
            </div>
            <Footer/>
          </div>
        </Router>
      </Provider>
    </ThemeProvider>
  )
}

export default App;
