import React from 'react';
import { ScrollView, StyleSheet, View, Text, Alert} from 'react-native';
import { ListItem, Button} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
var moment = require('moment')
var conf = require('../myConfig.json')
var auth = require('../auth')

/**
 * Componente que lista os lembretes de um funcionário 
 * do lar
 * 
 * Cada item é composto pelo 
 * texto do lembrete, 
 * a hora, 
 * e o paciente (se for definido)
 */

class LembreteList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {lembretesList: props.lembretesList}
        this.handleDelete = this.handleDelete.bind(this)
        this.deleteConfirmed = this.deleteConfirmed.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.lembretesList !== this.state.lembretesList){
            this.setState({lembretesList: nextProps.lembretesList });
          }
    }

    async deleteConfirmed(id) {
        var token = await auth.getJWT() // Get token
        axios.put(`http://${conf.host}:${conf.port}/lembretes/concluir/${id}`,
                    { headers: { Authorization: 'Bearer ' + token }})
             .then( res => {
                 var newList = this.state.lembretesList.filter(l => l.idLembrete != id)
                 this.setState({lembretesList: newList})
                })
             .catch( err => res.json(err))
    }

    handleDelete(id){
            // Works on both iOS and Android
            Alert.alert(
            'Aviso',
            'Tem a certeza que pretende eliminar este lembrete?',
            [
                {text: 'Voltar', onPress: () => {}},
                {text: 'Sim', onPress: () => this.deleteConfirmed(id)}
                
            ],
            {cancelable: true},
        );
    }

    render(){
        return(
            <View style={{flex:1}}>
                <ScrollView style={{flex:1}}>
                    {
                        this.state.lembretesList.map((l) => (
                            l.concluido == 0 ? 
                            <ListItem
                                key={l.idLembrete}
                                title={l.utente ? <Text>Utente: {l.utente}</Text> : null}
                                subtitle={
                                    l.timestamp ? 
                                    <View>
                                        <Text style={{opacity: 0.7}}>{l.texto}</Text>
                                        <Text style={{opacity: 0.7}}>{moment(l.timestamp, "YYYY-MM-DD H:mm:ss").format('DD/MM/YY - HH:mm')}</Text>
                                    </View>
                                    :
                                    <View>
                                        <Text style={{opacity: 0.7}}>{l.texto}</Text>
                                    </View>
                                }
                                rightTitle={''}
                                leftElement={
                                    <FontAwesome5 name ={'bell'} size={30} style={{color:'black'}}></FontAwesome5>
                                }
                                rightElement={
                                    <View style = {{flexDirection:"row"}}>
                                        <Button type='clear' onPress={() => this.handleDelete(l.idLembrete)} icon={<FontAwesome name="trash" size={30} style={{color:'black'}}/>}></Button>
                                    </View>
                                }
                                containerStyle={{borderBottomColor: '#d3d3d3', borderBottomWidth: 1}}
                            />
                            :
                            null
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
      flex: 1, 
      fontSize: 15, 
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold'
    },
    button:{
        flex:2,
        borderColor: 'black',
        borderWidth: 1,
    }
  });

export default LembreteList;