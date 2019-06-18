import React from 'react';
import { ScrollView, StyleSheet, Text,ActivityIndicator, View, FlatList} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Button} from 'react-native-elements'
import axios from 'axios';
import LembreteList from '../components/LembretesList'
var jwtDecode = require('jwt-decode');
var conf = require('../myConfig.json')
var auth = require('../auth')

export default class LembretesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
    title: 'Lembretes',
    headerRight: (<Button
      title=""
      type="clear"
      icon={<FontAwesome name="plus" size={20} style={{color: 'black'}}/>}
      buttonStyle={{marginRight: 10}}
      titleStyle={{color:'#3990A4'}}
      onPress={() => {navigation.navigate('CriarLembrete', {getData: () => navigation.getParam('getData')()})}}
  />)
  }
  };

  constructor(props){
    super(props);
    this.state = {
        isLoading : true,
        lembretesList : []
    };
    this.getData=this.getData.bind(this);
}

/* Fetch Data from API*/
async getData() {
  try {
    var token = await auth.getJWT() // Get token
    var decoded = await jwtDecode(token);
  }
  catch (e) {}
  axios.get(`http://${conf.host}:${conf.port}/lembretes/utente/${decoded.user.idFuncionario}`,
            { headers: { Authorization: 'Bearer ' + token }}) // Atenção: é preciso ir buscar o idFuncionário a alguma lado (jwt?)
        .then(data => {
            this.setState({
                isLoading: false,
                lembretesList: data.data
            })
        })
        .catch(err => {})

}

componentDidMount(){
  this.props.navigation.setParams({ getData: this.getData });
  this.getData();
}

  render() {
    const toRender = this.state.isLoading ? 
    <View style={{flex: 1, justifyContent: 'center',}}>
<ActivityIndicator size='large' color='#3990A4'/>
</View> 
:
        <View style ={styles.container}>
        <View style={{flex: 6, marginTop: 10}}>
          <LembreteList navigation={this.props.navigation} lembretesList={this.state.lembretesList}/>
        </View>
      </View> 


    return (
      <ScrollView style={styles.container}>  
        {toRender}
      </ScrollView>
    )
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