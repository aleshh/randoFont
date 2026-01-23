import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { initialFontsState } from './reducers/fontsReducer';

const middleware = applyMiddleware(thunk);

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('redux-store');
    if (!serializedState) {
      return undefined;
    }
    const parsedState = JSON.parse(serializedState);
    if (!parsedState || typeof parsedState !== 'object') {
      return undefined;
    }
    const persistedFonts = parsedState.fonts && typeof parsedState.fonts === 'object'
      ? parsedState.fonts
      : {};

    return {
      ...parsedState,
      fonts: {
        ...initialFontsState,
        ...persistedFonts,
        allFonts: [],
        randomFonts: [],
      }
    };
  } catch (error) {
    return undefined;
  }
};

const preloadedState = loadState();

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose;

const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(middleware)
);

store.subscribe(() => {
  try {
    const fullState = store.getState();
    const stateWithoutallFonts = {
      ...fullState,
      fonts: {
        ...fullState.fonts,
        allFonts: [],
        randomFonts: []
      }
    };
    localStorage.setItem('redux-store', JSON.stringify(stateWithoutallFonts));
  } catch (error) {
    // Ignore write errors (e.g. storage full or unavailable).
  }
});

export default store;
