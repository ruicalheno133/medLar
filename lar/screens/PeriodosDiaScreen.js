import React from 'react';
import PeriodosDiaList  from '../components/PeriodosDiaList';
import { Button } from 'react-native-elements';
import {View} from 'react-native';

/**
 * 
 * Screen dos vários períodos do dia
 * 
 * Composto por:
 *  Lista de periodos do dia 
 * 
 */
export default class TarefasScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
    title: 'Tarefas',
    headerRight: (
      <View style={{flexDirection:'row'}}>
      <Button
      title="Perfil"
      type="clear"
      buttonStyle={{marginRight: 10}}
      titleStyle={{color:'#3990A4'}}
      onPress={() => {navigation.navigate('EditarPerfilFuncionario')}}
    />  
    <Button
      title="Logout"
      type="clear"
      buttonStyle={{marginRight: 10}}
      titleStyle={{color:'#3990A4'}}
      onPress={() => {navigation.navigate('Login')}}
  />
  </View>)
  }
  };

  render() {
    return (
      <PeriodosDiaList navigation={this.props.navigation}/>
    );
  }
}


