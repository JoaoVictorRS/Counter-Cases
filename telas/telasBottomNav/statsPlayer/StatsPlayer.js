import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import SteamAPI from '../../../services/SteamAPI';

const StatsPlayer = () => {

  const [Estatisticas, setEstatisticas] = useState([]);

  useEffect(() => {
    SteamAPI.get(`/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&steamid=${idUser}`).then(resultado => {
      setEstatisticas(resultado.data)
    })
  }, []);

  console.log(Estatisticas)

  return (
    <>
        <Text>PAGINA STATUS</Text>
    </>
  )
}

export default StatsPlayer