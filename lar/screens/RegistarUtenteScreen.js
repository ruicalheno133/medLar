import React from 'react';
import { View, StyleSheet, Text, Alert} from 'react-native';
import { Button } from 'react-native-elements';
var t = require('tcomb-form-native');
var _ = require('lodash');
var axios = require('axios')
import moment from "moment";
var auth = require('../auth')
var conf = require('../myConfig.json')

var Form = t.form.Form;

var Utente = t.struct({
    nome: t.String,              // a required string
    nomeUsado: t.maybe(t.String),  // an optional string
    dataNascimento: t.Date,               // a required number
    contEmergencia: t.String
  });

  const myFormatFunction = format => date => moment(date).format(format)
  const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

  // overriding the text color
  stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;

stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textboxView.normal.marginBottom = 5;
stylesheet.textboxView.error.marginBottom = 5;
stylesheet.textboxView.normal.borderBottomColor = 'grey';
stylesheet.controlLabel.normal.color = 'grey';


  var options = {
    i18n: {
      optional: '',
      required: '*'
    },
    fields: {
    dataNascimento: {
        stylesheet: stylesheet,
        label: 'Data de Nascimento',
      mode: 'date',
      error: 'Data de nascimento inválido.',
      config: {
        format: myFormatFunction("DD/MM/YYYY")
      }
    },
    nome: {
        stylesheet: stylesheet,
        label: 'Nome',
        error: 'Nome do utente inválido.'
    },
    nomeUsado: {
        stylesheet: stylesheet,
        label: 'Nome Usado'
    }, 
    contEmergencia: {
        stylesheet: stylesheet,
        label: 'Contacto de Emergência',
        error: 'Contacto de emergência inválido.'
    }
  }};

export default class RegistarUtenteScreen extends React.Component {
  static navigationOptions = {
    title: 'Registar Utente',
  };

  constructor(props) {
    super(props)
    this.state = {
      utente: {}
    }

    this.onPress=this.onPress.bind(this);
    this.handleRegister=this.handleRegister.bind(this);
  }

    handleRegister(){
        // Works on both iOS and Android
        Alert.alert(
        'Sucesso',
        'Utente registado com sucesso',
        [,
            {text: 'OK'},
        ],
        {cancelable: false},
    );
}

  async onPress () {
    var token = await auth.getJWT() // Get token
    var value = this.refs.form.getValue();

    if (value != null) {
        value.dataNascimento = value.dataNascimento.toString()
        axios.post(`http://${conf.host}:${conf.port}/utentes`, value,
        { headers: { Authorization: 'Bearer ' + token }})
        .then(res => {this.handleRegister(); this.props.navigation.state.params.getData(); this.props.navigation.navigate('Utentes')})
        .catch(err => {})
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <Form
            ref="form"
            type={Utente}
            options={options}
            />
        <Button onPress={this.onPress} title='Registar' 
                    buttonStyle={styles.buttonStyle}
                    containerStyle={styles.buttonContainer}
                    titleStyle={{color: '#3990A4'}}
                    type="outline"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
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
