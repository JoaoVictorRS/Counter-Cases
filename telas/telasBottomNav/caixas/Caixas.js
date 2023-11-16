import React, { useEffect, useState } from 'react'
import { Image, ScrollView, TouchableOpacity } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import CsAPI from '../../../services/CsAPI';
import { View } from 'react-native';
import CaixasStyle from './style/CaixasStyle';

const Caixas = ({ navigation, route }) => {


  const [caixas, setCaixas] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');

  useEffect(() => {
    CsAPI.get('/crates/cases.json').then((resultado) => {
      setCaixas(resultado.data);
    });
  }, []);

  const filtrarCaixas = () => {
    return caixas.filter((item) =>
      item.name.toLowerCase().includes(termoPesquisa.toLowerCase())
    );
  };

  return (
    <>
      <ScrollView style={{ padding: 10}}>

      <TextInput
            style={[{ alignSelf: 'center', justifyContent:"center",flex: 1, }]}
            placeholder="Procurar..."
            mode=''
            onChangeText={(texto) => setTermoPesquisa(texto)}
          />

        <View style={CaixasStyle.container}>
         
          {filtrarCaixas().map((item) => (
            <TouchableOpacity
              key={item.id}
              style={CaixasStyle.card}
              onPress={() =>
                navigation.push('itens-caixa', { id: item.id })
              }
            >
              <Image source={item.image} style={CaixasStyle.image} />
              <Text style={CaixasStyle.name}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Caixas

