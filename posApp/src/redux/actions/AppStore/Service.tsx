import {Dispatch} from 'redux';
import {
  createTable,
  deleteTodoItem,
  getDBConnection,
  getTodoItems,
  saveTodoItems,
} from '../../../Services/db-service';
import {
  ERROR_CREDENTIALS_MESSAGE,
  ERROR_MESSAGE,
  ERROR_MESSAGE_APP,
  ERROR_MESSAGE_NETWORK,
} from '../../../Utils/Commons';
import {
  IInformationUserResponse,
  ISessionStore,
  ITransaction,
} from '../../models/ModelApp';
import {
  fetchCreateConciliation,
  fetchCreateInvoice,
  fetchHasToValidateParent,
  fetchStores,
  fetchTransactionTypes,
  fetchValidateAllInformationUser,
} from '../../services/homeService';
import {setStoreSelected} from '../SessionStore/Index';
import {
  getTransactions,
  setInvoiceResponse,
  setLoading,
  setLocalTransactions,
  setStores,
  setTransaction,
  setTransactionTypes,
} from './Index';

export function transactionTypes(
  callbackResult?: () => void,
  callbackError?: (message: string, isNetworkError?: boolean) => void,
) {
  return (
    dispatch: Dispatch,
    getState: () => {sessionStore: ISessionStore},
  ) => {
    dispatch(setLoading(true));
    const {sessionStore} = getState();
    fetchTransactionTypes(
      sessionStore.informationToken.token,
      sessionStore.informationToken.comercio,
    )
      .then((res: any) => {
        if (res.code === 'ERR_NETWORK') {
          if (callbackError) {
            callbackError(ERROR_MESSAGE_NETWORK, true);
          }
          dispatch(setLoading(false));
          return;
        }
        dispatch(setTransactionTypes(res.data.data || []));
        dispatch(setLoading(false));
      })
      .catch(res => {
        console.log(res);
        dispatch(setLoading(false));
        if (res.code === 'ERR_NETWORK') {
          if (callbackError) {
            callbackError(ERROR_MESSAGE_NETWORK, true);
          }
          return;
        }
        if (!res) {
          if (callbackError) {
            callbackError(ERROR_MESSAGE_APP, false);
          }
          return;
        }
        const response = res.response;
        switch (response.status) {
          case 400: {
            if (callbackError) {
              callbackError(response.data.data || ERROR_MESSAGE);
            }
            return;
          }
          case 401: {
            callbackError(ERROR_CREDENTIALS_MESSAGE);
            return;
          }
          default: {
            if (callbackError) {
              callbackError(
                (res && res.data && res.data.data) || ERROR_MESSAGE,
              );
            }
            return;
          }
        }
      });
  };
}
export function getStores(
  callbackError?: (message: string, isNetworkError?: boolean) => void,
) {
  return (
    dispatch: Dispatch,
    getState: () => {sessionStore: ISessionStore},
  ) => {
    dispatch(setLoading(true));
    const {sessionStore} = getState();
    fetchStores(sessionStore.informationToken.token)
      .then((res: any) => {
        if (res.code === 'ERR_NETWORK') {
          if (callbackError) {
            callbackError(ERROR_MESSAGE_NETWORK, true);
          }
          dispatch(setLoading(false));
          return;
        }
        if (res.data && res.data && res.data.data.length === 1) {
          dispatch(setStoreSelected(res.data.data[0]));
        }
        dispatch(setStores(res.data.data || []));
        dispatch(setLoading(false));
      })
      .catch(res => {
        console.log(res);
        dispatch(setLoading(false));
        if (res.code === 'ERR_NETWORK') {
          if (callbackError) {
            callbackError(ERROR_MESSAGE_NETWORK, true);
          }
          return;
        }
        if (!res) {
          if (callbackError) {
            callbackError(ERROR_MESSAGE_APP, false);
          }
          return;
        }
        const response = res.response;
        switch (response.status) {
          case 400: {
            if (callbackError) {
              callbackError(response.data.data || ERROR_MESSAGE);
            }
            return;
          }
          case 401: {
            callbackError(ERROR_CREDENTIALS_MESSAGE);
            return;
          }
          default: {
            if (callbackError) {
              callbackError(
                (res && res.data && res.data.data) || ERROR_MESSAGE,
              );
            }
            return;
          }
        }
      });
  };
}

