import axios from 'axios';
import {SERVICE_URL} from '../../Config/AppSetting';
import {IInvoiceBody} from '../models/ModelApp';

const ax = axios.create({
  baseURL: SERVICE_URL,
});
export const fetchTransactionTypes = (token: string, idComercio: number) => {
  console.log('fetchTransaction');
  return new Promise((resolve, reject) => {
    const headers = {authorization: `Bearer ${token}`};
    ax.get(`api/Programa/Comercio?idComercio=${idComercio}`, {headers})
      .then((response: {data: never[]}) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const fetchStores = (token: string) => {
  return new Promise((resolve, reject) => {
    const headers = {authorization: `Bearer ${token}`};
    ax.get(`/api/Comercio/Sucursales`, {headers})
      .then((response: {data: never[]}) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const fetchValidateValeUserFound = (
  token: string,
  idPrograma: number,
  transactionValue: string,
  id: string,
) => {
  console.log('fetchTransaction');
  return new Promise((resolve, reject) => {
    const headers = {authorization: `Bearer ${token}`};
    ax.get(
      `api/Consulta/ConsultaBeneficio?idPrograma=${idPrograma}&montoTransaccion=${transactionValue}&cedula=${id}`,
      {
        headers,
      },
    )
      .then((response: {data: never[]}) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const fetchHasToValidateParent = (
  token: string,
  idPrograma: number,
  id: string,
) => {
  console.log('fetch validate parent');
  return new Promise((resolve, reject) => {
    const headers = {authorization: `Bearer ${token}`};
    ax.get(
      `/api/Consulta/ConsultaAcudiente?idPrograma=${idPrograma}&cedula=${id}`,
      {
        headers,
      },
    )
      .then((response: {data: never[]}) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const fetchValidateAllInformationUser = (
  token: string,
  idPrograma: number,
  transactionValue: string,
  id: string,
  hasToCheckParent?: boolean,
) => {
  if (hasToCheckParent) {
    return new Promise((resolve, reject) => {
      Promise.all([
        fetchValidateValeUserFound(token, idPrograma, transactionValue, id),
        fetchHasToValidateParent(token, idPrograma, id),
      ])
        .then((response: any) => {
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      Promise.all([
        fetchValidateValeUserFound(token, idPrograma, transactionValue, id),
      ])
        .then((response: any) => {
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
};

export const fetchCreateInvoice = (token: string, body: IInvoiceBody) => {
  console.log('fetchTransaction');
  return new Promise((resolve, reject) => {
    const headers = {authorization: `Bearer ${token}`};
    ax.post(`/api/Movimiento`, body, {
      headers,
    })
      .then((response: {data: never[]}) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const fetchCreateConciliation = (token: string, transactions: any[]) => {
  console.log('conciliation');
  return new Promise((resolve, reject) => {
    const headers = {authorization: `Bearer ${token}`};
    ax.post(
      `/api/Movimiento/Conciliacion`,
      {transacciones: transactions},
      {
        headers,
      },
    )
      .then((response: {data: never[]}) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};
