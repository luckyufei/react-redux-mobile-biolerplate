import Immutable, {Map, List} from 'immutable'
import {handleActions} from 'redux-actions'
import {APP_LIST_SUCC, SELECT_APP, INITIAL_CURRENTAPP, VERSION_LIST_SUCC, LOCATION_CHANGE, HAS_GRAY_SUCC} from 'reducers/actions'

const TAG = "[appReducer]::";

export const initalState = Map({
  appList: List(),
  current: Map(),
  isGrayApp: false, 
});

export default handleActions({
  [APP_LIST_SUCC]: (state, action) => {
    return state.update('appList', appList => appList.mergeDeep(action.response));
  },
  [SELECT_APP]: (state, action) => {
    console.log(`${TAG} SELECT_APP: action: `, action.payload);
    let {appId, pid} = action.payload;
    let selected = state.get('appList').find(app => app.get('appId') === appId);
    return selected ? state.set('current', selected) : state;
  },

  [HAS_GRAY_SUCC]: (state, action) => {
    return state.set('isGrayApp', action.response && action.response.data && action.response.data.enableVersion2);
  },

  /**
   * 超级管理员通过路由访问任意的app
   */
  'ADD_EXTRA_APP': (state, action) => {
    let current = Immutable.fromJS(action.payload.response.data);
    current = current.merge({
      pid: current.get('platformId'),
      appName: current.get('name'),
    });
    return state.update('appList', appList => appList.push(current)).set('current', current);
  },

  [INITIAL_CURRENTAPP]: (state, action) => {
    return state.set('current', Map({ appId: action.appId, pid: action.pid }))
  },
  [VERSION_LIST_SUCC]: (state, action) => {
    return state.set('currentAppVersions', action.response.versions || []);
  }
}, initalState);
