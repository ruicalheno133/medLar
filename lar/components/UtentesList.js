import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import axios from 'axios'
 
/**
 * 
 * Componente que apresenta a lista de utentes
 * do lar
 * 
 * Cada item é composto pelo nome e id do utente.
 * 
 */
class UtentesList extends React.Component {

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
    axios.get('http://192.168.1.87:3000/utentes') 
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
                    leftAvatar={<Avatar rounded source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}} />}
                    key={l.idUtente}
                    title={l.nome}
                    subtitle={'' + l.idUtente}
                    chevron
                    onPress={() => this.props.navigation.navigate('PerfilUtente', {idUtente: l.idUtente})}
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

export default UtentesList;