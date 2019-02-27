import React from 'react';
import { View , StyleSheet, Platform} from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo';


class TarefasButtonList extends React.Component {
  render() {
    return (
      <LinearGradient colors={['#3C6478', '#3990A4']} style={{flex: 1}}>
      <View style={styles.container}>
          <Button
            onPress={() => this.props.navigation.navigate('TarefasDia', {altura: 'Pequeno-Almoço'})}
            title='Pequeno-Almoço'
            containerStyle={styles.container}
            buttonStyle={styles.buttonAltura}
          />      
          <Button
            onPress={() => this.props.navigation.navigate('TarefasDia', {altura: 'Almoço'})}
            title='Almoço'
            containerStyle={styles.container}
            buttonStyle={styles.buttonAltura}
          />   
          <Button
            onPress={() => this.props.navigation.navigate('TarefasDia', {altura: 'Lanche'})}
            title='Lanche'
            containerStyle={styles.container}
            buttonStyle={styles.buttonAltura}
          />    
          <Button
            onPress={() => this.props.navigation.navigate('TarefasDia', {altura: 'Jantar'})}
            title='Jantar'
            containerStyle={styles.container}
            buttonStyle={styles.buttonAltura}
          />       
          <Button
            onPress={() => this.props.navigation.navigate('TarefasDia', {altura: 'Ceia'})}
            title='Ceia'
            containerStyle={styles.container}
            buttonStyle={styles.buttonAltura}
          />    
          
      </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  buttonAltura: {
    height:"100%",
    backgroundColor: 'transparent',
    borderBottomWidth: 1, 
    borderBottomColor: '#F5F5F5'
  },
  container: {
    flex: 1,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default TarefasButtonList;