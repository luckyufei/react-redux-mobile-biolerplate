export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

              
      let [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});

      const actionPromise = promise(client);
      actionPromise
        .then((response) => next({...rest, response, type: SUCCESS}))
        .catch((error)=> {
          console.error('MIDDLEWARE ERROR:', error);
          next({...rest, error, type: FAILURE});
          return Promise.reject(error);
      });

      return actionPromise;
    };
  };
}
