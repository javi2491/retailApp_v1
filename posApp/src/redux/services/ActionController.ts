import {CommonActions} from '@react-navigation/native';
import {navigationRef} from '../../navigation/AppNavigation';

import {
  CHECK_IF_VALIDATE_PARENT,
  CREATE_CONCILIATION,
  CREATE_INVOICE,
  DELETE_CONCILIATION_TRANSACTIONS,
  GET_STORES,
  GET_TRANSACTIONS,
  GET_TRANSACTIONTYPES,
  SET_STATE_APP,
  SET_TRANSACTION,
  STORE_REHYDRATED_FINISH,
  VALIDATE_VALE_USER_FOUND,
} from '../actions/AppStore/Channel';
import {
  createInvoice,
  dBStore,
  deleteLocalTransactions,
  getStores,
  getTransactionsFromDb,
  setTransactions,
  transactionsConciliation,
  transactionTypes,
  validateIFCheckForParent,
  validateValeUserFounds,
} from '../actions/AppStore/Service';
import {GET_JWT_TOKEN} from '../actions/SessionStore/Channel';
import {loguinApp} from '../actions/SessionStore/Service';
import {ISessionStore, STATE_APP} from '../models/ModelApp';

const ActionController = (store: {
  getState: () => {sessionStore: ISessionStore};
  dispatch: (action: any) => void;
}) => {
  const refreshToken = async () => {
    if (!isAnValidToken()) {
      const {informationToken} = store.getState().sessionStore;
      console.log('refresh', informationToken);
      await store.dispatch(
        loguinApp({
          password: informationToken.password,
          email: informationToken.email,
        }),
      );
    }
  };
  const isAnValidToken = () => {
    return true;
  };

  const handleShowLogin = () => {
    if (navigationRef) {
      navigationRef.current?.dispatch(
        CommonActions.navigate({name: 'LoginModal'}),
      );
    }
  };

  const handleShowHome = () => {
    if (navigationRef) {
      navigationRef.current?.dispatch(
        CommonActions.navigate({name: 'TabOptions'}),
      );
    }
  };

  return (next: (arg0: any) => void) =>
    async (action: {type: any; payload: any}) => {
      console.log('action type', action);
      switch (action.type) {
        case STORE_REHYDRATED_FINISH:
          dBStore();
          const {informationToken} = store.getState().sessionStore;
          if (!informationToken || informationToken.token.trim().length === 0) {
            handleShowLogin();
          } else {
            store.dispatch(getStores());
            handleShowHome();
          }
          break;

        case GET_TRANSACTIONS: {
          store.dispatch(getTransactionsFromDb());
          break;
        }
        case GET_STORES: {
          break;
        }

        case SET_TRANSACTION: {
          const {transaction} = action.payload;
          setTransactions(transaction);
          break;
        }

        case DELETE_CONCILIATION_TRANSACTIONS: {
          const {localTransactions} = action.payload;
          console.log('dispatch', store.dispatch);
          store.dispatch(deleteLocalTransactions(localTransactions));
          break;
        }

        case GET_JWT_TOKEN: {
          const {password, email, callbackError, callbackResult} =
            action.payload;
          store.dispatch(
            loguinApp({password, email}, callbackResult, callbackError),
          );
          break;
        }
        case SET_STATE_APP: {
          if (action.payload.currentStateApp === STATE_APP.LOGGED_IN) {
            store.dispatch(transactionTypes());
            store.dispatch(getStores());
          }
          break;
        }
        case GET_TRANSACTIONTYPES:
          store.dispatch(
            transactionTypes(
              action.payload.callbackResult,
              action.payload.callbackError,
            ),
          );
          break;
        case VALIDATE_VALE_USER_FOUND: {
          const {
            idPrograma,
            id,
            transactionValue,
            callbackResult,
            callbackError,
            needValidateFormParent,
          } = action.payload;
          store.dispatch(
            validateValeUserFounds(
              idPrograma,
              transactionValue,
              id,
              callbackResult,
              callbackError,
              needValidateFormParent,
            ),
          );
          break;
        }
        case CREATE_CONCILIATION: {
          const {callbackResult, callbackError} = action.payload;
          store.dispatch(
            transactionsConciliation(callbackResult, callbackError),
          );
          break;
        }
        case CHECK_IF_VALIDATE_PARENT: {
          const {idPrograma, id, callbackError} = action.payload;
          store.dispatch(
            validateIFCheckForParent(idPrograma, id, callbackError),
          );
          break;
        }
        case CREATE_INVOICE:
          console.log('create invoice', action.payload);
          const {
            idPrograma,
            id,
            transactionValue,
            fechaTransaccion,
            tipoOperacion,
            trackingNumber,
            pin,
            acudienteName,
            acudienteId,
            callbackResult,
            callbackError,
          } = action.payload;
          store.dispatch(
            createInvoice(
              fechaTransaccion,
              tipoOperacion,
              id,
              transactionValue,
              trackingNumber,
              idPrograma,
              pin,
              acudienteName,
              acudienteId,
              callbackResult,
              callbackError,
            ),
          );
          break;
      }
      next(action);
    };
};

export {ActionController};
