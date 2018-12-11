import { combineReducers } from 'redux';
import fontsReducer from './fontsReducer';

export default combineReducers({
  fonts: fontsReducer
});