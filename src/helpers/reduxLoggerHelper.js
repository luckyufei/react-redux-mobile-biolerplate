import createLogger from 'redux-logger'

export default createLogger({
  duration: true,
  colors: {
    titile: '#ff0000'
  },
  stateTransformer: (state) => {
    let _state = {};
    Object.keys(state).map(item => {
      _state[item] = !!state[item].toJS ? state[item].toJS() : state[item];
    });
    return _state;
  }
});