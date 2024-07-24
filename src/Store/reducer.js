import { combineReducers } from '@reduxjs/toolkit';
import { eventReducer } from './usedRedux/eventReducer';


const reducer = combineReducers({
  Event: eventReducer,
});

export default reducer;
