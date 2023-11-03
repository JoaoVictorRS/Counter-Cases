import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import SteamAPI from '../../../services/SteamAPI';
import { ScrollView, View } from 'react-native';

const StatsPlayer = () => {

  const [Estatisticas, setEstatisticas] = useState([]);
  const [Calculo, setCalculo] = useState({})

  useEffect(() => {
    SteamAPI.get(`/GetUserStatsForGame`).then(resultado => {
      const estats = resultado.data.playerstats.stats
      setEstatisticas(estats)
      setCalculo(estats[0].value / estats[1].value)
    })
  }, []);

  useEffect(() => {
  }, [])

  console.log(Estatisticas)

  console.log(Calculo)

  return (
    <>
      <ScrollView>
        <View>
          {Estatisticas.map(item => (
            <Text key={item.name}>{item.name} : {item.value}</Text>
          ))}
        </View>
      </ScrollView >
    </>
  )
}

export default StatsPlayer