import {
  IInvoiceResponse,
  IStore,
  ITransaction,
  ITransactionTypes,
  STATE_APP,
} from '../../models/ModelApp';
import {
  CHECK_IF_VALIDATE_PARENT,
  CREATE_CONCILIATION,
  CREATE_INVOICE,
  DELETE_CONCILIATION_TRANSACTIONS,
  GET_STORES,
  GET_TRANSACTIONS,
  GET_TRANSACTIONTYPES,
  LOGOUT_APP,
  SET_INVOICE_RESPONSE,
  SET_LOADING,
  SET_LOCAL_TRANSACTIONS,
  SET_STATE_APP,
  SET_STORES,
  SET_TRANSACTION,
  SET_TRANSACTIONTYPES,
  STORE_REHYDRATED_FINISH,
  VALIDATE_VALE_USER_FOUND,
} from './Channel';

export const defaultJson = {payload: {}};

const getTransactionTypes = (
  callbackError: (message: string, isNetworkError?: boolean) => void,
) => {
  return {
    type: GET_TRANSACTIONTYPES,
    payload: {...defaultJson, callbackError},
  };
};

const getStores = (
  callbackError: (message: string, isNetworkError?: boolean) => void,
) => {
  return {
    type: GET_STORES,
    payload: {...defaultJson, callbackError},
  };
};

const validateValeUserFound = (
  values: {
    idPrograma: number;
    id: string;
    transactionValue: string;
  },
  callbackResult: (information: {
    saldoSuficiente: boolean;
    programaActivo: boolean;
    cedula: string;
    noPreautorizacion: string;
  }) => void,
  callbackError: (message: string, isNetworkError?: boolean) => void,
  needValidateFormParent: boolean,
) => {
  const {id, idPrograma, transactionValue} = values;
  return {
    type: VALIDATE_VALE_USER_FOUND,
    payload: {
      ...defaultJson.payload,
      id,
      idPrograma,
      transactionValue,
      callbackResult,
      callbackError,
      needValidateFormParent,
    },
  };
};

const createInvoice = (
  values: {
    fechaTransaccion: string;
    tipoOperacion: string;
    id: string;
    transactionValue: string;
    trackingNumber: string;
    idPrograma: number;
    pin: string;
    acudienteName: string;
    acudienteId: string;
  },
  callbackResult: (isSuccess: boolean) => void,
  callbackError: (message: string, isNetworkError?: boolean) => void,
) => {
  const {
    id,
    idPrograma,
    transactionValue,
    fechaTransaccion,
    tipoOperacion,
    trackingNumber,
    pin,
    acudienteName,
    acudienteId,
  } = values;
  return {
    type: CREATE_INVOICE,
    payload: {
      ...defaultJson.payload,
      id,
      idPrograma,
      transactionValue,
      fechaTransaccion,
      tipoOperacion,
      trackingNumber,
      pin,
      acudienteName,
      acudienteId,
      callbackResult,
      callbackError,
    },
  };
};

const setTransactionTypes = (transactionTypes: ITransactionTypes[]) => {
  return {
    type: SET_TRANSACTIONTYPES,
    payload: {...defaultJson.payload, transactionTypes},
  };
};

const setStores = (stores: IStore[]) => {
  return {
    type: SET_STORES,
    payload: {...defaultJson.payload, stores},
  };
};

const setLoading = (isloading: boolean) => {
  return {
    type: SET_LOADING,
    payload: {...defaultJson.payload, isloading},
  };
};

const setInvoiceResponse = (invoiceResponse: IInvoiceResponse) => {
  return {
    type: SET_INVOICE_RESPONSE,
    payload: {...defaultJson.payload, invoiceResponse},
  };
};

const getCheckValidateParent = (
  idPrograma: number,
  id: string,
  callbackError: (message: string, isNetworkError?: boolean) => void,
) => {
  return {
    type: CHECK_IF_VALIDATE_PARENT,
    payload: {...defaultJson, callbackError},
  };
};

const storeRehydrateFinish = () => {
  return {
    type: STORE_REHYDRATED_FINISH,
  };
};

const setStateApp = (currentAppState: STATE_APP) => {
  return {
    type: SET_STATE_APP,
    payload: {...defaultJson, currentAppState},
  };
};

const setTransaction = (transaction: ITransaction) => {
  return {
    type: SET_TRANSACTION,
    payload: {...defaultJson, transaction},
  };
};

const setLocalTransactions = (localTransactions: ITransaction[]) => {
  return {
    type: SET_LOCAL_TRANSACTIONS,
    payload: {...defaultJson, localTransactions},
  };
};

const deleteTransactions = (localTransactions: ITransaction[]) => {
  return {
    type: DELETE_CONCILIATION_TRANSACTIONS,
    payload: {...defaultJson, localTransactions},
  };
};

const getTransactions = () => {
  return {
    type: GET_TRANSACTIONS,
  };
};

const createConciliation = (
  callbackResult: (result: any) => void,
  callbackError: (message: string, isNetworkError?: boolean) => void,
) => {
  return {
    type: CREATE_CONCILIATION,
    payload: {...defaultJson, callbackResult, callbackError},
  };
};

const logoutApp = () => {
  return {
    type: LOGOUT_APP,
  };
};

export {
  setTransactionTypes,
  setStores,
  getTransactionTypes,
  validateValeUserFound,
  createInvoice,
  setLoading,
  setInvoiceResponse,
  getCheckValidateParent,
  storeRehydrateFinish,
  setStateApp,
  logoutApp,
  getStores,
  setTransaction,
  getTransactions,
  setLocalTransactions,
  createConciliation,
  deleteTransactions,
};