export function validateValeUserFounds(
  idPrograma: number,
  transactionValue: string,
  id: string,
  callbackResult: (information: IInformationUserResponse) => void,
  callbackError: (message: string, isNetworkError?: boolean) => void,
  needValidateFormParent?: boolean,
) {
  return (
    dispatch: Dispatch,
    getState: () => {sessionStore: ISessionStore},
  ) => {
    dispatch(setLoading(true));
    const {sessionStore} = getState();
    fetchValidateAllInformationUser(
      sessionStore.informationToken.token,
      idPrograma,
      transactionValue,
      id,
      needValidateFormParent,
    )
      .then((response1: any) => {
        dispatch(setLoading(false));
        if (needValidateFormParent) {
          if (response1.length === 2) {
            if (
              response1[0].code === 'ERR_NETWORK' ||
              response1[1].code === 'ERR_NETWORK'
            ) {
              callbackError(ERROR_MESSAGE_NETWORK, true);
              return;
            }
            let userInformation: IInformationUserResponse = response1[0].data;
            userInformation.requiereAcudiente =
              response1[1].data.requiereAcudiente || false;
            callbackResult(userInformation);
          }
        } else {
          let userInformation: IInformationUserResponse = response1[0].data;
          callbackResult(userInformation);
        }
      })
      .catch(res => {
        dispatch(setLoading(false));
        if (res.code === 'ERR_NETWORK') {
          callbackError(ERROR_MESSAGE_NETWORK, true);
          return;
        }
        if (!res) {
          callbackError(ERROR_MESSAGE_APP, false);
          return;
        }
        const response = res.response;
        switch (response.status) {
          case 400: {
            callbackError(
              (response && response.data && response.data) || ERROR_MESSAGE,
            );
            return;
          }
          case 401: {
            callbackError(ERROR_CREDENTIALS_MESSAGE);
            return;
          }
          default: {
            callbackError(
              (response && response.data && response.data) || ERROR_MESSAGE,
            );
            return;
          }
        }
      });
  };
}

export function createInvoice(
  fechaTransaccion: string,
  tipoOperacion: string,
  id: string,
  transactionValue: string,
  trackingNumber: string,
  idPrograma: number,
  pin: string,
  acudienteName: string,
  acudienteId: string,
  callbackResult: (isSuccess: boolean) => void,
  callbackError: (message: string, isNetworkError?: boolean) => void,
) {
  return (
    dispatch: Dispatch,
    getState: () => {sessionStore: ISessionStore},
  ) => {
    const {sessionStore} = getState();
    const body = {
      fechaTransaccion: fechaTransaccion,
      idPrograma: idPrograma,
      montoTransaccion: transactionValue,
      idUsuario: sessionStore.informationToken.idUsuario,
      cedula: id,
      idComercio: sessionStore.informationToken.comercio,
      idSucursal: 1015,
      TipoOperacion: tipoOperacion,
      TrackingNumber: trackingNumber,
      pin,
      AcudienteID: acudienteId,
      AcudienteNombre: acudienteName,
    };

    dispatch(setLoading(true));
    fetchCreateInvoice(sessionStore.informationToken.token, body)
      .then((res: any) => {
        dispatch(setLoading(false));
        if (res.code === 'ERR_NETWORK') {
          callbackError(ERROR_MESSAGE_NETWORK, true);
          return;
        }
        dispatch(setInvoiceResponse(res.data.data || undefined));
        if (res && res.data && res.data.data) {
          let currentTransaction = res.data.data;
          let transaction: ITransaction = {
            acudienteID: currentTransaction.acudienteId
              ? currentTransaction.acudienteId
              : '',
            acudienteNombre: currentTransaction.acudienteNombre
              ? currentTransaction.acudienteNombre
              : '',
            cedula: id,
            detalleMovimiento: currentTransaction.detalleMovimiento
              ? currentTransaction.detalleMovimiento
              : '',
            fecha: currentTransaction.fechaTransaccion
              ? currentTransaction.fechaTransaccion
              : '',
            idComercio: body.idComercio,
            idMovimiento: currentTransaction.idMovimiento,
            idPrograma: idPrograma,
            idSucursales: body.idSucursal,
            idUsuario: body.idUsuario,
            montoTransaccion: parseFloat(body.montoTransaccion),
            tipoOperacion: body.TipoOperacion,
            trackingNumber: currentTransaction.trackingNumber,
          };

          dispatch(setTransaction(transaction));
        }
        callbackResult(true);
        return;
      })
      .catch(res => {
        console.log('catch ', res);

        callbackResult(false);
        dispatch(setLoading(false));
        if (res.code === 'ERR_NETWORK') {
          callbackError(ERROR_MESSAGE_NETWORK, true);
          return;
        }
        if (!res) {
          callbackError(ERROR_MESSAGE_APP, false);
          return;
        }
        const response = res.response;
        switch (response.status) {
          case 400: {
            callbackError(response.data.data || ERROR_MESSAGE);
            return;
          }
          case 401: {
            callbackError(ERROR_CREDENTIALS_MESSAGE);
            return;
          }
          default: {
            callbackError(res.data.data || ERROR_MESSAGE);
            return;
          }
        }
      });
  };
}

