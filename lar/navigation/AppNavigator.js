import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import RegistarFuncionarioScreen from '../screens/RegistarFuncionarioScreen';

import MainTabNavigator from './MainTabNavigator';

const authFlow = createStackNavigator(
  {
    Login : LoginScreen,
    RegistarFuncionario : RegistarFuncionarioScreen,
  });

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login: authFlow,
  Main: MainTabNavigator
}));