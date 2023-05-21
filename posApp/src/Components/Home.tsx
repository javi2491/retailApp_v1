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
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {
  createInvoice,
  getTransactions,
  getTransactionTypes,
  setLoading,
  validateValeUserFound,
} from '../redux/actions/AppStore/Index';
import {
  ICreateInvoice,
  IInformationUserResponse,
  IInvoiceResponse,
  IStore,
  ITransactionTypes,
  IValidateUser,
  STATE_APP,
} from '../redux/models/ModelApp';
import {Colors} from '../Utils/Colors';
import {
  BackButton,
  getcurrentFormatedDate,
  NOT_FOUNDS_USERS,
  SeparatorView,
  TIPO_OPERACION,
  TIPO_OPERACIONES,
} from '../Utils/Commons';
import {CHECK_ACTIVE, CHECK_NORMAL} from '../Utils/Images';
import md5 from 'react-native-md5';
import CurrencyInput from 'react-native-currency-input';
import SelectDropdown from 'react-native-select-dropdown';

import Summary from './Summary';
import {WarningModal} from './WarningModal';

interface IProps {
  stores: IStore[];
  currentAppState: STATE_APP;
  informationToken: {
    token: string;
    expiresAt: string;
    idUsuario: number;
    comercio: number;
  };
  transactionTypes: ITransactionTypes[];
  getTransactionTypes: (
    callbackError: (message: string, isNetworkError?: boolean) => void,
  ) => void;
  validateValeUserFound: (
    values: IValidateUser,
    callbackResult: (information: IInformationUserResponse) => void,
    callbackError: (message: string, isNetworkError?: boolean) => void,
    needValidateFormParent: boolean,
  ) => void;
  createInvoice: (
    values: ICreateInvoice,
    callbackResult: (isSuccess: boolean) => void,
    callbackError: (message: string, isNetworkError?: boolean) => void,
  ) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  invoiceResponse: IInvoiceResponse;
  getTransactions: () => void;
}
enum STEPS {
  FIRST_STEP,
  SECOND_STEP,
  THIRD_STEP,
  SUMMARY,
}

interface IFristStep {
  transactionTypes: ITransactionTypes[];
  transactionSelected?: ITransactionTypes;
  handleSelectTransaction: (transactionType: ITransactionTypes) => void;
  isLoading: boolean;
  tipoOperacionSelected: TIPO_OPERACION;

  handleClickOperation: (TIPO_OPERACION) => void;
  hanldeClickContinue: () => void;
}
const IDOPTIONS = ['', 'E-', 'N-'];

function FirstStep({
  transactionTypes,
  transactionSelected,
  handleSelectTransaction,
  isLoading,
  handleClickOperation,
  tipoOperacionSelected,
  hanldeClickContinue,
}: IFristStep) {
  const [canContinue, setCanContinue] = React.useState(false);
  const [alreadySearch, setAlreadySearch] = React.useState(false);

  const handleNext = () => {
    setAlreadySearch(true);
    if (transactionSelected) {
      hanldeClickContinue();
      setCanContinue(true);
    } else {
      setCanContinue(false);
    }
  };

  const renderItem = item => {
    return (
      <View key={item.idPrograma} style={{flexDirection: 'column'}}>
        <TouchableOpacity
          style={[
            homeStyle.itemButton,
            {
              backgroundColor:
                transactionSelected &&
                transactionSelected.idPrograma === item.idPrograma
                  ? Colors.AppColor
                  : Colors.White,
            },
          ]}
          onPress={() => handleSelectTransaction(item)}>
          <Text
            style={[
              homeStyle.itemText,
              {
                color:
                  transactionSelected &&
                  transactionSelected.idPrograma === item.idPrograma
                    ? Colors.White
                    : Colors.Black,
              },
            ]}>
            {item.descripcion}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderOperantionItem = item => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            marginHorizontal: 25,
          }}
          disabled={isLoading}
          onPress={() => handleClickOperation(item.id)}>
          {tipoOperacionSelected === item.id ? (
            <Image source={CHECK_ACTIVE} />
          ) : (
            <Image source={CHECK_NORMAL} />
          )}
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 5,
              fontWeight: tipoOperacionSelected === item.id ? '900' : '400',
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const FlatList_Header = () => {
    return (
      <View
        style={{
          height: 45,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: Colors.Gray}}>
          Selecciona un programa
        </Text>
      </View>
    );
  };
  return (
    <View>
      <View
        style={{
          flex: 2,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FlatList
          data={transactionTypes}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={item => `feed_${item.idPrograma}`}
          ListHeaderComponent={FlatList_Header}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 2,
            flex: 1,
          }}
        />
        <View style={homeStyle.viewLine} />
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: 12,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              marginVertical: 20,
              color: Colors.Gray,
            }}>
            Tipo de Operación
          </Text>
        </View>
        <View style={{maxHeight: 88}}>
          <FlatList
            data={TIPO_OPERACIONES}
            numColumns={3}
            renderItem={({item}) => renderOperantionItem(item)}
            keyExtractor={item => `feed_${item.id}`}
            columnWrapperStyle={{justifyContent: 'center'}}
          />
        </View>
      </View>

      <SeparatorView height={10} />
      {!canContinue && alreadySearch && !transactionSelected && (
        <Text style={homeStyle.textError}>Selecciona un programa</Text>
      )}
      <TouchableOpacity
        onPress={handleNext}
        style={[
          homeStyle.itemButton,
          {
            backgroundColor: Colors.Black,
          },
        ]}>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color={Colors.White}
            style={{position: 'absolute', left: 10}}
          />
        )}
        <Text
          style={[
            homeStyle.itemText,
            {
              color: Colors.White,
            },
          ]}>
          Continuar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

