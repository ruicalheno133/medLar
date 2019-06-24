import React from 'react';
import { ScrollView, StyleSheet, Text, Picker, Alert, View, ActivityIndicator, Image} from 'react-native';
import { Button, CheckBox, Avatar } from 'react-native-elements';
import {ImagePicker, Permissions, Constants, LinearGradient} from 'expo';
import { FontAwesome } from '@expo/vector-icons';

var t = require('tcomb-form-native');
var _ = require('lodash');
import moment from "moment";
var axios = require('axios')
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


export default class EditarFotoScreen extends React.Component {
  static navigationOptions = {
    title: 'Editar perfil do utente',
  };

  constructor(props) {
    super(props)
    this.state = {
        isLoading: true,
        image: null,
        idUtente: this.props.navigation.state.params.idUtente,
        utenteInfo: {}
    }
    this.fecthUtenteData = this.fecthUtenteData.bind(this);
    this._pickImage = this._pickImage.bind(this)
    this.alterarDados = this.alterarDados.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async fecthUtenteData(){
    var token = await auth.getJWT();
    axios.get(`http://${conf.host}:${conf.port}/utentes/${this.state.idUtente}`,{headers: {Authorization: `Bearer ${token}`}})
        .then(data => {
            var dataNasc = data.data[0].dataNascimento;
            var formInfo = {
              dataNascimento: new Date(dataNasc.split("-")[0],dataNasc.split("-")[1]-1,dataNasc.split("-")[2]),
              nomeUsado: data.data[0].nomeUsado,
              nome: data.data[0].nome,
              contEmergencia: data.data[0].contEmergencia
            }
            this.setState({
                utenteInfo: {...data.data[0]},
                isLoading: false,
                value: formInfo
            })
        })
        .catch(erro => {
            console.log(erro)
        })
  }

  componentDidMount(){
    console.log(this.props.navigation.state)
    this.fecthUtenteData();
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    else{
        const statusCam = await Permissions.askAsync(Permissions.CAMERA).status
        if(statusCam !== 'granted') {
            alert('Precisamos da sua permissão para aceder à camera')
        }
        const statusRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL).status
        if(statusRoll !== 'granted') {
            alert('Precisamos da sua permissão para aceder ao rolo da camera')
        }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result });
    }
  };


  _takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result.uri.split("/").slice(-1)[0])

    if (!result.cancelled) {
      this.setState({ image: result });
    }
  };

  async alterarDados() {
    var token = await auth.getJWT();
    var body = new FormData();
    var value = this.refs.form.getValue();
    if(value != null){
      var dataNasc = value.dataNascimento;
      if(this.state.image){
        body.append('foto',{uri: this.state.image.uri, name:this.state.image.uri.split("/").slice(-1)[0],type:'image/png'})
      }
      Object.keys(value).forEach(key => {
        body.append(key,value[key])
      })
      body.append('idUtente',this.state.idUtente)
      body.append('dataNascimento',dataNasc.toISOString().split("T")[0])
      axios.put(`http://${conf.host}:${conf.port}/utentes/atualizar`,body,
      {
        headers: {
          Authorization: 'Bearer ' + token ,
          'Content-Type' : 'multipart/form-data',
          'Accept' : 'multipart/form-data',
        }
      })
        .then(() => {
          Alert.alert('Dados do utente alterados!')
          this.props.navigation.state.params.getUtenteData(this.state.idUtente);
          this.props.navigation.navigate('PerfilUtente', {idUtente: this.state.idUtente})
        })
        .catch(err => {
          console.log(err)
          Alert.alert('Dados do utente alterados!')
          this.props.navigation.state.params.getUtenteData(this.state.idUtente);
          this.props.navigation.navigate('PerfilUtente', {idUtente: this.state.idUtente})
        })
    }
  }

  onChange(value){
    this.setState({
      value
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
        let defaultPhoto = {uri: `http://${conf.host}:${conf.port}/static/images/${this.state.utenteInfo.foto}`}
        let newPhoto = this.state.image ? {uri: `${this.state.image.uri}`} : {uri : null}
        return(  
          <ScrollView style={styles.container}>
            <LinearGradient colors={['#3C6478', '#3990A4']} style={{flex: 3}}>
              <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                <Avatar
                  rounded
                  size='large'
                  imageProps={{resizeMode: 'cover'}}
                  containerStyle={{borderRadius: 100, paddingTop:5}}
                  source={!this.state.image ? defaultPhoto : newPhoto}
                />
              </View>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text style={{color:'white', fontSize: 20, fontWeight: '800'}}>{this.state.utenteInfo.nome}</Text>
                </View>
                <View style={{flex:1, padding: 10, flexDirection:'row',justifyContent:'space-around'}}>
                  <Button
                      title="Escolher foto"
                      onPress={this._pickImage}
                      type="outline"
                      icon={<FontAwesome name="edit" size={20} style={{color: 'white'}}/>}
                      buttonStyle={{borderRadius: 70, borderColor: 'white'}}
                      titleStyle={{color:'white'}}
                      
                  />
                  <Button
                      title="Tirar foto"
                      onPress={this._takeImage}
                      type="outline"
                      icon={<FontAwesome name="edit" size={20} style={{color: 'white'}}/>}
                      buttonStyle={{borderRadius: 70, borderColor: 'white'}}
                      titleStyle={{color:'white'}}
                      
                  />
                </View>
              </LinearGradient>
              <View style={{flex:6, padding: 10}}>
                <Form
                  ref="form"
                  type={Utente}
                  onChange={this.onChange}
                  value={this.state.value}
                  options={options}
                />
              </View>
              <View style={{alignItems:'center', justifyContent:'center', flex:1, padding:10}}>
                <Button
                        title="Concluir"
                        onPress={() => this.alterarDados()}
                        type="outline"
                        icon={<FontAwesome name="edit" size={20} style={{color: '#3990A4'}}/>}
                        containerStyle={{width:'50%', alignItems:'center'}}
                        buttonStyle={{borderRadius: 70, borderColor: '#3990A4'}}
                        titleStyle={{color:'#3990A4'}}
                        
                    />
              </View>
        </ScrollView> 
        )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "30%"
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
