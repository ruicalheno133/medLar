import React from 'react';
import { ScrollView, StyleSheet, Text, Picker, Alert} from 'react-native';
import { Button, CheckBox } from 'react-native-elements';

var t = require('tcomb-form-native');
var _ = require('lodash');
var axios = require('axios')
import moment from "moment";
var auth = require('../auth')
var conf = require('../myConfig.json')

var Form = t.form.Form;

var Utente = t.struct({
    quantidade: t.Number, 
    unidade: t.String,              // a required string
    dataInicio: t.Date,               // a required number
    dataFim: t.maybe(t.Date)
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
    dataInicio: {
        stylesheet: stylesheet,
        label: 'Data de Inicio',
      mode: 'date',
      error: 'Data de inicio inválida.',
      config: {
        format: myFormatFunction("DD/MM/YYYY")
      }
    },
    dataFim: {
        stylesheet: stylesheet,
        label: 'Data de Fim',
      mode: 'date',
      error: 'Data de fim inválida.',
      config: {
        format: myFormatFunction("DD/MM/YYYY")
      }
    },
    unidade: {
        stylesheet: stylesheet,
        label: 'Unidade',
        error: 'Unidade errada.'
    },
    quantidade: {
        stylesheet: stylesheet,
        label: 'Quantidade',
        error: 'Quantidade errada.'
    }
  }};

export default class NovoMedicamentoScreen extends React.Component {
  static navigationOptions = {
    title: 'Novo medicamento',
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
      <ScrollView style={styles.container}>
        <Picker
            selectedValue={this.state.pickerValue}
            style={{height: 50, width: '100%', borderColor:'grey', borderWidth:5}}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({pickerValue: itemValue})
            }}
        >
            <Picker.Item label="Selecione o medicamento." value="" />
        </Picker>
        <Form
            ref="form"
            type={Utente}
            options={options}
            />
        <Text>Dias da semana</Text>
        <CheckBox
            title='Segunda-feira'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={this.state.checked}
        />
                <CheckBox
            title='Segunda-feira'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={this.state.checked}
        />
                <CheckBox
            title='Terça-feira'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={this.state.checked}
        />
                <CheckBox
            title='Quarta-feira'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={this.state.checked}
        />
                <CheckBox
            title='Quinta-feira'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={this.state.checked}
        />
                <CheckBox
            title='Sexta-feira'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={this.state.checked}
        />
                <CheckBox
            title='Sábado'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={this.state.checked}
        />
        <CheckBox
            title='Domingo'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={this.state.checked}
        />
        <Text>Períodos do dia</Text>
        <CheckBox
            title='Pequeno-Almoço'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={this.state.checked}
        />
        <CheckBox
            title='Almoço'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={this.state.checked}
        />
        <CheckBox
            title='Lanche'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={this.state.checked}
        />
        <CheckBox
            title='Jantar'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={this.state.checked}
        />
        <CheckBox
            title='Ceia'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={this.state.checked}
        />
        <Button onPress={this.onPress} title='Adicionar' 
                    buttonStyle={styles.buttonStyle}
                    containerStyle={styles.buttonContainer}
                    titleStyle={{color: '#3990A4'}}
                    type="outline"
        />
      </ScrollView>
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
    marginBottom: 20,
    width: '100%',
    alignItems: 'center'
  },
});
