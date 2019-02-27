import React from 'react';
import { StyleSheet, View} from 'react-native';
import TitleSection from '../components/TitleSection';
import AdministrarList from '../components/AdministrarList';


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
          <AdministrarList navigation={this.props.navigation}/>
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
