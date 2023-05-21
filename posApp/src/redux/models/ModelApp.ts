export interface ITransactionTypes {
  idPrograma: number;
  descripcion: string;
  activo: number;
  idEntidadSubsidio: number;
  cashOut: string;
  cashOutAcum: string;
  validacionPin: string;
  validacionRepresentante: string;
  cashOutPorcentaje: number;
  montoFondo: number;
  montoRecarga: number;
  recargaTarjetaVirtual: string;
  recargaTarjetaFisica: string;
  transferenciaFondos: string;
  facturaServicios: string;
  porRecargaTarjetaVirutal: number;
  porRecargaTarjetaFisica: number;
  porFacturaServicios: number;
  recargaTelecom: string;
  porRecargaTelecom: number;
  transporteDesdeApp: string;
  porTransporteDesdeApp: 15.0;
  transportePublico: string;
  porTransportePublico: number;
  pagosBilletera: string;
  porPagosBilletera: number;
  porTransferenciaFondos: number;
  idEnteGestor: number;
  tipoReembolso: string;
  idEntidadSubsidioNavigation: null;
}

export interface ISessionStore {
  informationToken: {
    token: string;
    expiresAt: string;
    idUsuario: number;
    comercio: number;
    email: string;
    password: string;
  };
  storeSelected?: IStore;
}

export interface IInvoiceBody {
  fechaTransaccion: string;
  idPrograma: number;
  montoTransaccion: string;
  idUsuario: number;
  cedula: string;
  idComercio: number;
  idSucursal: number;
  TipoOperacion: string;
  TrackingNumber: string;
  DetalleMovimiento?: string;
  pin?: string;
}

export interface IInvoiceResponse {
  acudienteId: string;
  acudienteNombre: string;
  descripcionPrograma: string;
  detalleMovimiento: string;
  cedula: string;
  estado: string;
  fechaTransaccion: string;
  idBeneficiario: number;
  idMovimiento: number;
  idPrograma: number;
  idTipoTransaccion: number;
  montoTransaccion: number;
  noAutorizacion: string;
  nombreBeneficiario: string;
  tipoOperacion: string;
  trackingNumber: string;
}
export interface ITransaction {
  acudienteID: string;
  acudienteNombre: string;
  detalleMovimiento: string;
  cedula: string;
  idSucursales: number;
  fecha: string;
  idMovimiento: number;
  idPrograma: number;
  montoTransaccion: number;
  tipoOperacion: string;
  trackingNumber: string;
  idUsuario: number;
  idComercio: number;
}

export interface IValidateUser {
  idPrograma: number;
  id: string;
  transactionValue: string;
}

export interface IInformationUserResponse {
  saldoSuficiente: boolean;
  programaActivo: boolean;
  cedula: string;
  noPreautorizacion: string;
  requiereAcudiente?: boolean;
}

export interface ICreateInvoice {
  fechaTransaccion: string;
  tipoOperacion: string;
  id: string;
  transactionValue: string;
  trackingNumber: string;
  idPrograma: number;
  pin: string;
  acudienteId: string;
  acudienteName: string;
}

export interface ILoginBody {
  password: string;
  email: string;
}

export enum STATE_APP {
  TO_LOGIN = 1,
  LOGGED_IN = 2,
}

export interface IInfoUser {
  token: string;
  expiresAt: string;
  idUsuario: number;
  comercio: number;
  email: string;
  password: string;
}
export interface IStore {
  descripcion: string;
  estado: string;
  idSucursales: number;
  idComercio: number;
  branchId: string;
  direccion: string;
  ubicacion: string;
  provincia: string;
  distrito: string;
  corregimiento: string;
}
