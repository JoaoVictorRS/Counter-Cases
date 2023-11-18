import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import SteamAPI from '../../../services/SteamAPI';
import { ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StatsPlayer = () => {

  const [Estatisticas, setEstatisticas] = useState([]);
  const [CalculoKD, setCalculoKD] = useState({})
  const [TaxaHS, setTaxaHS] = useState({})

  useEffect(() => {

    AsyncStorage.getItem('usuario').then(usuario=>{

      SteamAPI.get(`/GetUserStatsForGame?idUser=` + usuario).then(resultado => {
        const estats = resultado.data.playerstats.stats
        setEstatisticas(estats)
        setCalculoKD(estats[0].value / estats[1].value)
        setTaxaHS(estats[0].value / estats[25])
      })
      
    })
    
  }, []);

  console.log(Estatisticas)
  console.log(CalculoKD)

  return (
    <>
      <ScrollView>
        <View>
          {Estatisticas.map(item => (
            <Text key={item.name}>{item.name} : {item.value}</Text>
            
          ))}
          <Text>Calculo KD: {JSON.stringify(CalculoKD)}</Text>
        </View>
      </ScrollView >
    </>
  )
}

export default StatsPlayer