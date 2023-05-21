/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import * as React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {setLoading} from '../redux/actions/AppStore/Index';
import {IInvoiceResponse} from '../redux/models/ModelApp';
import {Colors} from '../Utils/Colors';
import {
  getcurrentFormatedDate,
  PrintBotton,
  SeparatorView,
} from '../Utils/Commons';
import {RetryPrintModal} from './RetryPrintModal';
import SunmiPrinter, {AlignValue} from '@heasy/react-native-sunmi-printer';
import {LOGO_SUPER_CARNES} from '../Utils/Images';

interface IProps {
  invoiceResponse: IInvoiceResponse;
  handleReset: () => void;
}

class Summary extends React.Component<
  IProps,
  {isPrinting: boolean; modalIsVisible: boolean}
> {
  constructor(props: IProps) {
    super(props);
    this.state = {isPrinting: false, modalIsVisible: false};
  }
  componentDidMount() {}

  hanldeClickReset = () => {
    this.props.handleReset();
  };

  handleClickPrint = () => {
    const {
      idMovimiento,
      montoTransaccion,
      descripcionPrograma,
      nombreBeneficiario,
      cedula,
      noAutorizacion,
      tipoOperacion,
    } = this.props.invoiceResponse;
    this.props.handleReset();
    if (!SunmiPrinter) {
      return;
    }
    SunmiPrinter.hasPrinter().then(value => {
      if (!value) {
        alert('Sin impresora');
        return;
      }
      try {
        let logobase64 = LOGO_SUPER_CARNES.replace(
          'data:image/jpg;base64,',
          '',
        );
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
        SunmiPrinter.lineWrap(1);
        SunmiPrinter.setAlignment(AlignValue.LEFT);
        SunmiPrinter.printerText(`FIRMA:`);
        SunmiPrinter.lineWrap(1);
        SunmiPrinter.setAlignment(AlignValue.CENTER);
        SunmiPrinter.printerText(`----------------------------`);

        SunmiPrinter.lineWrap(3);
        this.props.handleReset();
        SunmiPrinter.cutPaper();
      } catch (error) {
        alert(error);
      }
    });
  };

  handleFinished = () => {
    this.setState({modalIsVisible: true});
  };

  render() {
    const {
      props: {invoiceResponse},
      state: {modalIsVisible},
    } = this;
    return (
      <View style={[summaryStyle.containerSteps, {paddingVertical: 30}]}>
        <View style={summaryStyle.containerInfo}>
          <Text style={summaryStyle.titlePin}>Detalles</Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignRight}>Fecha:</Text>
            </View>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignLeft}>
                {(invoiceResponse && invoiceResponse.fechaTransaccion) || ''}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignRight}>No. Autorizacion:</Text>
            </View>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignLeft}>
                {(invoiceResponse && invoiceResponse.noAutorizacion) || ''}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignRight}>Movimiento Id:</Text>
            </View>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignLeft}>
                {(invoiceResponse && invoiceResponse.idMovimiento) || ''}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignRight}>Tracking #:</Text>
            </View>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignLeft}>
                {(invoiceResponse && invoiceResponse.trackingNumber) || ''}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignRight}>Cédula:</Text>
            </View>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignLeft}>
                {(invoiceResponse && invoiceResponse.cedula) || ''}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignRight}>Beneficiario:</Text>
            </View>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignLeft}>
                {(invoiceResponse && invoiceResponse.nombreBeneficiario) || ''}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignRight}>Descripcion:</Text>
            </View>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignLeft}>
                {(invoiceResponse && invoiceResponse.descripcionPrograma) || ''}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignRight}>Operacion:</Text>
            </View>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignLeft}>
                {(invoiceResponse && invoiceResponse.tipoOperacion) || ''}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignRight}>Monto:</Text>
            </View>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignLeft}>
                {(invoiceResponse &&
                  invoiceResponse.montoTransaccion.toFixed(2)) ||
                  ''}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignRight}>Estado:</Text>
            </View>
            <View style={summaryStyle.containerColumn}>
              <Text style={summaryStyle.textAlignLeft}>
                {(invoiceResponse && invoiceResponse.estado) || ''}
              </Text>
            </View>
          </View>
          <SeparatorView height={15} />

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: Colors.White,
                marginHorizontal: 5,
              }}>
              <SeparatorView height={25} />
              <TouchableOpacity
                onPress={this.props.handleReset}
                style={[
                  summaryStyle.invoiceButton,
                  {
                    backgroundColor: Colors.White,
                  },
                ]}>
                <Text
                  style={[
                    summaryStyle.itemText,
                    {
                      color: Colors.Black,
                    },
                  ]}>
                  Regresar
                </Text>
              </TouchableOpacity>

              <PrintBotton
                invoiceResponse={invoiceResponse}
                handleFinished={this.handleFinished}
              />
            </View>
          </View>
        </View>
        <RetryPrintModal
          modalVisible={modalIsVisible}
          handleCloseModal={this.hanldeClickReset}
          handlePrint={this.handleClickPrint}
        />
        <SeparatorView height={5} />
      </View>
    );
  }
}

const summaryStyle = StyleSheet.create({
  screenView: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  itemButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    elevation: 3,
    margin: 15,
    borderRadius: 50,
  },
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
  containerTypes: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  containerColumn: {
    flexDirection: 'column',
    backgroundColor: Colors.White,
    marginHorizontal: 5,
    width: '50%',
  },
  titlePin: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '900',
    marginVertical: 15,
  },
  containerSteps: {
    backgroundColor: Colors.White,
    marginHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
  },
  containerInfo: {
    flexDirection: 'column',
    backgroundColor: Colors.White,
    marginHorizontal: 12,
    justifyContent: 'center',
    flex: 1,
  },
  textAlignLeft: {
    textAlign: 'left',
    color: Colors.Gray,
  },
  textAlignRight: {
    textAlign: 'right',
    color: Colors.Gray,
  },
});

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.appStore.isLoading,
    invoiceResponse: state.appStore.invoiceResponse,
  };
};

function bindToAction(dispatch: any) {
  return {
    setIsLoading: (isLoading: boolean) => dispatch(setLoading(isLoading)),
  };
}

export default connect(mapStateToProps, bindToAction)(Summary);
