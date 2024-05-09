import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage';
import storage from 'redux-persist/lib/storage/session';
import rootReducer from "../reducers";

// const loggerMiddleware = createLogger();
// let middleware = [thunkMiddleware]
// if (process.env.NODE_ENV !== 'production') {
//   const loggerMiddleware = createLogger();
//   middleware = [thunkMiddleware, loggerMiddleware]
// }

const persistConfig = {
  key: 'root',
  storage: storage,
  timeout: 10000,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    {},
    applyMiddleware(thunkMiddleware)
  );
  let persistor = persistStore(store)
  return { store, persistor };
};
