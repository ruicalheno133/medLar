import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View} from 'react-native';
import { ListItem , Button} from 'react-native-elements'
import axios from 'axios'
import { FontAwesome } from '@expo/vector-icons';
var jwtDecode = require('jwt-decode');
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
 * Componente que apresenta de medicamentos que 
 * determinado utente deve tomar
 * 
 * Para cada medicamento é apresentado o nome, a quantidade, a unidade
 * e botões que permitem indicar a administração (ou não) do mesmo
 * 
 */
class FichaMedica extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      medicamentoList: []
    }
    this.getData=this.getData.bind(this);
  }



  /* Fetch data from API */
 async getData() {
    var token = await auth.getJWT() // Get token
    
    axios.get(`http://${conf.host}:${conf.port}/fichaMedicacao/${this.props.utenteInfo.idUtente}`,
              { headers: { Authorization: 'Bearer ' + token }})
      .then((data)=> {
          console.log(data.data)
        this.setState({
          isLoading: false,
          medicamentoList: data.data
        })
      })
      .catch(err => {})

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
                { this.state.medicamentoList.map((m, i) => (
                    <ListItem
                    key={i}
                    title={m.nome + ' - ' + m.quantidade + ' ' + m.unidade }
                    chevron
                    onPress={() => this.props.navigation.navigate('Medicamento', {utente: this.props.utenteInfo, medicamento: m})}
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

export default FichaMedica;