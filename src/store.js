import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = applyMiddleware(thunk);

const store = createStore(
  rootReducer,
  (localStorage['redux-store']) ?
    JSON.parse(localStorage['redux-store']) :
    initialState,
  compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);


store.subscribe(() => {
  const fullState = store.getState();
  const stateWithoutallFonts = {...fullState, fonts: { ...fullState.fonts, allFonts: []}};
  localStorage['redux-store'] = JSON.stringify(stateWithoutallFonts);
});

export default store;