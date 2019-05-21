import React from 'react';
import { View, StyleSheet, Text, Alert} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
var t = require('tcomb-form-native');
var _ = require('lodash');
var axios = require('axios')
import moment from "moment";
var conf = require('../myConfig.json')

var Form = t.form.Form;

var Lembrete = t.struct({
    utente: t.maybe(t.String),              // a required string
    texto: t.String,  // an optional string
    data: t.Date,               // a required number
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


  var options = {fields: {
    data: {
        stylesheet: stylesheet,
        label: 'Data',
      mode: 'date',
      error: 'Data inválida.',
      config: {
        format: myFormatFunction("DD/MM/YYYY - HH:mm")
      }
    },
    utente: {
        stylesheet: stylesheet,
        label: 'Utente',
        error: 'Nome do utente inválido.'
    },
    texto: {
        stylesheet: stylesheet,
        label: 'Texto',
        error: 'Campo não pode estar vazio.'
    }
  }};

export default class CriarLembreteScreen extends React.Component {
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
        'Lembrete criado com sucesso',
        [,
            {text: 'OK'},
        ],
        {cancelable: false},
    );
}

  onPress () {
    var value = this.refs.form.getValue();
    if (value != null) {
        var formData = {
            timestamp : moment(value.data).utc().format().slice(0, -1),
            concluido: 0,
            idFuncionario: 1,
            texto: value.texto,
            utente: value.utente
        }
        axios.post(`http://${conf.host}:${conf.port}/lembretes`, formData) 
        .then(res => {this.handleRegister(); this.props.navigation.state.params.getData(); this.props.navigation.navigate('Lembretes')})
        .catch(err => {})
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <Form
            ref="form"
            type={Lembrete}
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
