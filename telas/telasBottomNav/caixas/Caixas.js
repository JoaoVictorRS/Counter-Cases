import React, { useEffect, useState } from 'react'
import { Image, ScrollView, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import CsAPI from '../../../services/CsAPI';
import { View } from 'react-native';
import CaixasStyle from './style/CaixasStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Caixas = ({ navigation }) => {

  const [caixas, setCaixas] = useState([]);

  useEffect(() => {
    CsAPI.get('/crates/cases.json').then(resultado => {
      setCaixas(resultado.data)
    })
  }, []);

  async function ChamaID() {
    try {
      const dados = await AsyncStorage.getItem('usuario'); // Substitua 'chave' pelo nome da chave que você quer recuperar
      if (dados !== null) {
        const dadosParseados = JSON.parse(dados); // Converter a string JSON em um objeto JavaScript
        if (Array.isArray(dadosParseados) && dadosParseados.length > 0) {
          const usuario = dadosParseados[0].usuario;
          if (usuario !== undefined) {
            return usuario;
          }
        }
      }
      return null; // Retornar nulo se os dados ou o item "usuario" não foram encontrados
    } catch (error) {
      throw error; // Rejeita a Promise e propaga o erro
    }
  }

  console.log(ChamaID()
    .then((valor) => {
      if (valor !== null) {
        console.log(valor);
      } else {
        console.log('A chave não existe no AsyncStorage');
      }
    })
    .catch((error) => {
      console.error('Erro ao recuperar dados:', error);
    }))

  return (
    <>
      <ScrollView>
        <View style={CaixasStyle.container}>

          {caixas.map(item => (
            <TouchableOpacity key={item.id} style={CaixasStyle.card} onPress={() => navigation.push('itens-caixa', { id: item.id })}>
              <Image source={item.image} style={CaixasStyle.image} />
              <Text style={CaixasStyle.name}>{item.name}</Text>
            </TouchableOpacity>
          ))}

        </View>
      </ScrollView >
    </>
  )
}

export default Caixas