export function validateIFCheckForParent(
  idPrograma: number,
  id: string,
  callbackError: (message: string, isNetworkError?: boolean) => void,
) {
  return (
    dispatch: Dispatch,
    getState: () => {sessionStore: ISessionStore},
  ) => {
    dispatch(setLoading(true));
    const {sessionStore} = getState();
    fetchHasToValidateParent(
      sessionStore.informationToken.token,
      idPrograma,
      id,
    )
      .then((res: any) => {
        if (res.code === 'ERR_NETWORK') {
          callbackError(ERROR_MESSAGE_NETWORK, true);
          dispatch(setLoading(false));
          return;
        }
        dispatch(setTransactionTypes(res.data.data || []));
        dispatch(setLoading(false));
      })
      .catch(res => {
        console.log(res);
        dispatch(setLoading(false));
        if (res.code === 'ERR_NETWORK') {
          callbackError(ERROR_MESSAGE_NETWORK, true);
          return;
        }
        if (!res) {
          callbackError(ERROR_MESSAGE_APP, false);
          return;
        }
        const response = res.response;
        switch (response.status) {
          case 400: {
            callbackError(response.data.data || ERROR_MESSAGE);
            return;
          }
          case 401: {
            callbackError(ERROR_CREDENTIALS_MESSAGE);
            return;
          }
          default: {
            callbackError(res.data.data || ERROR_MESSAGE);
            return;
          }
        }
      });
  };
}

export const dBStore = () => {
  try {
    getDBConnection().then(db => {
      createTable(db);
    });
  } catch (error) {
    console.error(error);
  }
};

export const setTransactions = async (transaction: ITransaction) => {
  try {
    const db = await getDBConnection();
    await saveTodoItems(db, [transaction]);
  } catch (error) {
    console.error(error);
  }
};

export const deleteLocalTransactions = async (transactions: ITransaction[]) => {
  // return async (dispatch: Dispatch) => {
  console.log('go to delete');
  try {
    const db = await getDBConnection();
    await deleteTodoItem(db, transactions);
  } catch (error) {
    console.error(error, 'When remove');
  }
};

export const getTransactionsFromDb = () => {
  console.log('getAll transations');

  return async (dispatch: Dispatch) => {
    try {
      const db = await getDBConnection();
      getTodoItems(db).then((transactions: ITransaction[]) => {
        dispatch(setLocalTransactions(transactions));
      });
    } catch (error) {
      console.log('error transactions');
      dispatch(setLocalTransactions([]));
      console.error(error);
    }
  };
};

export function transactionsConciliation(
  callbackResult?: (response: any) => void,
  callbackError?: (message: string, isNetworkError?: boolean) => void,
) {
  return (
    dispatch: Dispatch,
    getState: () => {sessionStore: ISessionStore; appStore: any},
  ) => {
    dispatch(setLoading(true));
    const {sessionStore, appStore} = getState();
    fetchCreateConciliation(
      sessionStore.informationToken.token,
      appStore.localTransactions,
    )
      .then((res: any) => {
        if (res.code === 'ERR_NETWORK') {
          if (callbackError) {
            callbackError(ERROR_MESSAGE_NETWORK, true);
          }
          dispatch(setLoading(false));
          return;
        }
        console.log('resp transactions', res.data.data);
        let result = res.data.data; //dispatch(setTransactionTypes(res.data.data || []));
        if (
          result.transaccionesEncontradas &&
          result.transaccionesEncontradas.length > 0
        ) {
          deleteLocalTransactions(result.transaccionesEncontradas).then(() => {
            dispatch(getTransactions());
          });
        }
        callbackResult(res.data.data);
        dispatch(setLoading(false));
      })
      .catch(res => {
        console.log('error', res);
        dispatch(setLoading(false));
        if (res.code === 'ERR_NETWORK') {
          if (callbackError) {
            callbackError(ERROR_MESSAGE_NETWORK, true);
          }
          return;
        }
        if (!res) {
          if (callbackError) {
            callbackError(ERROR_MESSAGE_APP, false);
          }
          return;
        }
        const response = res.response;
        switch (response.status) {
          case 400: {
            if (callbackError) {
              callbackError(response.data.data || ERROR_MESSAGE);
            }
            return;
          }
          case 401: {
            callbackError(ERROR_CREDENTIALS_MESSAGE);
            return;
          }
          default: {
            if (callbackError) {
              callbackError(
                (res && res.data && res.data.data) || ERROR_MESSAGE,
              );
            }
            return;
          }
        }
      });
  };
}
