import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View} from 'react-native';
import { ListItem } from 'react-native-elements'
import axios from 'axios'
var conf = require('../myConfig.json')
var auth = require('../auth')

const ALTURAS = {
  'Pequeno-Almoço': 1, 
  'Almoço': 2, 
  'Lanche': 4, 
  'Jantar': 8, 
  'Ceia': 16
}
 
/**
 * 
 * Componente que apresenta a lista de tarefas
 * a realizar para determinado periodo do dia
 * 
 * Cada item é composto pelo nome e id do utente.
 * 
 */
class TarefasList extends React.Component {

  /* Construtor */
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      utenteList: [],
      jwt: ''
    }
    this.getData=this.getData.bind(this);
  }

  /* Fetch data from API*/
  async getData() {
    var token = await auth.getJWT() // Get token
    var altura = ALTURAS[this.props.altura] // Get time of day

    axios.get(`http://${conf.host}:${conf.port}/administracao/porAltura/${altura}`,
              { headers: { Authorization: 'Bearer ' + token }})
      .then(data => {
        this.setState({
          isLoading: false,
          utenteList: data.data
        })
      })
      .catch(err => {
        this.setState({
          isLoading: false
        })
      })

  }

  componentDidMount () {
    this.getData()
  }

  render() {
    return (
        this.state.isLoading ? 
        <View style={{flex: 1, justifyContent: 'center',}}>
          <ActivityIndicator size='large' color='#3990A4'/>
        </View> 
        :
        <ScrollView style={{flex: 1}}>
                { this.state.utenteList.map((l) => (
                    <ListItem
                    key={l.idUtente}
                    title={'Medicar ' + l.nome}
                    subtitle={'id: '  + l.idUtente}
                    chevron
                    onPress={() => this.props.navigation.navigate('Administrar', {idUtente: l.idUtente, altura: this.props.altura})}
                    containerStyle={{borderBottomColor: '#d3d3d3', borderBottomWidth: 1}}
                    />
                ))
            }
        </ScrollView>
    );
  }
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

export default TarefasList;