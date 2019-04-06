import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import { LinearGradient } from 'expo';
import MedicamentoList from '../components/MedicamentoList'


/**
 * 
 * Screen de adminsitração de medicação (a determinado utente)
 * 
 * Composto por:
 *  informação pessoal do utente
 *  medicamentos a administrar
 * 
 */
export default class AdministrarScreen extends React.Component {
  static navigationOptions = {
    title: 'Administrar Medicação',
    titleStyle: {
        fontFamily: 'Verdana'
    }
  };


  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#3C6478', '#3990A4']} style={{flex: 3}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Avatar 
            imageProps={{resizeMode: 'cover', borderRadius: 10}}
            size="xlarge"
            containerStyle={{top: 30, left: 20, flex: 1, overflow: 'hidden', borderColor: '#3990A4', borderRadius: 15, borderWidth: 5}}
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
      />
          </View>
          <View style={{marginTop: 30, flex: 1, flexDirection: 'row'}}>
            <Text style={{color:'white', fontSize: 20, fontWeight: '800'}}>Rui Alvim</Text>
            <Text style={{color:'white', fontSize: 15, fontWeight: '200'}}>1234</Text>
          </View>
          </View>
        </LinearGradient>
        <View style={{flex: 6, marginTop: 30}}>
          <MedicamentoList />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1
  },
  verticaCenter: {
    textAlignVertical: 'center'
  }
});
