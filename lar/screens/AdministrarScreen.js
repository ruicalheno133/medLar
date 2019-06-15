import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import { LinearGradient } from 'expo';
import MedicamentoList from '../components/MedicamentoList'
var axios = require('axios')
var conf = require('../myConfig.json')
var auth = require('../auth')

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

  constructor(props){
    super(props)
    this.state = {
      utente: {}
    }
    this.getData = this.getData.bind(this)
  }

  componentWillMount(){
    this.getData()
  }

  async getData(){
    var token = await auth.getJWT() // Get token
    axios.get(`http://${conf.host}:${conf.port}/utentes/${this.props.navigation.getParam('idUtente', null)}`,
    { headers: { Authorization: 'Bearer ' + token }}) 
    .then(data => {
      this.setState({
        isLoading: false,
        utente: data.data[0]
      })
    })
    .catch(err => {})
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#3C6478', '#3990A4']} style={{flex: 3}}>
          <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Avatar 
            rounded
            size='large'
            imageProps={{resizeMode: 'cover'}}
            containerStyle={{borderRadius: 100}}
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
            />
            </View>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text style={{color:'white', fontSize: 20, fontWeight: '800'}}>{this.state.utente.nome}</Text>
                </View>
        </LinearGradient>
        <View style={{flex: 6, marginTop: 10}}>
          <MedicamentoList navigation={this.props.navigation}/>
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
