import Immutable, {Map, List} from 'immutable'
import {createAction} from 'redux-actions'
import AppRest from 'rest/AppRest'
import {APP_LIST_SUCC, SELECT_APP, INITIAL_CURRENTAPP, VERSION_LIST_SUCC, LOCATION_CHANGE, HAS_GRAY_SUCC} from 'reducers/actions'

const TAG = "[appActions]::";

/**
 * 获取app信息
 * @param {string} appId
 * TODO
 */
export function getAppInfo(appId, pid) {
  return (dispatch, getState) => {
    return dispatch({
      rest: AppRest.App.info,
      data: { appId, pid }
    });
  }
}

/**
 * 选择App
 */
export function selectApp({appId, pid}) {
  return (dispatch, getState) => {
    let {app, user, router} = getState(),
      appList = app.get('appList'),
      currentUser = user.get('current'),
      location = router.locationBeforeTransitions;

    let selected = appList.find(app => app.get('appId') === appId);
    if (selected || !pid) {
      return dispatch({
        type: SELECT_APP,
        payload: { appId, pid, location }
      });
    }
    return dispatch({
      type: SELECT_APP,
      payload: { appId, pid, location }
    });
  }
};

/**
 * 获取App列表
 * @returns {Function}
 */
export const getAppList = function() {
  return (dispatch, getState) => {
    let user = getState().user.get('current');

    return dispatch({
      rest: AppRest.App.list,
      data: { userId: user.get('userId') }
    });
  }
};

/**
 * 获取某个app下的版本号
 */
export const getAppVersionList = function() {
  return (dispatch, getState) => {
    let {appId, pid } = getState().app.get('current').toJS();
    return dispatch({
      rest: AppRest.App.versionList,
      data: { appId, platformId: pid }
    });
  };
};

//判断某个app是否有灰度的权限
export const hasGray = function({appId, pid}) {
  return (dispatch, getState) => {
    return dispatch({
      rest: AppRest.App.hasGray,
      data: { appId, platformId: pid }
    });
  };
};

