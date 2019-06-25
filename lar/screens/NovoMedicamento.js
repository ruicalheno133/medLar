import React from 'react';
import { ScrollView, StyleSheet, Text, Picker, Alert, View, ActivityIndicator} from 'react-native';
import { Button, CheckBox } from 'react-native-elements';

var t = require('tcomb-form-native');
var _ = require('lodash');
var axios = require('axios')
import moment from "moment";
var auth = require('../auth')
var conf = require('../myConfig.json')

var Form = t.form.Form;

var Unidades = t.enums({
  Mg: 'mg',
  G: 'g',
})

var Medicamento = t.struct({
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
        },
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
        error: 'Unidade inválida.'
    },
    quantidade: {
        stylesheet: stylesheet,
        label: 'Quantidade',
        error: 'Quantidade inválida.'
    }
  }};

export default class NovoMedicamentoScreen extends React.Component {
  static navigationOptions = {
    title: 'Novo medicamento',
  };

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      medicamentos: [],
      utente: {},
      step: 1,
      idMedicamento: '',
      checkVariables: {
        segunda: false,
        terca: false,
        quarta: false,
        quinta: false,
        sexta: false,
        sabado: false,
        domingo: false,
        pequenoAlmoco: false,
        almoco: false,
        lanche: false,
        jantar: false,
        ceia: false
      }
    }
    this.onChange = this.onChange.bind(this);
    this.onPress=this.onPress.bind(this);
  }

  async fetchMedicamentos(cb){
    var token = await auth.getJWT() // Get token
    axios.get(`http://${conf.host}:${conf.port}/medicamentos`,{headers: {Authorization: `Bearer ${token}`}})
      .then(data => {
        this.setState({
          medicamentos: data.data
        })
        cb()
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.fetchMedicamentos(() => {
      this.setState({
        isLoading: false
      })
    })
  }

  async onPress () {
    var dias = 0;
    var periodosDia = 0;
    var checked = this.state.checkVariables;
    if(checked.pequenoAlmoco) periodosDia += 1;
    if(checked.almoco)    periodosDia += 2;
    if(checked.lanche)    periodosDia += 4;
    if(checked.jantar)    periodosDia += 8;
    if(checked.ceia)      periodosDia += 16;
    if(checked.domingo)   dias += 1;
    if(checked.segunda)   dias += 2;
    if(checked.terca)     dias += 4;
    if(checked.quarta)    dias += 8;
    if(checked.quinta)    dias += 16;
    if(checked.sexta)     dias += 32;
    if(checked.sabado)    dias += 64;
    var fichaMed = {
      idUtente: this.props.navigation.state.params.idUtente,
      idMedicamento: this.state.idMedicamento,
      periodosDia: periodosDia,
      quantidade: this.state.value.quantidade,
      unidade: this.state.value.unidade,
      dataInicio: this.state.value.dataInicio.toString(),
      dataFim: this.state.value.dataFim ? this.state.value.dataFim.toString() : null,
      dias: dias,
      estado: 1
    }
    var token = await auth.getJWT() // Get token
    axios.post(`http://${conf.host}:${conf.port}/fichaMedicacao`,fichaMed,{headers: {Authorization: `Bearer ${token}`}})
      .then(data => {
        Alert.alert('Medicação adicionada')
        this.props.navigation.navigate('PerfilUtente', {idUtente: this.state.idUtente})
      })
      .catch(err => console.log(err))
  }

  onChange(value){
    this.setState({value})
  }

  check(item){
    var checkedVars = this.state.checkVariables;
    checkedVars[item] = !checkedVars[item]
    this.setState({
      checkVariables: checkedVars
    })
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, justifyContent: 'center',}}>
          <ActivityIndicator size='large' color='#3990A4'/>
        </View> 
      )
    }
      else{
        switch(this.state.step){
          case 1:
              return (
                <ScrollView style={styles.container}>
                  <Text style={{color: 'grey', fontWeight:'800',fontSize:16}}>Medicamento*</Text>
                  <Picker
                      selectedValue={this.state.idMedicamento}
                      style={{height: 50, width: '100%', borderColor:'grey', borderWidth:5}}
                      onValueChange={(itemValue, itemIndex) => {
                        this.setState({idMedicamento: itemValue})
                      }}
                  >
                    <Picker.Item label="Medicamento" value="" />
                    {this.state.medicamentos.map(medicamento => {
                      return(
                        <Picker.Item key={medicamento.idMedicamento} label={medicamento.Medicamento} value={medicamento.idMedicamento}/>
                      )
                    })}
                  </Picker>
                  <Form
                      ref="form"
                      type={Medicamento}
                      options={options}
                      onChange={this.onChange}
                      value={this.state.value}
                      />
                  <Button onPress={() => {this.setState({step:2})}} 
                    title='Seguinte' 
                    buttonStyle={styles.buttonStyle}
                    containerStyle={styles.buttonContainer}
                    titleStyle={{color: '#3990A4'}}
                    type="outline"
                    disabled={this.state.value ? (this.state.idMedicamento==='' ||!this.state.value.quantidade || !this.state.value.unidade || !this.state.value.dataInicio) : (!this.state.value)}
                  />
                </ScrollView>
              )
          case 2:
            return(
              <ScrollView style={styles.container}>
                <Text>Dias da semana</Text>
                    <CheckBox
                        title='Segunda-feira'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.checkVariables.segunda}
                        onPress={() => this.check('segunda')}
                    />
                    <CheckBox
                        title='Terça-feira'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.checkVariables.terca}
                        onPress={() => this.check('terca')}
                    />
                            <CheckBox
                        title='Quarta-feira'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.checkVariables.quarta}
                        onPress={() => this.check('quarta')}
                    />
                            <CheckBox
                        title='Quinta-feira'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.checkVariables.quinta}
                        onPress={() => this.check('quinta')}
                    />
                            <CheckBox
                        title='Sexta-feira'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.checkVariables.sexta}
                        onPress={() => this.check('sexta')}
                    />
                            <CheckBox
                        title='Sábado'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.checkVariables.sabado}
                        onPress={() => this.check('sabado')}
                    />
                    <CheckBox
                        title='Domingo'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.checkVariables.domingo}
                        onPress={() => this.check('domingo')}
                    />
                    <View style={styles.buttonContainer}>
                      <Button onPress={() => {this.setState({step:1})}} 
                        title='Voltar' 
                        buttonStyle={{...styles.buttonStyle, width:'80%'}}
                        containerStyle={styles.buttonContainer}
                        titleStyle={{color: '#3990A4'}}
                        type="outline"
                      />
                      <Button onPress={() => {this.setState({step:3})}} 
                        title='Seguinte' 
                        buttonStyle={{...styles.buttonStyle, width:'80%'}}
                        containerStyle={styles.buttonContainer}
                        titleStyle={{color: '#3990A4'}}
                        type="outline"
                        disabled={!this.state.checkVariables.segunda && !this.state.checkVariables.terca &&
                                  !this.state.checkVariables.quarta && !this.state.checkVariables.quinta && 
                                  !this.state.checkVariables.sexta && !this.state.checkVariables.sabado &&
                                  !this.state.checkVariables.domingo }
                      />
                    </View>
                  </ScrollView>
            )
            case 3:
              return(
                <ScrollView style={styles.container}>
                  <Text>Períodos do dia</Text>
                  <CheckBox
                      title='Pequeno-Almoço'
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checked={this.state.checkVariables.pequenoAlmoco}
                      onPress={() => this.check('pequenoAlmoco')}
                  />
                  <CheckBox
                      title='Almoço'
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checked={this.state.checkVariables.almoco}
                      onPress={() => this.check('almoco')}
                  />
                  <CheckBox
                      title='Lanche'
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checked={this.state.checkVariables.lanche}
                      onPress={() => this.check('lanche')}
                  />
                  <CheckBox
                      title='Jantar'
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checked={this.state.checkVariables.jantar}
                      onPress={() => this.check('jantar')}
                  />
                  <CheckBox
                      title='Ceia'
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checked={this.state.checkVariables.ceia}
                      onPress={() => this.check('ceia')}
                  />
                  <View style={styles.buttonContainer}>
                    <Button onPress={() => {this.setState({step:2})}} 
                        title='Voltar' 
                        buttonStyle={{...styles.buttonStyle, width:'80%'}}
                        containerStyle={styles.buttonContainer}
                        titleStyle={{color: '#3990A4'}}
                        type="outline"
                      />
                    <Button onPress={this.onPress} 
                        title='Adicionar' 
                        buttonStyle={{...styles.buttonStyle, width:'80%'}}
                        containerStyle={styles.buttonContainer}
                        titleStyle={{color: '#3990A4'}}
                        type="outline"
                        disabled={!this.state.checkVariables.almoco && !this.state.checkVariables.pequenoAlmoco &&
                                  !this.state.checkVariables.lanche && !this.state.checkVariables.jantar && 
                                  !this.state.checkVariables.ceia}
                    />
                  </View>
                </ScrollView>
              )
        }
    }
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
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
});
