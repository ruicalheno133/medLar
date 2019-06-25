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
import CriarLembreteScreen from '../screens/CriarLembreteScreen';
import MedicamentoScreen from '../screens/MedicamentoScreen';
import NovoMedicamentoScreen from '../screens/NovoMedicamento';
import EditarFichaMedicacaoScreen from '../screens/EditarFichaMedicacaoScreen';
import EditarPerfilScreen from '../screens/EditarPerfilScreen';
import EditarPerfilFuncionarioScreen from '../screens/EditarPerfilFuncionarioScreen';

const TarefasStack = createStackNavigator({
    Tarefas   : PeriodosDiaScreen,
    TarefasDia   : TarefasDiaScreen,
    Administrar : AdministrarScreen,
    Observacoes : ObservacoesScreen, 
    EditarPerfilFuncionario: EditarPerfilFuncionarioScreen
});

TarefasStack.navigationOptions = 
  {
    title:'Tarefas'
  }

const UtentesStack = createStackNavigator({
    Utentes: UtentesScreen,
    PerfilUtente: PerfilUtenteScreen,
    Medicamento: MedicamentoScreen,
    NovoMedicamento: NovoMedicamentoScreen,
    RegistarUtente: RegistarUtenteScreen,
    EditarFichaMedicacao: EditarFichaMedicacaoScreen,
    EditarPerfil: EditarPerfilScreen
});

UtentesStack.navigationOptions = 
  {
    title:'Utentes'
  }

const LembretesStack = createStackNavigator({
    Lembretes : LembretesScreen,
    CriarLembrete : CriarLembreteScreen
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

