import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import CsVercelAPI from '../../../services/CsVercelAPI';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import ItensCaixaStyle from './style/ItensCaixaStyle';
import { LinearGradient } from "expo-linear-gradient";

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

  const getStyleByRarity = (rarity) => {
    if (rarity === 'Mil-Spec Grade') {
      return ItensCaixaStyle.milSpecGrade;
    } else if (rarity === 'Restricted') {
      return ItensCaixaStyle.restricted;
    } else if (rarity === 'Classified') {
      return ItensCaixaStyle.classified;
    } else if (rarity === 'Covert') {
      return ItensCaixaStyle.covert;
    } else {
      return ItensCaixaStyle.defaultStyle;
    }
  };


  return (
    <>
      <ScrollView>
        <View style={ItensCaixaStyle.header}>
          <Image source={caixa.image} style={ItensCaixaStyle.imagem} />
          <Text style={ItensCaixaStyle.caixaName}>{caixa.name}</Text>
        </View>

        <View style={ItensCaixaStyle.row}>
          {itens.map(item => (
            <LinearGradient style={ItensCaixaStyle.linearMargin} key={item.id} colors={["#848080", "#e1e1e3"]}>
              <TouchableOpacity style={[ItensCaixaStyle.container, getStyleByRarity(item.rarity)]}>
                <Image source={item.image} style={ItensCaixaStyle.skinImage} />
                <Text style={ItensCaixaStyle.skinName}>{item.name}</Text>
                <Text style={ItensCaixaStyle.skinPrice}>Preço: $100</Text>
              </TouchableOpacity>
            </LinearGradient>
          ))}

        </View>
      </ScrollView>
    </>
  )
}

export default ItensCaixa