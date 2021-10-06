import React, {useEffect, useState} from 'react';

import SplashScreen from '../screens/SplashScreen';
import ConfigScreen from '../screens/config';
import Login from '../screens/login/login.view';
import {BottomTab} from './BottomTab';
import {BackgroundDetailScreen} from '../components/backgroundDetailScreen/BackgroundDetailScreen.view';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {connect, useSelector} from 'react-redux';
import {actionInit} from '../utils/mainActions';
import View from 'react-native-gesture-handler/lib/typescript/GestureHandlerRootView';
import moment from 'moment';
const Stack = createStackNavigator();
const MainRoute = () => {
  const {GuidID, profileInfo, isLogin} = useSelector((state: any) => ({
    GuidID: state.config.GuidID,
    profileInfo: state.auth.profileInfo,
    isLogin: state.auth.isLogin,
  }));
  console.log({GuidId: GuidID, isLogin: isLogin});
  const [isSplashLoad, setIsSplashLoad] = useState<boolean>(true);
  const a = moment();
  // const [isLogin, setIsLogin] = useState<boolean>(false)
  useEffect(() => {
    console.log('setTimeout');
    setIsSplashLoad(false);
   const b = setTimeout(() => {
      console.log('setTimeout');
    }, 3000);
    return () => {
      clearTimeout(b)
    };
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isSplashLoad && (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        )}
        {!GuidID ? (
          <Stack.Screen name="ConfigScreen" component={ConfigScreen} />
        ) : !isLogin ? (
          <Stack.Screen name="LoginScreen" component={Login} />
        ) : (
          <Stack.Screen name="HomeScreen" component={BottomTab} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// modify the App component
const App = (props: any) => {
  useEffect(() => {
    actionInit(props);
  }, []);
  return <MainRoute />;
};
export default App;
