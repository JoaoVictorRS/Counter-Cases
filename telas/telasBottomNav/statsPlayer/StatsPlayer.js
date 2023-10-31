import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import SteamAPI from '../../../services/SteamAPI';
import { ScrollView, View } from 'react-native';

const StatsPlayer = () => {

  const [Estatisticas, setEstatisticas] = useState([]);

  useEffect(() => {
    SteamAPI.get(`/GetUserStatsForGame`).then(resultado => {
      setEstatisticas(resultado.data.playerstats.stats)
    })
  }, []);

  console.log(Estatisticas)

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