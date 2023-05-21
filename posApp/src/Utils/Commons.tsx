import {View, StyleSheet, Image, Text, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IInvoiceResponse} from '../redux/models/ModelApp';
import SunmiPrinter, {AlignValue} from '@heasy/react-native-sunmi-printer';
import {Colors} from './Colors';
import {BACK_IC, LOGO_SUPER_CARNES} from './Images';
import {useState} from 'react';
export const ERROR_MESSAGE =
  'No logramos completar tu solicitud, por favor inténtalo más tarde.';
export const ERROR_CREDENTIALS_MESSAGE = 'Se actualizaron sus credenciales';
export const ERROR_MESSAGE_NETWORK =
  'No logramos completar tu solicitud, revisa la conexión a internet y vuelve intentarlo.';
export const NOT_FOUNDS_USERS = (id: string) =>
  `La cédula ${id} no cuenta con saldo suficiente para realizar la transacción.`;
export const ERROR_MESSAGE_APP = 'No logramos completar tu solicitud';
export const defaultJson = {payload: {}};

interface ISeparate {
  height: number;
}
export function SeparatorView({height}: ISeparate) {
  return <View style={{height}} />;
}
export enum TIPO_OPERACION {
  VENTA = 'V',
  RETIRO = 'R',
  ANULACION = 'A',
}
export const TIPO_OPERACIONES = [
  {name: 'Venta', id: TIPO_OPERACION.VENTA},
  {name: 'Retiro', id: TIPO_OPERACION.RETIRO},
  // {name: 'Anulacion', id: TIPO_OPERACION.ANULACION},
];
function pad(value: number) {
  if (value < 9) {
    return String(value).padStart(1, '0');
  } else {
    return value;
  }
}

