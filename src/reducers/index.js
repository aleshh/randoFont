import { combineReducers } from 'redux';
import fontsReducer from './fontsReducer';

export default combineReducers({
  font: fontsReducer
});