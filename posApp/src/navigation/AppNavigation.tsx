import {createStackNavigator} from '@react-navigation/stack';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {Image, View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Home from '../Components/Home';
import LoginModal from '../Components/LoginModal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {logoutApp} from '../redux/actions/AppStore/Index';
import {connect} from 'react-redux';
import {LOGO1_IC, PROFILE_IC} from '../Utils/Images';
import {ProfileModal} from '../Components/ProfileModal';
import {IInfoUser, STATE_APP} from '../redux/models/ModelApp';
import Conciliacion from '../Components/ConciliationView';
import {Colors} from '../Utils/Colors';
export const navigationRef = createNavigationContainerRef();
const HomeStack = createStackNavigator();
interface IHomeStackProps {
  email: string;
  logoutAppReload: () => void;
}
function HomeStackScreen({logoutAppReload, email}: IHomeStackProps) {
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {}, [email]);

  const handleLogout = () => {
    setModalVisible(false);
    logoutAppReload();
    setTimeout(() => {
      navigationRef.navigate('LoginModal');
    }, 100);
  };
  return (
    <>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={({navigation}) => ({
            title: '',
            headerLeft: () => (
              <Image source={LOGO1_IC} style={{height: 40, width: 100}} />
            ),
            headerRight: () => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  style={{
                    marginHorizontal: 10,
                    backgroundColor: Colors.Black,
                    borderRadius: 25,
                    padding: 10,
                  }}
                  onPress={() => navigation.navigate('Conciliation')}>
                  <Text style={{fontWeight: '800', color: Colors.White}}>
                    CONCILIACION
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Image source={PROFILE_IC} />
                </TouchableOpacity>
              </View>
            ),
            gestureEnabled: false,
          })}
        />
      </HomeStack.Navigator>

      <ProfileModal
        modalVisible={modalVisible}
        handleCloseModal={() => setModalVisible(!modalVisible)}
        handleLogout={() => handleLogout()}
        email={email || ''}
      />
    </>
  );
}
const HomeComponent = props => (
  <HomeStackScreen
    email={props.email}
    logoutAppReload={props.logoutAppReload}
    {...props}
  />
);

const RootStack = createStackNavigator();
function MainStack({
  currentAppState,
  logoutAppReload,
  informationToken,
}: IMainStackProps) {
  useEffect(() => {}, [currentAppState, informationToken]);

  return (
    <RootStack.Navigator>
      {currentAppState === STATE_APP.TO_LOGIN && (
        <RootStack.Group screenOptions={{presentation: 'modal'}}>
          <RootStack.Screen
            name="LoginModal"
            component={LoginModal}
            options={{headerShown: false, gestureEnabled: false}}
          />
        </RootStack.Group>
      )}
      {currentAppState === STATE_APP.LOGGED_IN && (
        <RootStack.Group screenOptions={{headerShown: false}}>
          <HomeStack.Screen name="TabOptions">
            {props => (
              <HomeComponent
                {...props}
                email={informationToken.email}
                logoutAppReload={logoutAppReload}
              />
            )}
          </HomeStack.Screen>
        </RootStack.Group>
      )}
      {currentAppState === STATE_APP.LOGGED_IN && (
        <RootStack.Group screenOptions={{headerShown: false}}>
          <HomeStack.Screen
            name="Conciliation"
            component={Conciliacion}
            options={{headerShown: true, title: 'Lista de transacciones'}}
          />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
}
interface IMainStackProps {
  currentAppState: STATE_APP;
  informationToken: IInfoUser;
  logoutAppReload: () => void;
}

function AppContainer({
  currentAppState,
  logoutAppReload,
  informationToken,
}: IMainStackProps) {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => console.log('ready')}>
      <MainStack
        currentAppState={currentAppState}
        logoutAppReload={logoutAppReload}
        informationToken={informationToken}
      />
    </NavigationContainer>
  );
}

const mapStateToProps = (state: any) => {
  return {
    informationToken: state.sessionStore.informationToken,
    currentAppState: state.appStore.currentAppState,
  };
};

function bindToAction(dispatch: any) {
  return {
    logoutAppReload: () => dispatch(logoutApp()),
  };
}

export default connect(mapStateToProps, bindToAction)(AppContainer);
