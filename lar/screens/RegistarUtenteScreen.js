import React from 'react';
import {ScrollView, View, StyleSheet, Text, Alert} from 'react-native';
import { Button , Avatar} from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import {ImagePicker, Permissions, Constants, LinearGradient} from 'expo';


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
    this.getPermissionAsync = this.getPermissionAsync.bind(this);
    this.onChange = this.onChange.bind(this);
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

  componentDidMount(){
    this.getPermissionAsync();
  }
  /*
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
  */
  async onPress(){
    var token = await auth.getJWT() // Get token
    var value = this.refs.form.getValue();
    var body = new FormData();
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
      axios.post(`http://${conf.host}:${conf.port}/utentes/`,body,
      {
        headers: {
          Authorization: 'Bearer ' + token ,
          'Content-Type' : 'multipart/form-data',
          'Accept' : 'multipart/form-data',
        }
      })
        .then(res => {this.handleRegister(); this.props.navigation.state.params.getData(); this.props.navigation.navigate('Utentes')})
        .catch(err => {
          console.log(err)
        })
    }
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

  onChange(value){
    this.setState({value})
  }

  render() {
    let defaultPhoto = {uri: `http://${conf.host}:${conf.port}/static/images/icon.png`}
    let newPhoto = this.state.image ? {uri: `${this.state.image.uri}`} : {uri : null}

    return (
      <ScrollView style={styles.container}>
        <Form
          ref="form"
          type={Utente}
          options={options}
          value={this.state.value}
          onChange={this.onChange}
        />
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <Avatar
            rounded
            size='large'
            imageProps={{resizeMode: 'cover'}}
            containerStyle={{borderRadius: 100, paddingTop:5}}
            source={!this.state.image ? defaultPhoto : newPhoto}
          />
        </View>
        <View style={{flex:1, padding: 10, flexDirection:'row',justifyContent:'space-around'}}>
          <Button
            title="Escolher foto"
            onPress={this._pickImage}
            type="outline"
            icon={<FontAwesome name="edit" size={20} style={{color: '#3990A4'}}/>}
            buttonStyle={{borderRadius: 70, borderColor: '#3990A4'}}
            titleStyle={{color:'#3990A4'}}          
          />
          <Button
            title="Tirar foto"
            onPress={this._takeImage}
            type="outline"
            icon={<FontAwesome name="edit" size={20} style={{color: '#3990A4'}}/>}
            buttonStyle={{borderRadius: 70, borderColor: '#3990A4'}}
            titleStyle={{color:'#3990A4'}}          
          />
        </View>
        <Button onPress={this.onPress} title='Registar' 
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
    width: '100%',
    alignItems: 'center'
  },
});
