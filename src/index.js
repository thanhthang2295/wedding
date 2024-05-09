import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { PersistGate } from 'redux-persist/integration/react';
import stores from './redux/stores/index';
import { routerRef } from './routes/service';
import App from './App';
import 'assets/scss/style.scss';
import { LoadingSuspense } from 'components/elements/LoadingBase';
import { Portal } from 'layouts/Portal';

const { store, persistor } = stores();
const history = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router history={history} ref={routerRef}>
    <Provider store={store}>
      <PersistGate loading={<LoadingSuspense />} persistor={persistor}>
        <App />
        <Portal />
      </PersistGate>
    </Provider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
