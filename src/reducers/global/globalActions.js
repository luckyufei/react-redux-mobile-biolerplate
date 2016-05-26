import {Map, List, Record} from 'immutable'
import {createAction} from 'redux-actions'
import AppRest from 'rest/AppRest'
import {getNetStatus, getChannelId } from 'utils/helper'
import {SHOW_LOADING, HIDE_LOADING, ACTIVE_POP_ALERT, UNACTIVE_POP_ALERT, LOCATION_CHANGE} from 'reducers/actions'

const TAG = "[globalActions]::";
const REPORT_URL = 'http://bugly.qq.com/mm/report';

export const showLoading = createAction(SHOW_LOADING);

export const hideLoading = createAction(HIDE_LOADING);

/**
 *  激活弹出窗
 *  @param data {issueId, processor, members, status} 
 */
export const activePopAlert = createAction(ACTIVE_POP_ALERT);

/**
 * 关闭弹出窗 
 */
export const unactivePopAlert = createAction(UNACTIVE_POP_ALERT);

/**
 * 事件统计
 */
export function report({appId, platformId, moduleId, actionId}) {
  return (dispatch, getState) => {
    let currentApp = getState().app.get('current');
    let currentUser = getState().user.get('current');
    //初始化配置
    let initConfig = Object.assign({
      appId: currentApp.get('appId'),
      platformId: currentApp.get('pid'),
      userId: currentUser.get('userId') || 'unknow',
      net: getNetStatus() || 'Cable Modem',
      channelId: getChannelId() || 'web',
      isSuccess: 1
    }, { appId, platformId, moduleId, actionId });
    if (!initConfig.appId || !initConfig.platformId) {
      return false;
    }
    let strParam = Object.keys(initConfig).reduce((acc, key) => `${acc}&${key}=${initConfig[key]}`, '');
    return dispatch({
      type: 'REPORT_URL_CHANGE',
      payload: `${REPORT_URL}?t=${Math.random()}${strParam}`,
    });
  }
}

/**
 * 手动上报接口
 */
export function reportFast(dataPtag) {
  return (dispatch, getState) => {
    if (dataPtag && dataPtag.split('-').length === 2) {
      let [moduleId, actionId] = dataPtag.split('-');
      return dispatch(report({ moduleId, actionId }));
    }
  }
}

/**
 * 重置搜索条件 
 */
export const resetSearchParams = createAction('RESET_SEARCH_PARAMS');