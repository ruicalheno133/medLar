import React from 'react';
import PeriodosDiaList  from '../components/PeriodosDiaList';

/**
 * 
 * Screen dos vários períodos do dia
 * 
 * Composto por:
 *  Lista de periodos do dia 
 * 
 */
export default class TarefasScreen extends React.Component {
  static navigationOptions = {
    title: 'Tarefas',
    headerStyle: {
      backgroundColor: '#F5F5F5',
    }
  };

  render() {
    return (
      <PeriodosDiaList navigation={this.props.navigation}/>
    );
  }
}


