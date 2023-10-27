import React, { useEffect, useState } from 'react'
import { Image, ScrollView, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import CsAPI from '../../../services/CsAPI';
import { View } from 'react-native';
import CaixasStyle from './style/CaixasStyle';

const Caixas = ({ navigation }) => {

  const [caixas, setCaixas] = useState([]);

  useEffect(() => {
    CsAPI.get('/crates/cases.json').then(resultado => {
      setCaixas(resultado.data)
    })
  }, []);
  
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

