import React from 'react';
import { ScrollView, StyleSheet , Picker, Text, TextInput, View} from 'react-native';
import { Button } from 'react-native-elements';
import TitleSection from '../components/TitleSection';
import axios from 'axios'
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

export default class ObservacoesScreen extends React.Component {
  static navigationOptions = {
    title: 'Observações',
  };

  constructor(props) {
    super(props)
    this.state = {
      pickerValue: "def",
      text: ""
    }
    this.onPress = this.onPress.bind(this)
  }

  async registaAdmin (observacao) {
    var decoded = undefined
    var m = this.props.navigation.getParam('medicamento')
    
    try {
      var token = await auth.getJWT() // Get token
      var decoded = await jwtDecode(token);
    }
    catch (e) {console.log(e)}
    if (m.idAdministracao !== null) {
      console.log('update')
      axios.put(`http://${conf.host}:${conf.port}/administracao/atualizarAdministracao/${m.idAdministracao}`, {observacao: observacao, estado: 0},
      { headers: { Authorization: 'Bearer ' + token }})
          .then(response => {
            this.props.navigation.getParam('getData')(); 
            this.props.navigation.goBack(null);
        })
          .catch(err => {console.log(err)})
    } else {
      console.log('create')
      console.log(this.props.navigation.getParam('idUtente'))
      var obj = {
        'idUtente': this.props.navigation.getParam('idUtente'),
        'idMedicamento': m.idMedicamento,
        'idFuncionario': decoded.user.idFuncionario, 
        'altura': ALTURAS[this.props.navigation.getParam('altura')],
        'estado': 0,
        'observacao': observacao
      }
      console.log(obj)
      axios.post(`http://${conf.host}:${conf.port}/administracao/registarAdministracao`, obj,
      { headers: { Authorization: 'Bearer ' + token }})
          .then(response => {
            this.props.navigation.getParam('getData')(); 
            this.props.navigation.goBack(null);
        })
          .catch(err => {console.log(err)})
}
  }

  onPress () {
    //TODO jsons tokens

    if (this.state.pickerValue === "def" && this.state.text === "") {
      console.log('alert')
    } else if (this.state.pickerValue !== "def" && this.state.text !== "") {
      console.log('so pode escolher uma causa')
    } else if (this.state.pickerValue !== "def") {
      this.registaAdmin(this.state.pickerValue)
    } else if (this.state.text !== "") {
      this.registaAdmin(this.state.text)
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={{flex:1}}>
      <TitleSection title={"Medicamento"}/>
      </View>
      <View style={{flex:3, padding: 10}}>
      <Text style={{ fontSize: 20, fontWeight: '400' }}>Adicione observações:</Text>
        <View style={{margin: 5, borderBottomWidth: 1, borderBottomColor:'#d3d3d3'}}>
        <Picker
            selectedValue={this.state.pickerValue}
            tyle={{height: 50, width: '100%', borderColor:'grey', borderWidth:5}}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({pickerValue: itemValue})
            }}
        >
            <Picker.Item label="Selecione a causa" value="def" />
            <Picker.Item label="Recusou" value="Recusou." />
            <Picker.Item label="Estava em jejum" value="Estava em jejum." />
        </Picker>
        </View>


        <Text style={{ fontSize: 20, fontWeight: '400' }}>Outro:</Text>
        <View style={{margin: 5, borderWidth: 1, borderColor:'#d3d3d3', borderRadius:5
    }}>
        <TextInput
            multiline = {true}
            numberOfLines = {4}
            editable = {true}
            maxLength = {50}
            placeholder="Outra causa..."
            onChangeText={(text)=> {this.setState({text})}}
            value={this.state.text}
            style={{textAlignVertical: 'top', padding: 5}}
      />
        </View>
        <Button onPress={this.onPress} title='Concluir' 
                    buttonStyle={styles.buttonStyle}
                    containerStyle={styles.buttonContainer}
                    titleStyle={{color: '#3990A4'}}
                    type="outline"
        />
      </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonStyle: {
    borderColor: '#3990A4',
    borderWidth: 1,
    width: '40%',
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    paddingTop: 10,
    width: '100%',
    alignItems: 'center'
  },
});
