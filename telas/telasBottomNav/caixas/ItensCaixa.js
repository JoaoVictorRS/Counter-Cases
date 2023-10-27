import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import CsVercelAPI from '../../../services/CsVercelAPI';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import ItensCaixaStyle from './style/ItensCaixaStyle';

const ItensCaixa = ({ navigation, route }) => {

  const [caixa, setCaixa] = useState({});
  const [itens, setItens] = useState([])

  useEffect(() => {
    const id = route.params.id

    //Essa é so pra pegar informações da caixa
    CsVercelAPI.get(`items?id=${id}`).then(resultado => {
      setCaixa(resultado.data)
    })

    //Essa aqui pega os itens da caixa em questão
    CsVercelAPI.get(`items?id=${id}`).then(resultado => {
      setItens(resultado.data.contains)
    })
  }, []);

  console.log(caixa)
  console.log(itens)

  return (
    <>
      <ScrollView>
        <View style={ItensCaixaStyle.header}>
          <Image source={caixa.image} style={ItensCaixaStyle.imagem} />
          <Text style={ItensCaixaStyle}>{caixa.name}</Text>
        </View>

        {itens.map(item => (
          <TouchableOpacity style={ItensCaixaStyle.container} key={item.id}>
            <Image source={item.image} style={ItensCaixaStyle.skinImage}/>
            <Text style={ItensCaixaStyle.skinName}>Nome da Skin</Text>
            <Text style={ItensCaixaStyle.skinPrice}>Preço: $100</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  )
}

export default ItensCaixa