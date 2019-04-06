import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View} from 'react-native';
import { ListItem , Button} from 'react-native-elements'
import axios from 'axios'


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
      medicamentoList: [{nome: 'Otoflox', quantidade: '2', unidade: 'gotas'}]
    }
    this.getData=this.getData.bind(this);
  }

  /* Fetch data from API*/
  getData() {
    axios.get('https://jsonplaceholder.typicode.com/users') // TODO: Change data source
      .then(()=> {
        this.setState({
          isLoading: false
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
                { this.state.medicamentoList.map((m) => (
                    <ListItem
                    roundAvatar
                    key={m.nome}
                    title={m.nome + '\t' + m.quantidade + ' ' + m.unidade}
                    rightElement={<View style={{flexDirection: "row"}}><Button title="SI"></Button><Button title="NO"></Button></View>}
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