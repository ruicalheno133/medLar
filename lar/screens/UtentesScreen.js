import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import UtentesList from '../components/UtentesList'

export default class UtentesScreen extends React.Component {
  static navigationOptions = {
    title: 'Utentes',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <UtentesList navigation={this.props.navigation}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
