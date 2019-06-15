import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { ListItem, Avatar, ButtonGroup, Button} from 'react-native-elements'
import { LinearGradient } from 'expo';
import axios from 'axios';
import {Linking} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import FichaMedica from '../components/FichaMedica'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'; 
var conf = require('../myConfig.json')
var auth = require('../auth')

var dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']

/**
 * 
 * Screen de adminsitração de medicação (a determinado utente)
 * 
 * Composto por:
 *  informação pessoal do utente
 *  medicamentos a administrar
 * 
 */
export default class MedicamentoScreen extends React.Component {
  static navigationOptions = {
    title: 'Medicamento',
    titleStyle: {
        fontFamily: 'Verdana'
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      medicamentoTableData: []
    }
    this.getMedicamentoTableData=this.getMedicamentoTableData.bind(this);
  }

  getMedicamentoTableData(){
    var data = this.props.navigation.getParam('medicamento')
    var matriz = [[0,0,0,0,0],[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]]
        for (i = 0; i < 5; i++) {
            for (j=0; j < 7; j++) {
                if (data.dias & Math.pow(2, j) && data.periodosDia & Math.pow(2, i)) {
                  matriz[j][i] = 1
                } 
              }
            }
    console.log(matriz)
    this.setState({medicamentoTableData: matriz})
  }

  componentDidMount(){
      this.getMedicamentoTableData();

  }

  render() {
    
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#3C6478', '#3990A4']} style={{flex: 2}}>
          <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Avatar 
            rounded
            size='large'
            imageProps={{resizeMode: 'cover'}}
            containerStyle={{borderRadius: 100}}
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
            />
            </View>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text style={{color:'white', fontSize: 20, fontWeight: '800'}}>{this.props.navigation.getParam('utente').nome}</Text>
                </View>
        </LinearGradient>
        <View style={{flex: 6, padding: 10}}>
            <Text style={{fontSize: 15, fontWeight: '600'}}>
                {this.props.navigation.getParam('medicamento').nome + ' - ' + 
                 this.props.navigation.getParam('medicamento').quantidade + ' ' + 
                 this.props.navigation.getParam('medicamento').unidade
                }
                </Text>
            <Table>
            <Row data={['', 'Pequeno Almoço', 'Almoço', 'Lanche', 'Jantar', 'Ceia']} flexArr={[1,1,1,1,1,1]} style={styles.head} textStyle={styles.text}/>
            
            {
            
            this.state.medicamentoTableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                <Cell key={0} data={dias[index]} textStyle={styles.text} />
                {
                  rowData.map((cellData, cellIndex) => (
                  <Cell key={cellIndex + 1} data={cellData === 1 && <FontAwesome name="check" size={20} style={{color: 'green', textAlign: 'center'}} /> } textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
          </Table>

          <Text style={{fontSize: 15, fontWeight: '600'}}>
              de: 
              <Text style={{fontSize: 15, fontWeight: '100'}}> 
              { '\t\t' + this.props.navigation.getParam('medicamento').dataInicio}
              </Text>
            </Text>
          <Text style={{fontSize: 15, fontWeight: '600'}}>
              até: 
              <Text style={{fontSize: 15, fontWeight: '100'}}> 
              {'\t\t' + this.props.navigation.getParam('medicamento').dataFim}
              </Text>
          </Text>

            <View style={{alignItems:'center', marginTop: 10, position:'absolute', bottom: 10, right:10, zIndex: 1}}>
                <Button
                    title="Editar"
                    type="outline"
                    icon={<FontAwesome name="edit" size={20} style={{color: '#3990A4'}}/>}
                    buttonStyle={{borderRadius: 70, borderColor: '#3990A4'}}
                    titleStyle={{color:'#3990A4'}}
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
  },
  listContainer: {
    flex: 1
  },
  verticaCenter: {
    textAlignVertical: 'center'
  },
  containerTable: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 4, alignItems:'center', textAlign: 'center' },
  row: { flexDirection: 'row', backgroundColor: 'white' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});

