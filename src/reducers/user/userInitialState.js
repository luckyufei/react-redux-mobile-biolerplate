import {Map, List, Record} from 'immutable'

export const Member = Record({
  appId: null,
  platform: null,
  userId: '',
  type: 1
});

export const initalUserParam = new Record({
  userId: '',
  newUserId: '',
  nickname: '',
  phone: '',
  sex: '',
  birthdate: '',
  city: '',
  workingYears: '',
  position: '',
  email: '',
  logoUrl: ''
});

export const initialState = Map({
  current: Map(),
  userParams: initalUserParam,
  isUpdateFlag: true,
  members: List()
});