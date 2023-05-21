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
import {StyleSheet, View, Text} from 'react-native';
import {ITransaction} from '../../redux/models/ModelApp';
import {Colors} from '../../Utils/Colors';

interface IProps {
  invoiceResponse: ITransaction;
}

export default class Conciliation extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }
  componentDidMount() {}

  render() {
    const {invoiceResponse} = this.props;
    return (
      <View style={{padding: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={summaryStyle.containerColumn}>
            <Text style={summaryStyle.textAlignRight}>Fecha:</Text>
          </View>
          <View style={summaryStyle.containerColumn}>
            <Text style={summaryStyle.textAlignLeft}>
              {(invoiceResponse && invoiceResponse.fecha) || ''}
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
              {(invoiceResponse && invoiceResponse.montoTransaccion) || ''}
            </Text>
          </View>
        </View>
      </View>
      // <SeparatorView height={15} />
      // </View>

      // <SeparatorView height={5} />
      // </View>
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
    flex: 1,
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
