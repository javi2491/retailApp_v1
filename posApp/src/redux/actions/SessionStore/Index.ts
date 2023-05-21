import {defaultJson} from '../../../Utils/Commons';
import {ILoginBody, IStore} from '../../models/ModelApp';
import {GET_JWT_TOKEN, SET_JWT_TOKEN, SET_STORE_SELECTED} from './Channel';

const getInformationToken = (
  {password, email}: ILoginBody,
  callbackResult?: () => void,
  callbackError?: (message: string, isNetworkError?: boolean) => void,
) => {
  return {
    type: GET_JWT_TOKEN,
    payload: {...defaultJson, password, email, callbackError, callbackResult},
  };
};

const setInformationToken = (informationToken: {
  token: string;
  expiresAt: string;
  idUsuario: number;
  comercio: number;
}) => {
  return {
    type: SET_JWT_TOKEN,
    payload: {informationToken},
  };
};

const setStoreSelected = (storeSelected: IStore) => {
  return {
    type: SET_STORE_SELECTED,
    payload: {...defaultJson.payload, storeSelected},
  };
};

export {getInformationToken, setInformationToken, setStoreSelected};
