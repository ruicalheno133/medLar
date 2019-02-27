import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import { LinearGradient } from 'expo';


export default class AdministrarScreen extends React.Component {
  static navigationOptions = {
    title: 'Administrar Medicação',
    titleStyle: {
        fontFamily: 'Verdana'
    }
  };


  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#3C6478', '#3990A4']} style={{flex: 3}}>
          <View style={{flex: 1}}>

          </View>
        </LinearGradient>
        <View style={{flex: 6}}>
          <ScrollView style={styles.listContainer}>

          </ScrollView>
        </View>
      </View>
    );
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
