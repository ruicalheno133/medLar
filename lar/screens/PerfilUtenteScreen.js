import React from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';
import { ListItem, Avatar, ButtonGroup, Button} from 'react-native-elements'
import { LinearGradient } from 'expo';
import axios from 'axios';
import {Linking} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import FichaMedica from '../components/FichaMedica'
var conf = require('../myConfig.json')
var auth = require('../auth')


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

  async desativarUtente(){
    var token = await auth.getJWT()
    Alert.alert(
      'Desativar Utente',
      'Tem a certeza que pretende desativar o utente?',
      [
        {
          text: 'Sim', onPress: () => {
            axios.put(`http://${conf.host}:${conf.port}/utentes/desativar/${this.props.navigation.getParam('idUtente',null)}`, {} ,
            { headers: {Authorization: `Bearer ${token}`}})
                .then(() => {
                  this.props.navigation.state.params.getData()
                  this.props.navigation.navigate(('Utentes'))
                })
                .catch(err => {
                  console.log(err)
                })
          }
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ],
      {cancelable: true}
    )
  }

  async getUtenteData(idUtente) {
    var token = await auth.getJWT() // Get token
    axios.get(`http://${conf.host}:${conf.port}/utentes/${idUtente}`,
    { headers: { Authorization: 'Bearer ' + token }}) // TODO: Change data source
    .then(data => {
      this.setState({
        selectedIndex:0,
        isLoading: false,
        utenteInfo: data.data[0]
      })
    })
    .catch(err => {})
  }

  componentDidMount() {
      this.getUtenteData(this.props.navigation.getParam('idUtente',null))
  }


  render() {
    const buttonInfo = () => <Text>Informação Pessoal</Text>
    const buttonFicha = () => <Text>Ficha de Medicação</Text>
    const buttons = [{ element: buttonInfo  }, { element: buttonFicha }]
    let infoFicha ;
    if (this.state.selectedIndex == 0) {
        infoFicha = (
            <View>
            <ListItem
              key={1}
              title={this.state.utenteInfo.nomeUsado}
              subtitle={'Nome usado'}
              containerStyle={{borderBottomColor: '#d3d3d3', borderBottomWidth: 1}}
            />
            <ListItem
            key={2}
            title={this.state.utenteInfo.dataNascimento}
            subtitle={'Data de nascimento'}
            containerStyle={{borderBottomColor: '#d3d3d3', borderBottomWidth: 1}}
            />
            <ListItem
            key={3}
            subtitle={'Contacto de emergência'}
            title={this.state.utenteInfo.contEmergencia}
            rightIcon={<FontAwesome name="phone" size={25} style={{ color: 'green' }} />}
            onPress={()=> Linking.openURL(`tel:${this.state.utenteInfo.contEmergencia}`)}
            containerStyle={{borderBottomColor: '#d3d3d3', borderBottomWidth: 1}}
            /> 
            </View>)
    } else {
        infoFicha = (
          <FichaMedica navigation={this.props.navigation} utenteInfo={this.state.utenteInfo}/>
        )
    }
    return (
        
      <View style={styles.container}>
        <LinearGradient colors={['#3C6478', '#3990A4']} style={{flex: 2}}>
          <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Avatar
              rounded
              size='large'
              imageProps={{resizeMode: 'cover'}}
              containerStyle={{borderRadius: 100}}
              source={this.state.utenteInfo.foto ? 
                        {uri:`http://${conf.host}:${conf.port}/static/images/${this.state.utenteInfo.foto}`}
                      :
                        {uri:`http://${conf.host}:${conf.port}/static/images/icon.png`}
                      }
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
            
            {this.state.selectedIndex === 0 ?
            <View style={{flexDirection:'row',justifyContent:'space-around', paddingTop:10, marginTop: 10, bottom: 10, right:10, zIndex: 1}}>
              <Button
                  title="Remover Utente"
                  onPress={()=> this.desativarUtente()}
                  type="outline"
                  icon={<FontAwesome name="edit" size={20} style={{color: '#3990A4'}}/>}
                  buttonStyle={{borderRadius: 70, borderColor: '#3990A4'}}
                  titleStyle={{color:'#3990A4'}}
                  
              />
              <Button
                  title="Editar dados"
                  onPress={()=>this.props.navigation.navigate('EditarPerfil',{idUtente: this.state.utenteInfo.idUtente, getUtenteData: this.getUtenteData})}
                  type="outline"
                  icon={<FontAwesome name="edit" size={20} style={{color: '#3990A4'}}/>}
                  buttonStyle={{borderRadius: 70, borderColor: '#3990A4'}}
                  titleStyle={{color:'#3990A4'}}
                  
              />
            </View>                     
            :
            <View style={{alignItems:'flex-end', paddingTop:10, marginTop: 10, bottom: 10, right:10, zIndex: 1}}>
              <Button
                  title="Novo medicamento"
                  onPress={()=>{
                    this.props.navigation.navigate('NovoMedicamento',{idUtente: this.state.utenteInfo.idUtente})
                    this.setState({
                      selectedIndex:0
                    })
                  }}
                  type="outline"
                  icon={<FontAwesome name="edit" size={20} style={{color: '#3990A4'}}/>}
                  buttonStyle={{borderRadius: 70, borderColor: '#3990A4'}}
                  titleStyle={{color:'#3990A4'}}
                  
              />
            </View>  
            }

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
