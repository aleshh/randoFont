import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  (localStorage['redux-store']) ?
    JSON.parse(localStorage['redux-store']) :
    initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// localStorage.removeItem('redux-store');

store.subscribe(() => {
  localStorage['redux-store'] = JSON.stringify(store.getState());
});

export default store;