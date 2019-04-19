import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import { LinearGradient } from 'expo';
import LembreteList from '../components/LembretesList'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Lembretes',
    titleStyle:{
      fontFamily: 'Verdana'
    }
  };

  render() {
    return(
      <View style ={styles.container}>
        <View style={{flex: 6, marginTop: 10}}>
          <LembreteList />
        </View>
      </View>
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