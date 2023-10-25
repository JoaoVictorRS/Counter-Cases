import React, { useEffect, useState } from 'react'
import { Image, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import CsAPI from '../../../services/CsAPI';
import { View } from 'react-native';
import CaixasStyles from './style/CaixasStyle';

const Caixas = ({ navigation }) => {

  const [caixas, setCaixas] = useState([]);

  useEffect(() => {
    CsAPI.get('/crates/cases.json').then(resultado => {
      setCaixas(resultado.data)
    })
  }, []);

  console.log(caixas)
  return (
    <>
      <ScrollView>
        <View style={CaixasStyles.container}>

          {caixas.map(item => (
            <View key={item.id} style={CaixasStyles.card}>
              <Image source={item.image} style={CaixasStyles.image} />
              <Text style={CaixasStyles.name}>{item.name}</Text>
            </View>
          ))}

        </View>
      </ScrollView >
    </>
  )
}

export default Caixas

