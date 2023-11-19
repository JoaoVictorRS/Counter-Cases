import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import SteamAPI from '../../../services/SteamAPI';
import { ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StatsPlayer = () => {

  const [Estatisticas, setEstatisticas] = useState([]);
  const [CalculoKD, setCalculoKD] = useState({})
  const [TaxaHS, setTaxaHS] = useState({})
  const [HorasJogadas, setHorasJogadas] = useState({})
  const [TaxaAcerto, setTaxaAcerto] = useState({})

  useEffect(() => {

    AsyncStorage.getItem('usuario').then(usuario=>{

      SteamAPI.get(`/GetUserStatsForGame?idUser=` + usuario).then(resultado => {
        const estats = resultado.data.playerstats.stats
        setEstatisticas(estats)
        setCalculoKD((estats[0].value / estats[1].value).toFixed(2))
        setTaxaHS(((estats[25].value / estats[0].value ) * 100).toFixed(2))
        setHorasJogadas((estats[2].value / 3600).toFixed(2))
        setTaxaAcerto(((estats[46].value / estats[47].value) * 100).toFixed(2))
      })
      
    })
    
  }, []);

  console.log(Estatisticas)
  console.log(CalculoKD)
  console.log(TaxaHS)
  console.log(HorasJogadas)
  console.log(TaxaAcerto)

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