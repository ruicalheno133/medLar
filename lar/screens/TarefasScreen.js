import React from 'react';
import TarefasButtonList  from '../components/TarefasButtonList';


export default class TarefasScreen extends React.Component {
  static navigationOptions = {
    title: 'Tarefas',
    headerStyle: {
      backgroundColor: '#F5F5F5',
    }
  };

  render() {
    return (
      <TarefasButtonList navigation={this.props.navigation}/>
    );
  }
}


