import React from 'react';
import { Platform} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import PeriodosDiaScreen from '../screens/PeriodosDiaScreen';
import UtentesScreen from '../screens/UtentesScreen';
import LembretesScreen from '../screens/LembretesScreen';
import TarefasDiaScreen from '../screens/TarefasDiaScreen';
import AdministrarScreen from '../screens/AdministrarScreen';
import PerfilUtenteScreen from '../screens/PerfilUtenteScreen';
import ObservacoesScreen from '../screens/ObservacoesScreen';
import RegistarUtenteScreen from '../screens/RegistarUtenteScreen';


const TarefasStack = createStackNavigator({
    Tarefas   : PeriodosDiaScreen,
    TarefasDia   : TarefasDiaScreen,
    Administrar : AdministrarScreen,
    Observacoes : ObservacoesScreen, 
});

TarefasStack.navigationOptions = 
  {
    title:'Tarefas'
  }

const UtentesStack = createStackNavigator({
    Utentes: UtentesScreen,
    PerfilUtente: PerfilUtenteScreen,
    RegistarUtente: RegistarUtenteScreen
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

