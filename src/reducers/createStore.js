import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import Immutable from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import clientMiddleware from 'helpers/middlewares/clientMiddleware';

export default function createStore(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = [clientMiddleware(client), reduxRouterMiddleware];
  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__) {
    middleware.push(require('helpers/reduxLoggerHelper'));
    //const { persistState } = require('redux-devtools');
    // const DevTools = require('../containers/DevTools');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
     // window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
     // persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const reducer = require('./reducers');
  const store = finalCreateStore(reducer, data && processData(data));

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers'));
    });
  }

  return store;
}


function processData(data) {
  let key;
  let state = {};
  if (!data) return data;
  for (key in data) {
    if (data.hasOwnProperty(key)) {
      if (key === 'routing' || key === 'reduxAsyncConnect') {
        state[key] = data[key];
      } else {
        state[key] = Immutable.fromJS(data[key]);
      }
    }
  }
  return state;
}