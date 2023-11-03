import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import CsVercelAPI from '../../../services/CsVercelAPI';
import { Image, ImageBackground, ScrollView, TouchableOpacity, View } from 'react-native';
import ItensCaixaStyle from './style/ItensCaixaStyle';
import { LinearGradient } from "expo-linear-gradient";
import Loading from '../../../componentes/Loading';

const ItensCaixa = ({ navigation, route }) => {
  const [caixa, setCaixa] = useState({});
  const [itens, setItens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = route.params.id;

    // Iniciar ambas as solicitações à API
    const caixaPromise = CsVercelAPI.get(`items?id=${id}`);
    const itensPromise = CsVercelAPI.get(`items?id=${id}`);

    // Use Promise.all para esperar que ambas as solicitações sejam concluídas
    Promise.all([caixaPromise, itensPromise])
      .then(([caixaResponse, itensResponse]) => {
        setCaixa(caixaResponse.data);
        setItens(itensResponse.data.contains);
        setIsLoading(false); // Quando ambas as solicitações estiverem concluídas, defina isLoading como false
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API: ", error);
        setIsLoading(false); // Se ocorrer um erro, também defina isLoading como false
      });
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
     
     <ScrollView style={{position: 'relative', paddingHorizontal: 10}} >
      <View style={{ flex: 1, bottom: 0, right: 0, left: 0, position: 'absolute' }}>
        {isLoading ? (
          <Loading />
        ) : (
          <View>
            {/* Conteúdo principal do seu aplicativo */}
          </View>
        )}
      </View>

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
   
  );
};

export default ItensCaixa;