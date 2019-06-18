import React from 'react';
import { View, StyleSheet, Alert} from 'react-native';
import { Button } from 'react-native-elements';
var t = require('tcomb-form-native');
var axios = require('axios')
var _ = require('lodash');
var auth = require('../auth')
var myConf = require('../myConfig.json')

var Form = t.form.Form;

  const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

  // overriding the text color
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

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(email);
});

var Funcionario = t.struct({
    nome: t.String,              // a required string
    email: Email,  // an optional string
    password: t.String,               // a required number
    samePassword: t.String
  });


  var options = {
    i18n: {
      optional: '',
      required: '*'
    },
    fields: {
    nome: {
        stylesheet: stylesheet,
        label: 'Nome',
        error: 'Nome inválido.'
    },
    email: {
        stylesheet: stylesheet,
        label: 'Email',
        error: 'Email inválido.'
    }, 
    password: {
        stylesheet: stylesheet,
        label: 'Password',
        password: true,
        secureTextEntry: true,
        error: 'Password inválida.'
    },
    samePassword: {
      stylesheet: stylesheet,
      label: 'Repita a password',
      password: true,
      secureTextEntry: true,
      error: 'Passwords não coincidem.'
  }
  }};

export default class RegistarFuncionarioScreen extends React.Component {
  static navigationOptions = {
    title: 'Registar Funcionário',
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
    'Registado com sucesso',
    [,
      {text: 'OK'},
    ],
    {cancelable: false},
  );
  }

  async onPress () {
    var value = this.refs.form.getValue();
    if (value != null) {
      if (value.password != value.samePassword) {
        this.refs.form.refs.input.refs.samePassword.setState({hasError: true})
      } else{
        console.log(`http://${myConf.host}:${myConf.port}/auth/registo`)
        axios.post(`http://${myConf.host}:${myConf.port}/auth/registo`, value)
        .then(res => {this.handleRegister(); this.props.navigation.navigate('Login')})
        .catch(err => {})
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
            ref="form"
            type={Funcionario}
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