export function getcurrentFormatedDate(avoidSecond?: boolean) {
  if (avoidSecond) {
    var d = new Date(),
      dformat =
        [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join('/') +
        ' ' +
        [d.getHours(), pad(d.getMinutes())].join(':');
    return dformat;
  } else {
    var d = new Date(),
      dformat =
        [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join('/') +
        ' ' +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    return dformat;
  }
}

export function BackButton({
  handleBack,
  visible,
  changePositionUpButton,
}: {
  handleBack: () => void;
  visible: boolean;
  changePositionUpButton: boolean;
}) {
  const position = changePositionUpButton
    ? commonStyle.cotainerButtonUpAbsolute
    : commonStyle.cotainerButtonUpAbsolute;
  return (
    <View style={[{display: visible ? 'flex' : 'none'}, position]}>
      <TouchableOpacity style={commonStyle.backButton} onPress={handleBack}>
        <Image source={BACK_IC} />
      </TouchableOpacity>
    </View>
  );
}

const commonStyle = StyleSheet.create({
  backButton: {
    backgroundColor: Colors.White,
    elevation: 3,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 12,
    margin: 20,
  },
  cotainerButtonAbsolute: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    flex: 1,
  },
  cotainerButtonUpAbsolute: {
    position: 'absolute',
    left: 0,
    top: -28,
  },
});
interface IProps {
  invoiceResponse: IInvoiceResponse;
  handleFinished: () => void;
}
export const PrintBotton = ({invoiceResponse, handleFinished}: IProps) => {
  const {
    idMovimiento,
    montoTransaccion,
    descripcionPrograma,
    nombreBeneficiario,
    cedula,
    noAutorizacion,
    tipoOperacion,
  } = invoiceResponse;
  const [isLoading, setIsLoading] = useState(false);

  const print = async () => {
    if (!SunmiPrinter) {
      return;
    }
    SunmiPrinter.hasPrinter().then(value => {
      if (!value) {
        alert('Sin impresora');
        return;
      }
      setIsLoading(true);
    });
    try {
      let logobase64 = LOGO_SUPER_CARNES.replace('data:image/jpg;base64,', '');
      SunmiPrinter.lineWrap(2);
      SunmiPrinter.setAlignment(AlignValue.CENTER);
      SunmiPrinter.printBitmap(logobase64, 384);
      SunmiPrinter.lineWrap(2);
      SunmiPrinter.setFontSize(23);
      SunmiPrinter.setAlignment(AlignValue.CENTER);
      SunmiPrinter.printerText('IMPORTADORA VIRZI, S.A.');
      SunmiPrinter.lineWrap(1);
      SunmiPrinter.setFontSize(20);
      SunmiPrinter.setAlignment(AlignValue.CENTER);
      SunmiPrinter.printerText('RUC: 32812-0002-2496 DV 63');
      SunmiPrinter.lineWrap(1);
      SunmiPrinter.setFontSize(20);
      SunmiPrinter.setAlignment(AlignValue.CENTER);
      SunmiPrinter.printerText('Ave. Hector Alejandro Sta, Coloma');
      SunmiPrinter.lineWrap(1);
      SunmiPrinter.setFontSize(24);
      SunmiPrinter.setAlignment(AlignValue.CENTER);
      SunmiPrinter.printerText('Santiago, Veraguas');
      SunmiPrinter.lineWrap(1);
      SunmiPrinter.setFontSize(24);
      SunmiPrinter.setAlignment(AlignValue.CENTER);
      SunmiPrinter.printerText('Tel: 998-0581');
      SunmiPrinter.lineWrap(1);
      SunmiPrinter.setFontSize(25);
      SunmiPrinter.setFontWeight(true);
      SunmiPrinter.lineWrap(1);
      SunmiPrinter.setAlignment(AlignValue.CENTER);
      SunmiPrinter.printerText('NO FISCAL');
      SunmiPrinter.lineWrap(1);
      SunmiPrinter.setFontSize(25);
      SunmiPrinter.setFontWeight(true);
      SunmiPrinter.lineWrap(1);
      SunmiPrinter.setAlignment(AlignValue.CENTER);
      SunmiPrinter.printerText(descripcionPrograma);
      SunmiPrinter.setFontSize(25);
      SunmiPrinter.lineWrap(1);
      SunmiPrinter.setAlignment(AlignValue.LEFT);
      SunmiPrinter.printerText(`FACTURA#:${idMovimiento}`);
      SunmiPrinter.lineWrap(1);
      SunmiPrinter.setAlignment(AlignValue.LEFT);
      SunmiPrinter.printerText(`FECHA:${getcurrentFormatedDate(true)}`);
      SunmiPrinter.lineWrap(1);
      SunmiPrinter.setAlignment(AlignValue.LEFT);
      SunmiPrinter.printerText(`NOMBRE:${nombreBeneficiario}`);
      SunmiPrinter.lineWrap(1);
      SunmiPrinter.setAlignment(AlignValue.LEFT);
      SunmiPrinter.printerText(`CEDULA:${cedula}`);
      SunmiPrinter.lineWrap(1);
      SunmiPrinter.setAlignment(AlignValue.LEFT);
      SunmiPrinter.printerText(`TIPO:${tipoOperacion}`);
      SunmiPrinter.lineWrap(1);
      SunmiPrinter.setAlignment(AlignValue.CENTER);
      SunmiPrinter.printerText(`----------------------------`);
      SunmiPrinter.lineWrap(1);
      SunmiPrinter.setAlignment(AlignValue.LEFT);
      SunmiPrinter.printerText(`TOTAL:$${montoTransaccion.toFixed(2)}`);
      SunmiPrinter.lineWrap(1);
      SunmiPrinter.setAlignment(AlignValue.CENTER);
      SunmiPrinter.printerText(`----------------------------`);

      SunmiPrinter.lineWrap(1);
      SunmiPrinter.setAlignment(AlignValue.CENTER);
      SunmiPrinter.printerText(`${noAutorizacion}\n`);

      SunmiPrinter.lineWrap(3);
      setIsLoading(false);
      handleFinished();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={() => print()}
      style={[
        summaryStyle.invoiceButton,
        {
          backgroundColor: Colors.AppColor,
        },
      ]}>
      {isLoading && (
        <ActivityIndicator
          size="small"
          color={Colors.White}
          style={{position: 'absolute', left: 10}}
        />
      )}
      <Text
        style={[
          summaryStyle.itemText,
          {
            color: Colors.White,
          },
        ]}>
        Imprimir
      </Text>
    </TouchableOpacity>
  );
};

const summaryStyle = StyleSheet.create({
  invoiceButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    elevation: 3,
    margin: 5,
    borderRadius: 50,
    marginBottom: 1,
    width: 150,
  },
  itemText: {
    fontSize: 20,
    paddingHorizontal: 15,
  },
});