interface ISecondStep {
  transactionSelected?: ITransactionTypes;
  handleChangeId: (value: string) => void;
  handleChangeValue: (value: number) => void;
  handleChangeTransactionNumber: (e: any, value: string) => void;
  id: string;
  handleVlidateInformation: () => void;
  isLoading: boolean;
  amount: number;
  showErrorInStepTwo: boolean;
  stores: IStore[];
  tipoId: string;
  handleSelectTipoId: (tipoId: string) => void;
}

function SecondStep({
  handleChangeId,
  transactionSelected,
  handleChangeValue,
  id,
  handleSelectTipoId,
  tipoId,
  handleVlidateInformation,
  isLoading,
  showErrorInStepTwo,
  amount,
  stores,
}: ISecondStep) {
  React.useEffect(() => {}, [id, amount]);
  const borderColorId =
    showErrorInStepTwo && id.length === 0 ? Colors.Red : Colors.AppColor;
  const borderColorTotal =
    showErrorInStepTwo && amount <= 0 ? Colors.Red : Colors.AppColor;
  return (
    <View
      style={{
        backgroundColor: Colors.White,
        marginHorizontal: 12,
        borderRadius: 8,
        minWidth: '90%',
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 23,
          fontWeight: '600',
          marginVertical: 20,
          color: Colors.Gray,
        }}>
        {transactionSelected.descripcion}
      </Text>
      {stores && stores.length === 1 && (
        <Text
          style={{
            textAlign: 'center',
            fontSize: 23,
            fontWeight: '300',
            marginVertical: 20,
            color: Colors.AppColor,
          }}>
          {stores[0].descripcion}
        </Text>
      )}
      <View
        style={{
          backgroundColor: Colors.White,
          marginHorizontal: 20,
          marginVertical: 8,
          flexDirection: 'column',
        }}>
        <View
          style={[
            {width: '100%', flexDirection: 'row', alignItems: 'center'},
            homeStyle.inputStyle,
          ]}>
          <SelectDropdown
            data={IDOPTIONS}
            buttonStyle={{
              position: 'absolute',
              left: 5,
              zIndex: 1,
              width: 60,
            }}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: Colors.Gray,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    {tipoId ? tipoId : 'Tipo'}
                  </Text>
                </View>
              );
            }}
            onSelect={handleSelectTipoId}
            buttonTextAfterSelection={selectedItem => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={item => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
          <TextInput
            style={[
              homeStyle.inputGroup,
              {borderColor: borderColorId, paddingLeft: 40},
            ]}
            autoFocus={true}
            placeholderTextColor={Colors.WhiteGray}
            placeholder={'8-7403-4532'}
            keyboardType="phone-pad"
            onChangeText={handleChangeId}
            value={id}></TextInput>
        </View>
        {showErrorInStepTwo && id.length === 0 && (
          <Text style={homeStyle.textError}>Ingrese una cédula</Text>
        )}
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: Colors.White,
            marginHorizontal: 20,
            marginVertical: 8,
            flex: 1,
          }}>
          <CurrencyInput
            style={[homeStyle.inputStyle, {borderColor: borderColorTotal}]}
            value={amount}
            onChangeValue={handleChangeValue}
            prefix="$"
            delimiter=","
            separator="."
            precision={2}
            minValue={0}
            placeholder={'Ingrese monto'}
          />
          {showErrorInStepTwo && amount <= 0 && (
            <Text style={homeStyle.textError}>Ingrese un monto</Text>
          )}
        </View>
      </View>
      <SeparatorView height={10} />
      <TouchableOpacity
        onPress={handleVlidateInformation}
        style={[
          homeStyle.itemButton,
          {
            backgroundColor: Colors.Black,
          },
        ]}>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color={Colors.White}
            style={{position: 'absolute', left: 10}}
          />
        )}
        <Text
          style={[
            homeStyle.itemText,
            {
              color: Colors.White,
            },
          ]}>
          Procesar
        </Text>
      </TouchableOpacity>
      <SeparatorView height={10} />
    </View>
  );
}

