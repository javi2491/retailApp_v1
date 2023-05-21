import {
  LOGOUT_APP,
  SET_INVOICE_RESPONSE,
  SET_LOADING,
  SET_LOCAL_TRANSACTIONS,
  SET_STATE_APP,
  SET_STORES,
  SET_TRANSACTIONTYPES,
} from '../actions/AppStore/Channel';
import {
  IInvoiceResponse,
  IStore,
  ITransaction,
  ITransactionTypes,
  STATE_APP,
} from '../models/ModelApp';

interface Action {
  type: string;
  payload: any;
}
interface State {
  transactionTypes: ITransactionTypes[];
  stores: IStore[];
  isloading: boolean;
  invoiceResponse?: IInvoiceResponse;
  localTransactions: ITransaction[];
}

const intialState = {
  transactionTypes: [],
  stores: [],
  isloading: false,
  currentAppState: STATE_APP.TO_LOGIN,
  localTransactions: [],
};

export default (state: State = intialState, action: Action) => {
  switch (action.type) {
    case SET_TRANSACTIONTYPES:
      return {
        ...state,
        transactionTypes: action.payload.transactionTypes,
      };
    case SET_STORES:
      return {
        ...state,
        stores: action.payload.stores,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isloading,
      };
    case SET_INVOICE_RESPONSE:
      return {
        ...state,
        invoiceResponse: action.payload.invoiceResponse,
      };
    case SET_STATE_APP:
      return {
        ...state,
        currentAppState: action.payload.currentAppState,
      };
    case SET_LOCAL_TRANSACTIONS:
      return {
        ...state,
        localTransactions: action.payload.localTransactions,
      };
    case LOGOUT_APP:
      return {
        ...state,
        currentAppState: STATE_APP.TO_LOGIN,
      };

    default:
      return state;
  }
};
