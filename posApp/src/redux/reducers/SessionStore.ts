import {LOGOUT_APP} from '../actions/AppStore/Channel';
import {
  SET_JWT_TOKEN,
  SET_STORE_SELECTED,
} from '../actions/SessionStore/Channel';
import {ISessionStore} from '../models/ModelApp';

interface Action {
  type: string;
  payload: any;
}

const intialState: ISessionStore = {
  informationToken: {
    token: '',
    expiresAt: '',
    idUsuario: 9298,
    comercio: 696,
    password: '',
    email: '',
  },
  storeSelected: undefined,
};

export default (state: ISessionStore = intialState, action: Action) => {
  switch (action.type) {
    case SET_JWT_TOKEN:
      return {...state, informationToken: action.payload.informationToken};
    case LOGOUT_APP:
      return {...state, informationToken: intialState.informationToken};
    case SET_STORE_SELECTED:
      return {...state, storeSelected: action.payload.storeSelected};
    default:
      return state;
  }
};
