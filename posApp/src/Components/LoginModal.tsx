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
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';

import {SeparatorView} from '../Utils/Commons';
import {Colors} from '../Utils/Colors';
import {getInformationToken} from '../redux/actions/SessionStore/Index';
import {ILoginBody, STATE_APP} from '../redux/models/ModelApp';
import {setStateApp} from '../redux/actions/AppStore/Index';
import {WarningModal} from './WarningModal';
import {HIDE_PASSWORD_IC, LOGO1_IC, SHOW_PASSWORD_IC} from '../Utils/Images';

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
  requestLogin: (
    body: ILoginBody,
    callbackResult?: () => void,
    callbackError?: (message: string, isNetworkError?: boolean) => void,
  ) => void;
  isLoading: boolean;
  setCurrentStateApp: (currentState: STATE_APP) => void;
}
class LoginModal extends React.Component<
  IProps,
  {
    userName: string;
    password: string;
    alreadySend: boolean;
    showError: boolean;
    modalIsVisible: boolean;
    messageError: string;
    securityText: boolean;
  }
> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      userName: 'kenia.garibaldo@supercarnes.com',
      password: 'k3n7a-',
      alreadySend: false,
      showError: false,
      messageError: '',
      modalIsVisible: false,
      securityText: true,
    };
  }

  componentDidMount() {}

  handleChangeUserName = (value: string) => {
    this.setState({userName: value});
  };
  handleChangePassword = (value: string) => {
    this.setState({password: value});
  };

  handleLogin = () => {
    const {userName, password} = this.state;
    this.setState({alreadySend: true});
    if (userName.trim().length === 0 || password.trim().length === 0) {
      this.setState({showError: true});
      return;
    }
    this.props.requestLogin(
      {password, email: userName},
      this.handleResult,
      this.handleError,
    );
  };

  handleError = (message: string) => {
    this.setState({messageError: message, modalIsVisible: true});
  };

  handleResult = () => {
    this.props.setCurrentStateApp(STATE_APP.LOGGED_IN);
    this.props.navigation.navigate('TabOptions');
  };

  handleCloseModal = () => {
    this.setState({messageError: '', modalIsVisible: false});
  };

  handleClickSecurity = () => {
    const {securityText} = this.state;
    this.setState({securityText: !securityText});
  };

  render() {
    const {
      props: {isLoading},
      state: {
        userName,
        password,
        alreadySend,
        showError,
        modalIsVisible,
        messageError,
        securityText,
      },
    } = this;
    return (
      <SafeAreaView style={loginStyle.screenView}>
        <View style={loginStyle.container}>
          <SeparatorView height={15} />
          <Image source={LOGO1_IC} style={{height: 100, width: 150}} />
          <SeparatorView height={15} />

          <TextInput
            style={[loginStyle.inputStyle]}
            keyboardType="email-address"
            placeholder="Correo"
            value={userName}
            placeholderTextColor={Colors.WhiteGray}
          />

          {alreadySend && showError && userName.trim().length === 0 && (
            <Text style={loginStyle.textError}>Ingrese un correo</Text>
          )}
          <SeparatorView height={20} />
          <View
            style={[
              {width: '100%', flexDirection: 'row', alignItems: 'center'},
              loginStyle.inputStyle,
            ]}>
            <TextInput
              style={[
                loginStyle.inputStyle,
                {
                  fontSize: 15,
                  borderWidth: 0,
                  elevation: 0,
                  backgroundColor: 'transparent',
                  width: '90%',
                },
              ]}
              keyboardType="default"
              placeholder="Contraseña"
              value={password}
              secureTextEntry={securityText}
              placeholderTextColor={Colors.WhiteGray}
            />
            <TouchableOpacity onPress={this.handleClickSecurity}>
              {securityText ? (
                <Image source={HIDE_PASSWORD_IC} style={loginStyle.img} />
              ) : (
                <Image source={SHOW_PASSWORD_IC} style={loginStyle.img} />
              )}
            </TouchableOpacity>
          </View>
          {alreadySend && showError && password.trim().length === 0 && (
            <Text style={loginStyle.textError}>Ingrese la contraseña</Text>
          )}
          <SeparatorView height={20} />
          <TouchableOpacity
            disabled={isLoading}
            onPress={this.handleLogin}
            style={[
              loginStyle.invoiceButton,
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
                loginStyle.itemText,
                {
                  color: Colors.White,
                },
              ]}>
              Iniciar
            </Text>
          </TouchableOpacity>
        </View>
        <WarningModal
          message={messageError}
          modalVisible={modalIsVisible}
          handleCloseModal={this.handleCloseModal}
        />
      </SafeAreaView>
    );
  }
}

const loginStyle = StyleSheet.create({
  viewLine: {
    borderBottomColor: Colors.White,
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    backgroundColor: Colors.White,
    marginVertical: 8,
  },
  screenView: {
    flex: 1,
    backgroundColor: Colors.White,
    elevation: 4,
  },
  container: {
    backgroundColor: Colors.White,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 27,
    marginVertical: 4,
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
    fontSize: 15,
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
  img: {
    height: 32,
    width: 32,
    top: 3,
  },
});

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.appStore.isLoading,
  };
};

function bindToAction(dispatch: any) {
  return {
    requestLogin: (
      body: ILoginBody,
      callbackResult?: () => void,
      callbackError?: (message: string, isNetworkError?: boolean) => void,
    ) => dispatch(getInformationToken(body, callbackResult, callbackError)),
    setCurrentStateApp: (currentState: STATE_APP) =>
      dispatch(setStateApp(currentState)),
  };
}

export default connect(mapStateToProps, bindToAction)(LoginModal);
