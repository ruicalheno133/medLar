import React from 'react';
import { View, StyleSheet, Text, Alert} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
var t = require('tcomb-form-native');
var axios = require('axios')
var _ = require('lodash');
import { LinearGradient } from 'expo';

var Form = t.form.Form;

  const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

  // overriding the text color
  stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;
stylesheet.textbox.normal.color = 'white';

stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textboxView.normal.marginBottom = 5;
stylesheet.textboxView.error.marginBottom = 5;
stylesheet.textboxView.normal.borderBottomColor = 'white';
stylesheet.controlLabel.normal.color = 'white';

var Funcionario = t.struct({
    nome: t.String,              // a required string
    email: t.String,  // an optional string
    password: t.String,               // a required number
  });


  var options = {fields: {
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

  onPress () {
    var value = this.refs.form.getValue();
    if (value != null) {
        axios.post('http://192.168.0.105:3000/funcionarios', value) 
        .then(res => {this.handleRegister(); this.props.navigation.navigate('Login')})
        .catch(err => {})
    }

  }

  render() {
    return (
        <LinearGradient colors={['#3C6478', '#3990A4']} style={styles.container}>
        <Form
            ref="form"
            type={Funcionario}
            options={options}
            />
        <Button onPress={this.onPress} title='Registar' 
                    buttonStyle={styles.buttonStyle}
                    containerStyle={styles.buttonContainer}
                    titleStyle={{color: 'white'}}
                    type="outline"
        />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  buttonStyle: {
    borderColor: 'white',
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
