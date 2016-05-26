import {Map, List, Record} from 'immutable'
import UserRest from 'rest/UserRest'
import {createAction, handleActions} from 'redux-actions'

export function getUserInfo() {
  return (dispatch, getState) => {
    return dispatch({
      rest: UserRest.user.get
    })
  }
}

export function updateUserInfo() {
  return (dispatch, getState) => {
    let { userId, newUserId, nickname, phone, sex, birthdate, city, workingYears, position, email, logoUrl} = getState().user.get('userParams').toJS();
    return dispatch({
      rest: UserRest.user.update,
      data: {
        userId,
        nickname,
        phone,
        sex,
        birthdate,
        city,
        working_years: workingYears,
        position,
        email,
        logoUrl
      }
    })
  }
}

/**
 * 获取城市选择器的数据
 */
export function getCityData() {
  return {
    rest: UserRest.city.get,
    data: {}
  }
}

/**
 * 获取应用的QQ成员信息
 */
export function getMembers() {
  return (dispatch, getState) => {
    let currentApp = getState().app.get('current');
    return dispatch({
      rest: UserRest.members.get,
      data: { appId: currentApp.get('appId'), pid: currentApp.get('pid') }
    })
  }
}

export const changeUserParamOptions = createAction('RESET_USER_PARAM');

export const isUpdateFlag = createAction('IS_UPDATE_FLAG');

export const resetUserParam = createAction('RESET_FORM');
