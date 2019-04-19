import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View} from 'react-native';
import { ListItem, Avatar, Button } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios'
import UtentesList from '../components/UtentesList'

export default class UtentesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
    title: 'Utentes',
    headerRight: (<Button
      title=""
      type="clear"
      icon={<FontAwesome name="plus" size={20} style={{color: 'black'}}/>}
      buttonStyle={{marginRight: 10}}
      titleStyle={{color:'#3990A4'}}
      onPress={() => {navigation.navigate('RegistarUtente', {getData: () => navigation.getParam('getData')()})}}
  />)
  }
  };

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      utentesList: []
    }
    this.getData=this.getData.bind(this);
  }


  /* Fetch data from API*/
  getData() {
    axios.get('http://192.168.0.105:3000/utentes') 
      .then(data => {
        this.setState({
          isLoading: false,
          utentesList: data.data
        })
      })
      .catch(err => {})
  }

  

  componentDidMount () {
    this.props.navigation.setParams({ getData: this.getData });
    this.getData()
  }

  render() {
    const toRender = this.state.isLoading ? 
                      <View style={{flex: 1, justifyContent: 'center',}}>
                        <ActivityIndicator size='large' color='#3990A4'/>
                      </View> 
                      :
                      <UtentesList navigation={this.props.navigation} utentesList={this.state.utentesList}/>

    return (
      <ScrollView style={styles.container}>  
        {toRender}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
