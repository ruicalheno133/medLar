import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Input, Button} from 'react-native-elements';
import { LinearGradient } from 'expo';



export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
    <LinearGradient colors={['#3C6478', '#3990A4']} style={{flex: 1}}>
        <View style={styles.topContainer}>
            <Text style={styles.welcomeText}>Bem-Vindo/a</Text>
        </View>
        <View style={styles.bottomContainer}>
            <Input
                placeholder='Identificação'
                containerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
            />
            <Input
                placeholder='Palavra-Passe'
                containerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
            />
            <Button onPress={() => {this.props.navigation.navigate('Main')}} title='Entrar' 
                    buttonStyle={styles.buttonStyle}
                    containerStyle={styles.buttonContainer}
                    />
            <Button title='Criar conta' type='clear' titleStyle={styles.registerButton}/>
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
