import React from 'react';
import { ScrollView, StyleSheet, Text, Picker, Alert, View, ActivityIndicator} from 'react-native';
import { Button, CheckBox } from 'react-native-elements';

var axios = require('axios')
import moment from "moment";
var auth = require('../auth')
var conf = require('../myConfig.json')


const myFormatFunction = format => date => moment(date).format(format)

export default class EditarFichaMedicacaoScreen extends React.Component {
  static navigationOptions = {
    title: 'Editar ficha de medicação',
  };

  constructor(props) {
    super(props)
    this.state = {
      step:1,
      isLoading: true,
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

  componentDidMount(){
    var checkVariables = {};
    console.log(this.props.navigation.getParam('fichaMedicacao'))
    var dias = this.props.navigation.getParam('fichaMedicacao').dias;
    var periodosDia = this.props.navigation.getParam('fichaMedicacao').periodosDia;
    if((dias & 1) !== 0) checkVariables.segunda = true 
      else checkVariables.segunda = false;
    if((dias & 2) !== 0) checkVariables.terca = true
      else checkVariables.terca = false;
    if((dias & 4) !== 0) checkVariables.quarta = true 
      else checkVariables.quarta = false;
    if((dias & 8) !== 0) checkVariables.quinta = true 
      else checkVariables.quinta = false;
    if((dias & 16) !== 0) checkVariables.sexta = true
      else checkVariables.sexta = false;
    if((dias & 32) !== 0) checkVariables.sabado = true
      else checkVariables.sabado = false;
    if((dias & 64) !== 0) checkVariables.domingo = true
      else checkVariables.domingo = false;

    
    if((periodosDia & 1)  !== 0) checkVariables.pequenoAlmoco = true
      else checkVariables.pequenoAlmoco = false;
    if((periodosDia & 2)  !== 0) checkVariables.almoco = true 
      else checkVariables.almoco = false;
    if((periodosDia & 4)  !== 0) checkVariables.lanche = true
      else checkVariables.lanche = false;
    if((periodosDia & 8)  !== 0) checkVariables.jantar = true
      else checkVariables.jantar = false;
    if((periodosDia & 16) !== 0) checkVariables.ceia = true
      else checkVariables.ceia = false;
    
    console.log(checkVariables)

    this.setState({
      idFichaMedicacao: this.props.navigation.getParam('fichaMedicacao').idFichaMedicacao,
      checkVariables: checkVariables,
      isLoading: false
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
    if(checked.segunda)   dias += 1;
    if(checked.terca)     dias += 2;
    if(checked.quarta)    dias += 4;
    if(checked.quinta)    dias += 8;
    if(checked.sexta)     dias += 16;
    if(checked.sabado)    dias += 32;
    if(checked.domingo)   dias += 64;
    var fichaMed = {
      periodosDia: periodosDia,
      //dataFim: this.state.value.dataFim ? this.state.value.dataFim.toString() : null,
      dias: dias,
    }
    
    var token = await auth.getJWT() // Get token
    axios.put(`http://${conf.host}:${conf.port}/fichaMedicacao/editar/${this.state.idFichaMedicacao}`,fichaMed,{headers: {Authorization: `Bearer ${token}`}})
      .then(data => {
        Alert.alert('Ficha de medicação editada com sucesso!')
        this.props.navigation.navigate('PerfilUtente', {idUtente: this.props.navigation.state.params.idUtente})
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
                      <Button onPress={() => {this.setState({step:2})}} 
                        title='Seguinte' 
                        buttonStyle={{...styles.buttonStyle, width:'80%'}}
                        containerStyle={styles.buttonContainer}
                        titleStyle={{color: '#3990A4'}}
                        type="outline"
                      />
                    </View>
                  </ScrollView>
            )
            case 2:
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
                    <Button onPress={() => {this.setState({step:1})}} 
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
