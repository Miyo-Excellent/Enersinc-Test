import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

import { isDevelopment } from './utils';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

export default function configureStore() {
  const middleware = [];

  if (isDevelopment()) {
    middleware.push(thunk);
  }

  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware)),
  );
}
