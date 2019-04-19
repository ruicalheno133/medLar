import React from 'react';
import { ScrollView, StyleSheet , Picker, Text, TextInput, View} from 'react-native';
import TitleSection from '../components/TitleSection';

export default class ObservacoesScreen extends React.Component {
  static navigationOptions = {
    title: 'Observações',
  };

  render() {
    return (
      <View style={styles.container}>
      <View style={{flex:1}}>
      <TitleSection title={"Medicamento"}/>
      </View>
      <View style={{flex:3, padding: 10}}>
      <Text style={{ fontSize: 20, fontWeight: '400' }}>Adicione observações:</Text>
        <View style={{margin: 5, borderBottomWidth: 1, borderBottomColor:'#d3d3d3'}}>
        <Picker
            selectedValue={"def"}
            tyle={{height: 50, width: '100%', borderColor:'grey', borderWidth:5}}
            onValueChange={(itemValue, itemIndex) => {}}
        >
            <Picker.Item label="Selecione a causa" value="def" />
            <Picker.Item label="Recusou" value="rec" />
            <Picker.Item label="Estava em jejum" value="jej" />
        </Picker>
        </View>


        <Text style={{ fontSize: 20, fontWeight: '400' }}>Outro:</Text>
        <View style={{margin: 5, borderWidth: 1, borderColor:'#d3d3d3', borderRadius:5
    }}>
        <TextInput
            multiline = {true}
            numberOfLines = {4}
            editable = {true}
            maxLength = {50}
            placeholder="Outra causa..."
            style={{textAlignVertical: 'top', padding: 5}}
      />
        </View>
 
      </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
