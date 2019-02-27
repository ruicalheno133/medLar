import React from 'react';
import { Platform} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TarefasScreen from '../screens/TarefasScreen';
import UtentesScreen from '../screens/UtentesScreen';
import LembretesScreen from '../screens/LembretesScreen';
import TarefasDiaScreen from '../screens/TarefasDiaScreen';
import AdministrarScreen from '../screens/AdministrarScreen';

const TarefasStack = createStackNavigator({
    Tarefas   : TarefasScreen,
    TarefasDia   : TarefasDiaScreen,
    Administrar : AdministrarScreen
});

TarefasStack.navigationOptions = 
  {
    title:'Tarefas'
  }

const UtentesStack = createStackNavigator({
    Utentes: UtentesScreen,
});

UtentesStack.navigationOptions = 
  {
    title:'Utentes'
  }

const LembretesStack = createStackNavigator({
    Lembretes : LembretesScreen,
});

LembretesStack.navigationOptions = 
  {
    title:'Lembretes'
  }

export default createBottomTabNavigator({
  TarefasStack,
  UtentesStack,
  LembretesStack,
}, {
  tabBarOptions: {
    showIcon: false,
    activeTintColor: '#3990A4',
    labelStyle: {
      fontSize: 15,
      flex: 1,
      textAlign: 'center',
      textAlignVertical: 'center'
    }
  }
});

