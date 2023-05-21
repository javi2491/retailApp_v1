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
import {connect} from 'react-redux';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';

import {SeparatorView} from '../Utils/Commons';
import {Colors} from '../Utils/Colors';
import {ITransaction, STATE_APP} from '../redux/models/ModelApp';
import {
  createConciliation,
  getTransactions,
  setStateApp,
} from '../redux/actions/AppStore/Index';
import {WarningModal} from './WarningModal';
import Conciliation from './Conciliation/Conciliation';
import {CongratulationsModal} from './CongratulationsModal';

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
  getTransactions: () => void;
  isLoading: boolean;
  setCurrentStateApp: (currentState: STATE_APP) => void;
  localTransactions: ITransaction[];
  createConciliation: (
    callbackResult: (resul: any) => void,
    callbackError: (message: string, isNetworkError?: boolean) => void,
  ) => void;
}
class ConciliationView extends React.Component<
  IProps,
  {
    showError: boolean;
    messageError: string;
    messageSuccess: string;
    modalIsVisible: boolean;
    isVisibleongratulationsModal: boolean;
    lastTransactionSended: number;
    foundTransacions: any[];
    notFoundTransacions: any[];
  }
> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showError: false,
      messageError: '',
      messageSuccess: '',
      modalIsVisible: false,
      isVisibleongratulationsModal: false,
      lastTransactionSended: 0,
      foundTransacions: [],
      notFoundTransacions: [],
    };
  }

  componentDidMount() {
    this.props.getTransactions();
  }

  handleCreateConciliation = () => {
    if (this.props.localTransactions.length > 0) {
      this.setState({
        lastTransactionSended: this.props.localTransactions.length,
      });
      this.props.createConciliation(this.handleResult, this.handleError);
    }
  };

  handleError = (message: string) => {
    this.setState({messageError: message, modalIsVisible: true});
  };

  handleResult = (result: {
    transaccionesEncontradas: any[];
    transaccionesNoEncontradas: any[];
  }) => {
    this.setState({
      notFoundTransacions: result.transaccionesNoEncontradas,
      foundTransacions: result.transaccionesEncontradas,
      isVisibleongratulationsModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      messageError: '',
      modalIsVisible: false,
      isVisibleongratulationsModal: false,
    });
  };

  renderItem = (item, index) => {
    return (
      <View key={item.idPrograma + index} style={{}}>
        <TouchableOpacity style={[conciliationStyle.itemButton]}>
          <Conciliation invoiceResponse={item} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {
      props: {isLoading, localTransactions},
      state: {
        modalIsVisible,
        isVisibleongratulationsModal,
        messageError,
        notFoundTransacions,
        foundTransacions,
        messageSuccess,
      },
    } = this;
    return (
      <SafeAreaView style={conciliationStyle.screenView}>
        <View style={{flex: 2, backgroundColor: Colors.WhiteGray}}>
          <Text style={conciliationStyle.title}>Transacciones</Text>

          <FlatList
            data={localTransactions}
            renderItem={({item, index}) => this.renderItem(item, index)}
            keyExtractor={item => `${item.idMovimiento}`}
            ListEmptyComponent={() => (
              <Text
                style={{
                  textAlignVertical: 'center',
                  textAlign: 'center',
                  marginVertical: 50,
                  position: 'relative',
                  color: Colors.Gray,
                }}>
                Sin resultados...
              </Text>
            )}
          />
        </View>
        <View style={conciliationStyle.container}>
          <SeparatorView height={20} />
          {localTransactions.length > 0 && (
            <TouchableOpacity
              disabled={isLoading}
              onPress={this.handleCreateConciliation}
              style={[
                conciliationStyle.invoiceButton,
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
                  conciliationStyle.itemText,
                  {
                    color: Colors.White,
                  },
                ]}>
                Conciliar
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <WarningModal
          message={messageError}
          modalVisible={modalIsVisible}
          handleCloseModal={this.handleCloseModal}
        />
        <CongratulationsModal
          message={messageSuccess}
          modalVisible={isVisibleongratulationsModal}
          handleCloseModal={this.handleCloseModal}
          foundTransacions={foundTransacions}
          notFoundTransacions={notFoundTransacions}
        />
      </SafeAreaView>
    );
  }
}

const conciliationStyle = StyleSheet.create({
  screenView: {
    flex: 1,
    backgroundColor: Colors.White,
    elevation: 4,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WhiteGray,
  },
  title: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 28,
    lineHeight: 27,
    marginTop: 15,
    paddingVertical: 10,
    textAlign: 'center',
    alignContent: 'center',
    color: Colors.Gray,
  },
  subTitle: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 22,
  },
  inputStyle: {
    borderColor: Colors.AppColor,
    height: 55,
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    padding: 8,
    fontSize: 24,
    textAlign: 'center',
    elevation: 2,
    backgroundColor: Colors.White,
    color: Colors.Black,
  },
  invoiceButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 25,
    elevation: 3,
    margin: 15,
    borderRadius: 50,
    marginBottom: 1,
    width: 190,
  },
  itemText: {
    fontSize: 20,
    paddingHorizontal: 15,
  },
  textError: {
    color: Colors.Red,
    textAlign: 'center',
    fontSize: 14,
    margin: 1,
  },
  itemButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
    paddingVertical: 8,
    paddingHorizontal: 8,
    elevation: 3,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 8,
  },
});

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.appStore.isLoading,
    localTransactions: state.appStore.localTransactions,
  };
};

function bindToAction(dispatch: any) {
  return {
    getTransactions: () => dispatch(getTransactions()),
    setCurrentStateApp: (currentState: STATE_APP) =>
      dispatch(setStateApp(currentState)),
    createConciliation: (
      callbackResult: (result: any) => void,
      callbackError: (message: string, isNetworkError?: boolean) => void,
    ) => dispatch(createConciliation(callbackResult, callbackError)),
  };
}

export default connect(mapStateToProps, bindToAction)(ConciliationView);
