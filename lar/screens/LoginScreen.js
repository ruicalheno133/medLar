import React from 'react';
import { StyleSheet, View, Text, Alert} from 'react-native';
import { Input, Button} from 'react-native-elements';
import { LinearGradient } from 'expo';
import axios from 'axios';
var conf = require('../myConfig.json')
var auth = require('../auth')


/**
 * 
 * Screen que permite ao utilizador fazer o login ou
 * registar-se 
 * 
 * Composto por:
 *  Form de autenticação
 *  Butão de registo
 */
export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);
    this.state = {
        email: "",
        password: "",
        error: ""
    };
    this.handleLogin=this.handleLogin.bind(this);
    this.handleRegister=this.handleRegister.bind(this);
}

handleRegister(){
  this.props.navigation.navigate('RegistarFuncionario')
}

  handleLogin() {
    axios.post(`http://${conf.host}:${conf.port}/auth/login`, 
    {
      email: this.state.email,
      password: this.state.password
    }).then(response => {

      if (response.data.token) {
        auth.storeToken(response.data.token)
        this.props.navigation.navigate('Tarefas')
      }
      
    }).catch(err => {
      Alert.alert('Erro', 'Credenciais inválidas.')
    })

  }

  render() {
    return (
    <LinearGradient colors={['#3C6478', '#3990A4']} style={{flex: 1}}>
        <View style={styles.topContainer}>
            <Text style={styles.welcomeText}>Bem-Vindo/a</Text>
        </View>
        <View style={styles.bottomContainer}>
            <Input
                name="email"
                placeholder='Email'
                containerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                onChangeText={(email) => this.setState({email: email})}
            />
            <Input
                secureTextEntry={true}
                name="password"
                placeholder='Palavra-Passe'
                containerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                onChangeText={(password) => this.setState({password: password})}
            />
            <Button onPress={this.handleLogin} title='Entrar' 
                    buttonStyle={styles.buttonStyle}
                    containerStyle={styles.buttonContainer}

                    />
            <Button title='Criar conta' type='clear' titleStyle={styles.registerButton} onPress={this.handleRegister}/>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomContainer: {
    flex: 3,
    alignItems: 'center'
  },
  welcomeText: {
    fontSize: 30,
    color: 'white'
  },
  inputContainerStyle: {
      width: '80%',
      marginBottom: 10,
  },
  inputStyle: {
    color: 'white'
  },
  buttonStyle: {
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    paddingTop: 10,
    width: '80%'
  },
  registerButton: {
      fontWeight: 'normal',
      fontSize: 14,
      color: 'white',
      opacity: 0.8
  }
});