interface IThirdStep {
  handleChangePin: (value: string) => void;
  handleChangeAcudiente: (value: string) => void;
  handleChangeAcudienteId: (value: string) => void;
  showAcudienteInput: boolean;
  handleClickSendInvoice: () => void;
  isLoading: boolean;
  showErrorInStepThree: boolean;
  pinValue: number;
  acudienteName: string;
  acudienteId: string;
  transactionSelected?: ITransactionTypes;
}
function ThirdStep({
  handleChangePin,
  handleChangeAcudiente,
  showAcudienteInput,
  isLoading,
  handleClickSendInvoice,
  showErrorInStepThree,
  pinValue,
  acudienteId,
  acudienteName,
  handleChangeAcudienteId,
  transactionSelected,
}: IThirdStep) {
  const borderColorPin =
    showErrorInStepThree && pinValue <= 0 ? Colors.Red : Colors.AppColor;
  const borderColorAcudienteName =
    showErrorInStepThree && acudienteName.trim().length === 0
      ? Colors.Red
      : Colors.AppColor;
  const borderColorAcudienteId =
    showErrorInStepThree && acudienteId.trim().length === 0
      ? Colors.Red
      : Colors.AppColor;
  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: Colors.White,
        marginHorizontal: 20,
        paddingVertical: 20,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 23,
          fontWeight: '600',
          marginVertical: 20,
          color: Colors.Gray,
        }}>
        {transactionSelected.descripcion}
      </Text>

      <Text style={homeStyle.titlePin}>Ingrese Pin:</Text>

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.White,
          marginHorizontal: 20,
          marginVertical: 8,
        }}>
        <TextInput
          style={[homeStyle.pinInput, {borderColor: borderColorPin}]}
          keyboardType="number-pad"
          onChangeText={handleChangePin}
          placeholder={'0000'}
          placeholderTextColor={Colors.WhiteGray}
          maxLength={4}
          secureTextEntry={true}
          focusable={true}
          autoFocus={true}
        />
      </View>
      {showErrorInStepThree && pinValue === 0 && (
        <Text style={homeStyle.textError}>Ingrese un pin</Text>
      )}
      {showAcudienteInput && (
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.White,
            marginHorizontal: 12,
            marginVertical: 8,
          }}>
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: Colors.White,
              marginHorizontal: 12,
              flex: 1,
            }}>
            <TextInput
              style={[
                homeStyle.inputStyle,
                {borderColor: borderColorAcudienteId, fontSize: 15},
              ]}
              keyboardType="default"
              placeholder="Id acudiente"
              placeholderTextColor={Colors.WhiteGray}
              onChangeText={handleChangeAcudienteId}
            />
            {showErrorInStepThree && acudienteId.trim().length === 0 && (
              <Text style={homeStyle.textError}>Ingrese el acudiente id</Text>
            )}
          </View>
        </View>
      )}
      {showAcudienteInput && (
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.White,
            marginHorizontal: 12,
            marginVertical: 8,
          }}>
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: Colors.White,
              marginHorizontal: 12,
              flex: 1,
            }}>
            <TextInput
              style={[
                homeStyle.inputStyle,
                {borderColor: borderColorAcudienteName, fontSize: 15},
              ]}
              placeholderTextColor={Colors.WhiteGray}
              keyboardType="default"
              placeholder="Nombre de acudiente"
              onChangeText={handleChangeAcudiente}
            />
            {showErrorInStepThree && acudienteName.trim().length === 0 && (
              <Text style={homeStyle.textError}>
                Ingrese el nombre del acudiente
              </Text>
            )}
          </View>
        </View>
      )}
      <SeparatorView height={25} />
      <TouchableOpacity
        disabled={isLoading}
        onPress={handleClickSendInvoice}
        style={[
          homeStyle.invoiceButton,
          {
            backgroundColor: Colors.Black,
          },
        ]}>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color={Colors.White}
            style={{position: 'absolute', left: 10}}
          />
        )}
        <Text
          style={[
            homeStyle.itemText,
            {
              color: Colors.White,
            },
          ]}>
          Enviar
        </Text>
      </TouchableOpacity>
      <SeparatorView height={5} />
    </View>
  );
}

