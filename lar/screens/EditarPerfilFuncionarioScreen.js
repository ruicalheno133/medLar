import React from 'react';
import { View, StyleSheet, Alert} from 'react-native';
import { Button } from 'react-native-elements';
var t = require('tcomb-form-native');
var axios = require('axios')
var _ = require('lodash');
var jwtDecode = require('jwt-decode');
var auth = require('../auth')
var conf = require('../myConfig.json')

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
    password: t.maybe(t.String),
    samePassword: t.maybe(t.String)
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

export default class EditarPerfilFuncionarioScreen extends React.Component {
  static navigationOptions = {
    title: 'Editar Perfil',
  };

  constructor(props) {
    super(props)
    this.state = {
      value: {}
    }

    this.fecthFuncionarioData=this.fecthFuncionarioData.bind(this);
    this.onPress=this.onPress.bind(this);
    this.onChange=this.onChange.bind(this);
    this.handleEdition=this.handleEdition.bind(this);
  }

  async fecthFuncionarioData(){
    try {
        var token = await auth.getJWT() // Get token
        var decoded = await jwtDecode(token);
      }
      catch (e) {}
    axios.get(`http://${conf.host}:${conf.port}/funcionarios/${decoded.user.idFuncionario}`,{headers: {Authorization: `Bearer ${token}`}})
        .then(data => {
            console.log(data.data[0])
            var formInfo = {
              nome: data.data[0].nome,
              email: data.data[0].email
            }
            this.setState({
                value: formInfo
            })
        })
        .catch(erro => {
            console.log(erro)
        })
  }

  componentDidMount(){
      this.fecthFuncionarioData()
  }

  handleEdition(){
      // Works on both iOS and Android
Alert.alert(
    'Sucesso',
    'Editado com sucesso',
    [,
      {text: 'OK'},
    ],
    {cancelable: false},
  );
  }
  
  onChange(value){
    this.setState({
      value: value
    })
  }

  async onPress () {
    try {
        var token = await auth.getJWT() // Get token
        var decoded = await jwtDecode(token);
    }
    catch (e) {}
    var value = this.refs.form.getValue();
    if (value != null) {
      if (value.password != value.samePassword) {
        this.refs.form.refs.input.refs.samePassword.setState({hasError: true})
      } else{
        axios.put(`http://${conf.host}:${conf.port}/funcionarios/${decoded.user.idFuncionario}`, value,
        {
            headers: {
              Authorization: 'Bearer ' + token 
            }
        })
        .then(res => {this.handleEdition(); this.props.navigation.goBack()})
        .catch(err => {})
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
            ref="form"
            onChange={this.onChange}
            type={Funcionario}
            options={options}
            value={this.state.value}
            />
        <Button onPress={this.onPress} title='Concluir' 
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
