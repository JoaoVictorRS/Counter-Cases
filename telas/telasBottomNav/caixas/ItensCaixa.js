import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import CsVercelAPI from '../../../services/CsVercelAPI';
import { Image, ImageBackground, ScrollView, TouchableOpacity, View } from 'react-native';
import ItensCaixaStyle from './style/ItensCaixaStyle';
import { LinearGradient } from "expo-linear-gradient";
import Loading from '../../../componentes/Loading';
import axios from 'axios';

const ItensCaixa = ({ navigation, route }) => {
  const [caixa, setCaixa] = useState({});
  const [itens, setItens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = route.params.id;

    const formatItemNameForURL = (itemName) => {
      return encodeURIComponent(itemName); // Codifica o nome para ser usado na URL
    };

    const fetchItemPrices = async (items) => {
      const pricePromises = items.map(async (item) => {
        try {
          const formattedItemName = formatItemNameForURL(item.name);
          const response = await axios.get(`http://localhost:3000/ItemPrice?market_hash_name=${formattedItemName}`, {
            timeout: 10000, // Definindo timeout para 10 segundos
          });
          return { ...item, price: response.data };
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Requisição cancelada:', error.message);
          } else if (error.code === 'ECONNABORTED') {
            console.error('Timeout da requisição:', error);
          } else {
            console.error('Erro ao buscar preço do item:', error);
          }
          // Retornar o item com os dados disponíveis mesmo em caso de falha na requisição de preço
          return { ...item, price: { median_price: 'N/A' } };
        }
      });
  
      return Promise.all(pricePromises);
    };
  
    const fetchData = async () => {
      try {
        const [caixaResponse, itensResponse] = await Promise.all([
          CsVercelAPI.get(`items?id=${id}`),
          CsVercelAPI.get(`items?id=${id}`),
        ]);
  
        setCaixa(caixaResponse.data);
        const itemsData = itensResponse.data.contains;
  
        const itemsWithPrices = await fetchItemPrices(itemsData);
  
        setItens(itemsWithPrices);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        setIsLoading(false);
      }
    };
  
    fetchData();

    // Iniciar ambas as solicitações à API
    const caixaPromise = CsVercelAPI.get(`items?id=${id}`);
    const itensPromise = CsVercelAPI.get(`items?id=${id}`);

    // Use Promise.all para esperar que ambas as solicitações sejam concluídas
   // Adicionando uma terceira solicitação para obter os preços das skins
   const precosPromise = axios.get('http://localhost:3000/ItemPrice?market_hash_name=');

   // Use Promise.all para esperar que todas as solicitações sejam concluídas
   Promise.all([caixaPromise, itensPromise, precosPromise])
     .then(([caixaResponse, itensResponse, precosResponse]) => {
       setCaixa(caixaResponse.data);
       const itensComPrecos = itensResponse.data.contains.map(item => {
         const precoItem = precosResponse.data.find(preco => preco.itemId === item.id);
         return { ...item, price: precoItem ? precoItem.price : null };
       });
       setItens(itensComPrecos);
       setIsLoading(false);
     })
     .catch((error) => {
       console.error("Erro ao buscar dados da API: ", error);
       setIsLoading(false);
     });
 }, [route.params.id]);

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

      <ScrollView style={{ position: 'relative', paddingHorizontal: 10 }} >
        <View style={{ flex: 1, bottom: 0, right: 0, left: 0,top: '125%', position: 'absolute' }}>
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
                {item.price && (
                  <Text style={ItensCaixaStyle.skinPrice}>Preço: {item.price.median_price ? item.price.median_price : item.price.lowest_price}</Text>
                )}
              </TouchableOpacity>

            </LinearGradient>
          ))}
        </View>
      </ScrollView>
    </>

  );
};

export default ItensCaixa;
