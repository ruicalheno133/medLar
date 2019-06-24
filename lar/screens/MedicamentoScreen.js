import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import { ListItem, Avatar, ButtonGroup, Button} from 'react-native-elements'
import { LinearGradient } from 'expo';
import axios from 'axios';
import {Linking} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import FichaMedica from '../components/FichaMedica'
import EditarFichaMedicacao from '../screens/EditarFichaMedicacaoScreen';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'; 
import TitleSection from '../components/TitleSection';
var conf = require('../myConfig.json')
var auth = require('../auth')

var dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']


var DiasSemana = [
  { bit: 1, string:'Domingo'},
  { bit: 2, string:'Segunda-Feira'},
  { bit: 4, string:'Terça-Feira'},
  { bit: 8, string:'Quarta-Feira'},
  { bit: 16, string:'Quinta-Feira'},
  { bit: 32, string:'Sexta-Feira'},
  { bit: 64, string:'Sábado'},
  ]

var PeriodosDia = [
  {bit: 1, string:'Pequeno-Almoço'},
  {bit: 2, string:'Almoço'},
  {bit: 4, string:'Lanche'},
  {bit: 8, string:'Jantar'},
  {bit: 16, string:'Ceia'}
  ]

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
      medicamentoTableData: [],
      diasSemana: DiasSemana,
      periodosDia: PeriodosDia,
    }
    this.getMedicamentoTableData=this.getMedicamentoTableData.bind(this);
    this.fetchFichaMedicacao = this.fetchFichaMedicacao.bind(this);
    this.eliminarMedicamento = this.eliminarMedicamento.bind(this);
  }

  getMedicamentoTableData(){
    var data = this.state.fichaMedicacao
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

  async fetchFichaMedicacao(cb){
    var token = await auth.getJWT();
    axios.get(`http:${conf.host}:${conf.port}/fichaMedicacao/${this.props.navigation.getParam('medicamento').idFichaMedicacao}`,{headers: {Authorization: `Bearer ${token}`}})
            .then(data => {
              this.setState({
                fichaMedicacao: data.data[0]
              },() => cb())
            })
            .catch(err => {
              console.log(err)
            })
  }

  async eliminarMedicamento(){
    var token = await auth.getJWT();
    Alert.alert(
      'Remover medicamento',
      'Tem a certeza que quer remover o medicamento?',
      [
        {
          text: 'Sim', onPress: () => {
            axios.put(`http:${conf.host}:${conf.port}/fichaMedicacao/mudarEstado/${this.props.navigation.getParam('medicamento').idFichaMedicacao}`,{},{headers: {Authorization: `Bearer ${token}`}})
            .then(data => {
              Alert.alert('Medicação removida')
              this.props.navigation.navigate('PerfilUtente', {idUtente: this.props.navigation.state.params.idUtente})

            })
            .catch(err => {
              console.log(err)
            })
          }
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ],
      {cancelable: true}
    )
  }

  componentDidMount(){
      this.fetchFichaMedicacao(() => {
        //this.getMedicamentoTableData();
        this.setState({
          isLoading: false
        })
      });

  }

  render() {
    if(this.state.isLoading){
      return null
    }
    else{
      return (
        <ScrollView style={styles.container}>
          <LinearGradient colors={['#3C6478', '#3990A4']} style={{flex: 2}}>
            <TitleSection 
              title={`${this.props.navigation.getParam('medicamento').nome} - ${this.props.navigation.getParam('medicamento').forma}`} 
              subtitle={`${this.props.navigation.getParam('medicamento').quantidade} ${this.props.navigation.getParam('medicamento').unidade}`} 
            />
          </LinearGradient>
          <View style={{flex: 6, padding: 10}}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>
                  {this.props.navigation.getParam('medicamento').nome + ' - ' + 
                  this.props.navigation.getParam('medicamento').quantidade + ' ' + 
                  this.props.navigation.getParam('medicamento').unidade
                  }
                  </Text>
              {/*
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
            */}

            <Text style={{fontSize: 15, fontWeight: '600'}}>
                Data de início:
                <Text style={{fontSize: 15, fontWeight: '100'}}> 
                { '\t\t' + this.state.fichaMedicacao.dataInicio}
                </Text>
              </Text>
            {this.state.fichaMedicacao.dataFim ?
              <Text style={{fontSize: 15, fontWeight: '600'}}>
              Data de final:
                <Text style={{fontSize: 15, fontWeight: '100'}}> 
                {'\t\t' + this.state.fichaMedicacao.dataFim}
                </Text>
              </Text>   
            :
              null       
            }


            <View style={{marginTop: 10, flex:1}}>


              { DiasSemana.map((dia,index) => {
                if((this.state.fichaMedicacao.dias & dia.bit ) !== 0){
                  return (
                    <View key={index}>
                      <Text key={index} style={{fontSize:15,fontWeight:'800'}}>{dia.string}</Text>
                      <View key={100-index} style={{flexDirection:'row', flexWrap:'wrap'}}>
                      {
                      PeriodosDia.map((periodo, index) => {
                        if((this.state.fichaMedicacao.periodosDia & periodo.bit) !== 0){
                          return(
                            <View key={index} style={{paddingLeft:4, paddingTop:5  ,width:'auto'}}>
                              <Text key={index} style={{backgroundColor:'#cfdffc',padding:5, textAlign:'center'}}>{periodo.string}</Text>
                            </View>
                          )
                        }
                      })}
                      </View>
                    </View>
                  )
                }
              })}
            </View>

              <View style={{flexDirection:'row',justifyContent:'space-around', paddingTop:10, paddingLeft:10}}>
                  <Button
                      title="Remover"
                      type="outline"
                      onPress={this.eliminarMedicamento}
                      icon={<FontAwesome name="edit" size={20} style={{color: '#3990A4'}}/>}
                      buttonStyle={{borderRadius: 70, borderColor: '#3990A4'}}
                      titleStyle={{color:'#3990A4'}}
                  />
                  <Button
                      title="Editar"
                      type="outline"
                      onPress={() => this.props.navigation.navigate('EditarFichaMedicacao',{fichaMedicacao:this.state.fichaMedicacao,idUtente: this.props.navigation.state.params.idUtente})}
                      icon={<FontAwesome name="edit" size={20} style={{color: '#3990A4'}}/>}
                      buttonStyle={{borderRadius: 70, borderColor: '#3990A4'}}
                      titleStyle={{color:'#3990A4'}}
                  />
              </View>

            
          </View>
        </ScrollView>
      );
    }
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