interface IState {
  transactionSelected?: ITransactionTypes;
  currentStep: STEPS;
  id: string;
  amount: number;
  tipoOperacionSelected: TIPO_OPERACION;
  transactionNumber: string;
  pin: number;
  acudienteName: string;
  showAcudienteView: boolean;
  alreadyValidate: boolean;
  alreadySubmit: boolean;
  showErrorInStepTwo: boolean;
  showErrorInStepThree: boolean;
  modalIsVisible: boolean;
  messageError: string;
  changeUpBackButton: boolean;
  acudienteId: string;
  tipoId: string;
}

class Home extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      transactionSelected: undefined,
      currentStep: STEPS.FIRST_STEP,
      amount: 0,
      id: '',
      transactionNumber: '',
      tipoOperacionSelected: TIPO_OPERACION.VENTA,
      pin: 0,
      acudienteName: '',
      showAcudienteView: false,
      alreadyValidate: false,
      alreadySubmit: false,
      showErrorInStepTwo: false,
      showErrorInStepThree: false,
      messageError: '',
      modalIsVisible: false,
      changeUpBackButton: false,
      acudienteId: '',
      tipoId: '',
    };
  }
  componentDidMount() {
    if (
      this.props.informationToken &&
      this.props.informationToken.token.length > 0
    ) {
      this.props.getTransactionTypes(this.handleErrorRequest);
      console.log(this.props);
    }
  }

  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
  ): void {
    if (
      prevProps.transactionTypes.length > 0 &&
      !prevState.transactionSelected
    ) {
      this.setState({transactionSelected: prevProps.transactionTypes[0]});
    }
  }

  handleSelectTransaction = (transactionSelected: ITransactionTypes) => {
    this.setState({transactionSelected});
  };

  handleClickContinue = () => {
    this.setState({currentStep: STEPS.SECOND_STEP});
  };

  handleChangeValue = (amount: number) => {
    this.setState({amount});
  };

  handleChangeId = (value: string) => {
    this.setState({id: value});
  };

  handleChangeTransactionNumber = (e: any, value: string) => {
    this.setState({transactionNumber: value});
  };

  handleChangePin = (value: string) => {
    let pin = value.replace(/[^0-9]/g, '');
    this.setState({pin: pin.length === 0 ? 0 : parseInt(pin.toString())});
  };

  handleChangeAcudiente = (value: string) => {
    this.setState({acudienteName: value});
  };

  handleChangeAcudienteId = (value: string) => {
    this.setState({acudienteId: value});
  };

  handleVlidateInformation = () => {
    const {id, amount, transactionSelected, tipoId} = this.state;
    this.setState({alreadyValidate: true});
    if (id.trim().length > 0 && amount > 0) {
      let values = {
        idPrograma: transactionSelected.idPrograma,
        id: tipoId.trim() + id,
        transactionValue: amount.toFixed(2),
      };

      this.props.validateValeUserFound(
        values,
        this.handleResultValidateUser,
        this.handleErrorRequest,
        transactionSelected.descripcion === 'Beca Digital',
      );
    } else {
      this.setState({showErrorInStepTwo: true});
    }
  };

  handleResultValidateUser = (result: IInformationUserResponse) => {
    if (result && result.saldoSuficiente && result.programaActivo) {
      this.setState({
        currentStep: STEPS.THIRD_STEP,
        showAcudienteView: result.requiereAcudiente,
        pin: 0,
      });
    } else {
      this.handleErrorRequest(NOT_FOUNDS_USERS(result.cedula));
    }
  };

  handleErrorRequest = (messge: string) => {
    this.setState({messageError: messge, modalIsVisible: true});
  };

  handleClickOperation = (operation: TIPO_OPERACION) => {
    this.setState({tipoOperacionSelected: operation});
  };

  handleClickSendInvoice = () => {
    const {pin, showAcudienteView, acudienteId, acudienteName} = this.state;
    this.setState({alreadySubmit: true});
    if (pin !== 0 && pin.toString().length === 4) {
      if (
        (showAcudienteView && acudienteId.trim().length === 0) ||
        (showAcudienteView && acudienteName.trim().length === 0)
      ) {
        this.setState({showErrorInStepThree: true});
      } else {
        this.sendCreateInvoice();
      }
    } else {
      this.setState({showErrorInStepThree: true});
    }
  };

  sendCreateInvoice = async () => {
    const {
      pin,
      tipoOperacionSelected,
      amount,
      transactionSelected,
      id,
      acudienteId,
      acudienteName,
      tipoId,
    } = this.state;
    let md5Pin = md5.hex_md5(pin + '');
    let values = {
      id: tipoId.trim() + id,
      fechaTransaccion: getcurrentFormatedDate(),
      tipoOperacion: tipoOperacionSelected,
      transactionValue: amount.toFixed(2),
      trackingNumber: new Date().getTime() + '',
      idPrograma: transactionSelected.idPrograma,
      pin: md5Pin,
      acudienteId,
      acudienteName,
    };
    this.props.createInvoice(values, this.showResult, this.handleErrorRequest);
  };

  showResult = (isSuccess: boolean) => {
    if (isSuccess) {
      this.setState({currentStep: STEPS.SUMMARY});
    }
  };

  normaliseValue(value: string, decimals = 2) {
    if (!value) {
      return '';
    }
    if (value === '.') {
      return (value = '0.');
    }

    var regex = new RegExp(`^-?\\d+(?:\\.\\d{0,${decimals}})?`);
    const decimalsNumber = value.toString().match(regex)[0];
    const parsed = parseFloat(decimalsNumber).toFixed(2);
    if (isNaN(parseFloat(parsed))) {
      return '';
    }
    return parsed;
  }
  handleReset = () => {
    this.setState({
      currentStep: STEPS.FIRST_STEP,
      amount: 0,
      id: '',
      transactionNumber: '',
      tipoOperacionSelected: TIPO_OPERACION.VENTA,
      pin: 0,
      acudienteName: '',
      showAcudienteView: false,
      alreadyValidate: false,
      tipoId: '',
    });
  };

  handleCloseModal = () => {
    this.setState({
      modalIsVisible: false,
      messageError: '',
    });
  };

  hanldeBack = () => {
    const {currentStep} = this.state;
    let neCurrentStep;
    switch (currentStep) {
      case STEPS.SECOND_STEP: {
        neCurrentStep = STEPS.FIRST_STEP;
        break;
      }
      case STEPS.THIRD_STEP: {
        neCurrentStep = STEPS.SECOND_STEP;
        break;
      }
    }
    this.setState({currentStep: neCurrentStep});
  };
  handleSelectTipoId = (tipoId: string) => {
    this.setState({tipoId});
  };

  render() {
    const {transactionTypes, isLoading, currentAppState, stores} = this.props;
    const {
      transactionSelected,
      currentStep,
      id,
      amount,
      tipoOperacionSelected,
      showAcudienteView,
      alreadyValidate,
      alreadySubmit,
      showErrorInStepThree,
      showErrorInStepTwo,
      pin,
      messageError,
      modalIsVisible,
      changeUpBackButton,
      acudienteId,
      acudienteName,
      tipoId,
    } = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <SeparatorView height={10} />

        {currentAppState === STATE_APP.LOGGED_IN ? (
          <View style={homeStyle.containerTypes}>
            {isLoading && currentStep === STEPS.FIRST_STEP && (
              <>
                <ActivityIndicator size="large" color={Colors.AppColor} />
                <Text>Cargando...</Text>
              </>
            )}

            {currentStep === STEPS.FIRST_STEP && !isLoading && (
              <FirstStep
                transactionTypes={transactionTypes}
                transactionSelected={transactionSelected}
                handleSelectTransaction={this.handleSelectTransaction}
                isLoading={isLoading}
                tipoOperacionSelected={tipoOperacionSelected}
                handleClickOperation={this.handleClickOperation}
                hanldeClickContinue={this.handleClickContinue}
              />
            )}
            {currentStep === STEPS.SECOND_STEP && (
              <SecondStep
                handleChangeValue={this.handleChangeValue}
                transactionSelected={transactionSelected}
                handleChangeId={this.handleChangeId}
                amount={amount}
                id={id}
                handleVlidateInformation={this.handleVlidateInformation}
                isLoading={isLoading}
                handleChangeTransactionNumber={
                  this.handleChangeTransactionNumber
                }
                showErrorInStepTwo={showErrorInStepTwo && alreadyValidate}
                stores={stores}
                tipoId={tipoId}
                handleSelectTipoId={this.handleSelectTipoId}
              />
            )}
            {currentStep === STEPS.THIRD_STEP && (
              <ThirdStep
                showAcudienteInput={showAcudienteView}
                handleChangeAcudiente={this.handleChangeAcudiente}
                handleChangePin={this.handleChangePin}
                handleClickSendInvoice={this.handleClickSendInvoice}
                isLoading={isLoading}
                showErrorInStepThree={showErrorInStepThree && alreadySubmit}
                pinValue={pin}
                acudienteName={acudienteName}
                acudienteId={acudienteId}
                handleChangeAcudienteId={this.handleChangeAcudienteId}
                transactionSelected={transactionSelected}
              />
            )}
            {currentStep === STEPS.SUMMARY && (
              <Summary handleReset={this.handleReset} />
            )}
            <WarningModal
              message={messageError}
              modalVisible={modalIsVisible}
              handleCloseModal={this.handleCloseModal}
            />

            <BackButton
              visible={
                currentStep === STEPS.SECOND_STEP ||
                currentStep === STEPS.THIRD_STEP
              }
              changePositionUpButton={changeUpBackButton}
              handleBack={this.hanldeBack}
            />
          </View>
        ) : (
          <View
            style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={Colors.AppColor} />
            <Text>Saliendo...</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const homeStyle = StyleSheet.create({
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
    margin: 15,
    borderRadius: 50,
    marginBottom: 1,
  },
  itemText: {
    fontSize: 28,
    paddingHorizontal: 15,
  },
  containerTypes: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  pinInput: {
    borderWidth: 1,
    width: '100%',
    height: 55,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: 'transparent',
    color: Colors.Gray,
    borderColor: Colors.AppColor,
  },
  titlePin: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 15,
  },
  containerSteps: {
    backgroundColor: Colors.White,
    marginHorizontal: 12,
    borderRadius: 8,
  },
  inputStyle: {
    borderColor: Colors.AppColor,
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    padding: 8,
    fontSize: 24,
    textAlign: 'center',
    elevation: 2,
    backgroundColor: Colors.White,
    color: Colors.Gray,
  },
  inputGroup: {
    height: 60,
    width: '90%',
    padding: 8,
    fontSize: 24,
    textAlign: 'center',
    color: Colors.Gray,
  },
  textError: {
    color: Colors.Red,
    textAlign: 'center',
    fontSize: 14,
    margin: 1,
  },
  viewLine: {
    borderBottomColor: Colors.WhiteGray,
    width: '100%',
    borderBottomWidth: 0.5,
    backgroundColor: Colors.AppColor,
    marginVertical: 8,
  },
});

const mapStateToProps = (state: any) => {
  return {
    informationToken: state.sessionStore.informationToken,
    transactionTypes: state.appStore.transactionTypes,
    isLoading: state.appStore.isLoading,
    invoiceResponse: state.appStore.invoiceResponse,
    currentAppState: state.appStore.currentAppState,
    stores: state.appStore.stores,
  };
};

function bindToAction(dispatch: any) {
  return {
    // getInformationToken: (body: ILoginBody) =>
    //   dispatch(getInformationToken(body)),
    getTransactionTypes: (
      callbackError: (message: string, isNetworkError?: boolean) => void,
    ) => dispatch(getTransactionTypes(callbackError)),
    validateValeUserFound: (
      values: {
        idPrograma: number;
        id: string;
        transactionValue: string;
      },
      callbackResult: (information: IInformationUserResponse) => void,
      callbackError: (message: string, isNetworkError?: boolean) => void,
      needValidateFormParent: boolean,
    ) =>
      dispatch(
        validateValeUserFound(
          values,
          callbackResult,
          callbackError,
          needValidateFormParent,
        ),
      ),
    createInvoice: (
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
    ) => dispatch(createInvoice(values, callbackResult, callbackError)),
    setIsLoading: (isLoading: boolean) => dispatch(setLoading(isLoading)),
    getTransactions: () => dispatch(getTransactions()),
  };
}

export default connect(mapStateToProps, bindToAction)(Home);
