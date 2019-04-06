import React from 'react';
import { StyleSheet, View} from 'react-native';
import TitleSection from '../components/TitleSection';
import TarefasList from '../components/TarefasList';

/**
 * 
 * Screen das tarefas a realizar para determinado periodo do dia
 * 
 * Composto por:
 *  Lista de tarefas a realizar
 */
export default class TarefasDiaScreen extends React.Component {
  static navigationOptions = {
    title: 'Tarefas',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 2}}>
          <TitleSection title={this.props.navigation.getParam('altura', '')}/>
        </View>
        <View style={{flex: 6}}>
          <TarefasList navigation={this.props.navigation}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
