import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList} from 'react-native';
import { ListItem, Avatar, ButtonGroup, Button, Overlay } from 'react-native-elements'
import { LinearGradient } from 'expo';
import axios from 'axios';
import {Linking} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';


/**
 * 
 * Screen de adminsitração de medicação (a determinado utente)
 * 
 * Composto por:
 *  informação pessoal do utente
 *  medicamentos a administrar
 * 
 */
export default class PerfilUtenteScreen extends React.Component {
  static navigationOptions = {
    title: 'Perfil Utente',
    titleStyle: {
        fontFamily: 'Verdana'
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      utenteInfo: {},
      selectedIndex: 0
    }

    this.getUtenteData=this.getUtenteData.bind(this);
    this.updateIndex=this.updateIndex.bind(this);
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  getUtenteData() {
    axios.get('http://192.168.1.87:3000/utentes/' + this.props.navigation.getParam('idUtente', null)) // TODO: Change data source
    .then(data => {
      this.setState({
        isLoading: false,
        utenteInfo: data.data[0]
      })
    })
    .catch(err => {})
  }

  componentDidMount() {
      this.getUtenteData()
  }


  render() {
    const buttonInfo = () => <Text>Informação Pessoal</Text>
    const buttonFicha = () => <Text>Ficha Médica</Text>
    const buttons = [{ element: buttonInfo  }, { element: buttonFicha }]
    let infoFicha ;
    if (this.state.selectedIndex == 0) {
        infoFicha = (
            <View>
            <ListItem
            key={1}
            title={this.state.utenteInfo.dataNascimento}
            subtitle={'Data de nascimento'}
            containerStyle={{borderBottomColor: '#d3d3d3', borderBottomWidth: 1}}
            />
            <ListItem
            key={2}
            subtitle={'Contacto de emergência'}
            title={this.state.utenteInfo.contEmergencia}
            rightIcon={<FontAwesome name="phone" size={25} style={{ color: 'green' }} />}
            onPress={()=> Linking.openURL(`tel:${this.state.utenteInfo.contEmergencia}`)}
            containerStyle={{borderBottomColor: '#d3d3d3', borderBottomWidth: 1}}
            /> 
            </View>)
    } else {
        infoFicha = (<View></View>)
    }
    return (
        
      <View style={styles.container}>
        <LinearGradient colors={['#3C6478', '#3990A4']} style={{flex: 3}}>
          <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Avatar 
            rounded
            size='large'
            imageProps={{resizeMode: 'cover'}}
            containerStyle={{borderRadius: 100}}
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
            />
            </View>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text style={{color:'white', fontSize: 20, fontWeight: '800'}}>{this.state.utenteInfo.nome}</Text>
                </View>
        </LinearGradient>
        <View style={{flex: 6, padding: 10}}>
            <ButtonGroup
                containerStyle={{borderRadius: 100}}
                selectedIndex={this.state.selectedIndex}
                onPress={this.updateIndex}
                selectedButtonStyle={{backgroundColor: '#68b8ca'}}
                selectedTextStyle={{color: 'white'}}
                buttons={buttons}
            />
            {infoFicha}

            <View style={{alignItems:'center', marginTop: 10, position:'absolute', bottom: 10, right:10}}>
                <Button
                    title=" Editar"
                    type="outline"
                    icon={<FontAwesome name="edit" size={20} style={{color: '#3990A4'}}/>}
                    buttonStyle={{borderRadius: 70, borderColor: '#3990A4'}}
                    titleStyle={{color:'#3990A4'}}
                    
                />
            </View>

          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1
  },
  verticaCenter: {
    textAlignVertical: 'center'
  }
});
