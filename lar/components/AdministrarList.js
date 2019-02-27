import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View} from 'react-native';
import { ListItem } from 'react-native-elements'
import axios from 'axios'

class AdministrarList extends React.Component {
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
    axios.get('https://jsonplaceholder.typicode.com/users') // TODO: Change data source
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
                    roundAvatar
                    key={l.id}
                    title={'Medicar ' + l.name}
                    subtitle={'id: '  + l.id}
                    chevron
                    onPress={() => this.props.navigation.navigate('Administrar')}
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

export default AdministrarList;