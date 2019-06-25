import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View} from 'react-native';
import { ListItem, Avatar, Button } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios'
var conf = require('../myConfig.json')
 
/**
 * 
 * Componente que apresenta a lista de utentes
 * do lar
 * 
 * Cada item é composto pelo nome e id do utente.
 * 
 */
class UtentesList extends React.Component {

  render() {
    console.log(this.props.navigation)
    const list = this.props.utentesList.map((l,i) => (
      <ListItem
      leftAvatar={l.foto ? 
          { size: "small", rounded: true, source: { uri: `http://${conf.host}:${conf.port}/static/images/${l.foto}` } }
        :
          { size: "small", rounded: true, source: { uri: `http://${conf.host}:${conf.port}/static/images/icon.png` } }
      }
      key={l.idUtente}
      title={l.nome}
      chevron
      onPress={() => this.props.navigation.navigate('PerfilUtente', {idUtente: l.idUtente, getData: this.props.navigation.state.params.getData})}
      containerStyle={{borderBottomColor: '#d3d3d3', borderBottomWidth: 1}}
      />
  ))
    return (
        <View style={{flex: 1}}>
            <ScrollView stickyHeaderIndices={[0]}>
                {list}
            </ScrollView>
        </View>
  )}
}

const styles = StyleSheet.create({
    title: {
      textAlignVertical: 'center',
      flex: 1, 
      fontSize: 25, 
      textAlign: 'center',  
      color: 'white'
    }
  });

export default UtentesList;