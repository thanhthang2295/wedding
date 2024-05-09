import { combineReducers } from "redux";
import appReducer from "./app";
const reducers = {
  appReducer
};

const allReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
  // if (action.type === APP_TYPES.LOG_OUT) {
  //   storage.removeItem('persist:root');
  //   state = undefined;
  // }
  return allReducer(state, action);
};

export default rootReducer;
