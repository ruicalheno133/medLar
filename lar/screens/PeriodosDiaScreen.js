import React from 'react';
import PeriodosDiaList  from '../components/PeriodosDiaList';
import { Button } from 'react-native-elements';

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
    headerRight: (<Button
      title="Logout"
      type="clear"
      buttonStyle={{marginRight: 10}}
      titleStyle={{color:'#3990A4'}}
      onPress={() => {navigation.navigate('Login')}}
  />)
  }
  };

  render() {
    return (
      <PeriodosDiaList navigation={this.props.navigation}/>
    );
  }
}


