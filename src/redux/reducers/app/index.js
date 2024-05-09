
import { APP_TYPES } from "redux/actions/app/types";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  token: null,
  profile: [],
  store: [],
  dataHash: null,
  insets: null,
  navigation_bottom: [],
  typeApp: '',
  timeExpire: null,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_TYPES.AUTHENTICATION:
      let { profile, insets, dataHash, timeExpire, type, token } = action.data;
      return Object.assign({}, state, {
        profile: profile,
        token: token,
        dataHash: dataHash,
        insets: insets,
        timeExpire: timeExpire,
        typeApp: type,
        isAuthenticated: true
      })
    case APP_TYPES.LOG_OUT:
      return Object.assign({}, state, initialState);
      
    case APP_TYPES.LOADING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      })
    case APP_TYPES.TOKEN:
      return Object.assign({}, state, {
        token: action.token
      })
    case APP_TYPES.PROFILE:
      const profileAction = action.profile;
      return Object.assign({}, state, {
        token: profileAction.token,
        profile: profileAction
      })
    case APP_TYPES.STORE:
      return Object.assign({}, state, {
        store: action.store
      })
    case APP_TYPES.INSETS:
      return Object.assign({}, state, {
        insets: action.insets
      })
      
    default:
      return state;
  }
}
export default appReducer;
