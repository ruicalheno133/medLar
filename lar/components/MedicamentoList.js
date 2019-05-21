import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View} from 'react-native';
import { ListItem , Button} from 'react-native-elements'
import axios from 'axios'
import { FontAwesome } from '@expo/vector-icons';
var conf = require('../myConfig.json')


/**
 * 
 * Componente que apresenta de medicamentos que 
 * determinado utente deve tomar
 * 
 * Para cada medicamento é apresentado o nome, a quantidade, a unidade
 * e botões que permitem indicar a administração (ou não) do mesmo
 * 
 */
class MedicamentoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      medicamentoList: []
    }
    this.getData=this.getData.bind(this);
    this.handleNoPress=this.handleNoPress.bind(this);
  }

  /* Fetch data from API */
  getData() {
    const alturas = {'Pequeno-Almoço': 1, 'Almoço': 2, 'Lanche': 4, 'Jantar': 8, 'Ceia': 16}
    var altura = alturas[this.props.navigation.getParam('altura')]
    axios.get(`http://${conf.host}:${conf.port}/administracao/porDoente/${this.props.navigation.getParam('idUtente')}/${altura}`) // TODO: Change data source
      .then((data)=> {
        this.setState({
          isLoading: false,
          medicamentoList: data.data
        })
      })
      .catch(err => {})

  }

  handleNoPress() {
    this.props.navigation.navigate('Observacoes');
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
                { this.state.medicamentoList.map((m) => (
                    <ListItem
                    roundAvatar
                    key={m.idMedicamento}
                    title={m.quantidade + ' ' + m.unidade}
                    subtitle={m.Medicamento}
                    rightElement={
                      <View style={{flexDirection: "row"}}>
                        <Button type='clear' icon={<FontAwesome name="check-circle" size={30} style={{color: '#3990A4'}}/>}></Button>
                        <Button type='clear' onPress={this.handleNoPress} icon={<FontAwesome name="times-circle" size={30} style={{color: 'red'}} />}></Button>
                      </View>
                    }
                    onPress={() => this.props.navigation.navigate('Medicamento')}
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

export default MedicamentoList;