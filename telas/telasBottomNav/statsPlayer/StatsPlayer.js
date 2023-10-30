import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import SteamAPI from '../../../services/SteamAPI';

const StatsPlayer = () => {

  const [Estatisticas, setEstatisticas] = useState([]);

  useEffect(() => {
    SteamAPI.get(`/GetUserStatsForGame`).then(resultado => {
      setEstatisticas(resultado.data.playerstats)
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