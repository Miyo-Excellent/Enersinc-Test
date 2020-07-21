import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

import configureStore from './configureStore';

const rootNode = document.getElementById('root');

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,

  rootNode,
);

serviceWorker.unregister();
