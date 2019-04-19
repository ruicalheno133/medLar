import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View} from 'react-native';
import { ListItem } from 'react-native-elements'
import axios from 'axios'
 
/**
 * 
 * Componente que apresenta a lista de tarefas
 * a realizar para determinado periodo do dia
 * 
 * Cada item é composto pelo nome e id do utente.
 * 
 */
class TarefasList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      utenteList: []
    }
    this.getData=this.getData.bind(this);
  }

  /* Fetch data from API*/
  getData() {
    const alturas = {'Pequeno-Almoço': 1, 'Almoço': 2, 'Lanche': 4, 'Jantar': 8, 'Ceia': 16}
    var altura = alturas[this.props.altura]
    axios.get('http://192.168.0.105:3000/administracao/porAltura/' + altura) // TODO: Change data source
      .then(data => {
        this.setState({
          isLoading: false,
          utenteList: data.data
        })
      })
      .catch(err => {})

  }

  componentDidMount () {
    this.getData()
  }

  render() {
    return (
        this.state.isLoading ? 
        <View style={{flex: 1, justifyContent: 'center',}}>
          <ActivityIndicator size='large' color='#3990A4'/>
        </View> 
        :
        <ScrollView style={{flex: 1}}>
                { this.state.utenteList.map((l) => (
                    <ListItem
                    key={l.idUtente}
                    title={'Medicar ' + l.nome}
                    subtitle={'id: '  + l.idUtente}
                    chevron
                    onPress={() => this.props.navigation.navigate('Administrar', {idUtente: l.idUtente, altura: this.props.altura})}
                    containerStyle={{borderBottomColor: '#d3d3d3', borderBottomWidth: 1}}
                    />
                ))
            }
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    title: {
      textAlignVertical: 'center',
      flex: 1, 
      fontSize: 25, 
      textAlign: 'center',  
      color: 'white'
    }
  });

export default TarefasList;