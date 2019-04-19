import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View, Text} from 'react-native';
import { ListItem, Avatar, Button} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';

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

    constructor(props){
        super(props);
        this.state = {
            isLoading : true,
            lembreteList : [],
            semLembretes : 'Não tem lembretes!'
        };
        this.getData=this.getData.bind(this);
    }

    /* Fetch Data from API*/
    getData() {
        /*
        axios.get('http://192.168.1.87:3000/lembretes/listarTodos'+idFuncionario) // Atenção: é preciso ir buscar o idFuncionário a alguma lado (jwt?)
            .then(data => {
                this.setState({
                    isLoading: false,
                    lembreteList: data.data
                })
            })
            .catch(err => {})
        */
       // Mock Lembretes
       this.setState({
           isLoading: false,
           lembreteList: [
               {
                    idLembrete: 1,
                    timestamp: '2019-04-18 12:00:00',
                    texto : 'Medicar Almoço',
                    utente: "Rui Alvim",
                    concluido : 0,
                    idFuncionario: 1
               }
           ]
       })
    }

    componentDidMount(){
        this.getData();
    }

    render(){
        return(
            this.state.isLoading ? // Verificar se está a carregar
            <View style={{flex: 1, justifyContent: 'center',}}>
                <ActivityIndicator size='large' color='#3990A4'/>
            </View> 
            :
            (this.state.lembreteList.length > 0) ? // Verificar se há lembretes
            <View style={{flex:1}}>
                <ScrollView style={{flex:1}}>
                    {
                        this.state.lembreteList.map((l) => (
                            l.concluido == 0 ? 
                            <ListItem
                                key={l.idLembrete}
                                title={l.texto}
                                subtitle={l.utente}
                                rightTitle={l.timestamp}
                                leftElement={
                                    <FontAwesome5 name ={'bell'} size={30} style={{color:'black'}}></FontAwesome5>
                                }
                                rightElement={
                                    <View style = {{flexDirection:"row"}}>
                                        <Button type='clear' icon={<FontAwesome name="trash" size={30} style={{color:'black'}}/>}></Button>
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
            :
            <View style={{flex: 1}}>
                <Text style={styles.title}>
                    {this.state.semLembretes}
                </Text>
            </View>
        );
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