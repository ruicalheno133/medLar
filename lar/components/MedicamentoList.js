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
class MedicamentoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      medicamentoList: []
    }
    this.getData=this.getData.bind(this);
    this.handleNoPress=this.handleNoPress.bind(this);
    this.handleYesPress=this.handleYesPress.bind(this);
  }



  /* Fetch data from API */
 async getData() {
    var token = await auth.getJWT() // Get token
    var altura = ALTURAS[this.props.navigation.getParam('altura')]
    
    axios.get(`http://${conf.host}:${conf.port}/administracao/porDoente/${this.props.navigation.getParam('idUtente')}/${altura}`,
              { headers: { Authorization: 'Bearer ' + token }})
      .then((data)=> {
        this.setState({
          isLoading: false,
          medicamentoList: data.data
        })
      })
      .catch(err => {})

  }

  handleNoPress(m) {
    console.log(m)
    this.props.navigation.navigate('Observacoes', {medicamento: m, 
                                                   altura: this.props.navigation.getParam('altura'),
                                                   idUtente: this.props.navigation.getParam('idUtente'),
                                                    getData: this.getData});
  }

  async handleYesPress(idAdministracao, idMedicamento) {
    var decoded = undefined
    try {
      var token = await auth.getJWT() // Get token
      var decoded = await jwtDecode(token);
    }
    catch (e) {console.log(e)}
    if (idAdministracao !== null) {
      console.log('update')
      axios.put(`http://${conf.host}:${conf.port}/administracao/atualizarAdministracao/${idAdministracao}`, {estado: 1},
      { headers: { Authorization: 'Bearer ' + token }})
          .then(response => {
            this.getData()
        })
    } else {
      console.log('create')
      var obj = {
        'idUtente': this.props.navigation.getParam('idUtente'),
        'idMedicamento': idMedicamento,
        'idFuncionario': decoded.user.idFuncionario, 
        'altura': ALTURAS[this.props.navigation.getParam('altura')],
        'estado': 1,
        'observacao': null
      }
      axios.post(`http://${conf.host}:${conf.port}/administracao/registarAdministracao`, obj,
                  { headers: { Authorization: 'Bearer ' + token }})
           .then(response => {this.getData()})
           .catch(err => {console.log(err)})
    }

  }

  componentDidMount () {
    this.getData()
  }

  renderIcon(estado, button) {
    if (estado === null ) {
      if (button === 0)
        return <FontAwesome name="times-circle" size={30} style={{color: 'red'}} /> 
      else 
        return <FontAwesome name="check-circle" size={30} style={{color: '#3990A4'}}/>
    } else if (estado === 1) {
      if (button === 0) 
        return <FontAwesome name="times-circle" size={30} style={{color: 'lightgrey'}} /> 
      else 
        return <FontAwesome name="check-circle" size={30} style={{color: '#3990A4'}}/>
    } else if(estado === 0) {
      if (button === 0) 
        return <FontAwesome name="times-circle" size={30} style={{color: 'red'}} /> 
      else 
        return <FontAwesome name="check-circle" size={30} style={{color: 'lightgrey'}}/>
    }
  }

  render() {

    return (
        this.state.isLoading ? 
        <View style={{flex: 1, justifyContent: 'center',}}>
          <ActivityIndicator size='large' color='#3990A4'/>
        </View> 
        :
        <ScrollView style={{flex: 1}}>
                { this.state.medicamentoList.map((m) => (
                    <ListItem
                    roundAvatar
                    key={m.idFichaMedicacao}
                    title={m.Medicamento}
                    subtitle={m.quantidade + ' ' + m.unidade}
                    rightElement={
                      <View key={m.idFichaMedicacao} style={{flexDirection: "row"}}>
                        <Button type='clear' onPress={() => this.handleYesPress(m.idAdministracao, m.idMedicamento)} 
                                icon={this.renderIcon(m.estado, 1)}></Button>
                        <Button type='clear' onPress={() => this.handleNoPress(m)} 
                                icon={this.renderIcon(m.estado, 0)}></Button>  
                      </View>
                    }
                    //onPress={() => this.props.navigation.navigate('Medicamento')}
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

export default MedicamentoList;