import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import SteamAPI from '../../../services/SteamAPI';
import { Image, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StatsPlayerStyle from './style/StatsPlayerStyle';

const StatsPlayer = () => {

  const [Estatisticas, setEstatisticas] = useState([]);
  const [AccountIcon, setAccountIcon] = useState([])
  const [AccountName, setAccountName] = useState('')
  const [AccountCountry, setAccountCountry] = useState('')
  const [CalculoKD, setCalculoKD] = useState({})
  const [TaxaHS, setTaxaHS] = useState({})
  const [HorasJogadas, setHorasJogadas] = useState({})
  const [TaxaAcerto, setTaxaAcerto] = useState({})

  useEffect(() => {

    AsyncStorage.getItem('usuario').then(usuario => {

      SteamAPI.get(`/GetPlayerSummaries?idUser=` + usuario).then(resultado => {
        const resposta = resultado.data.response.players
        setAccountIcon(resposta[0].avatarfull)
        setAccountName(resposta[0].personaname)
        setAccountCountry(resposta[0].loccountrycode)
      })

      SteamAPI.get(`/GetUserStatsForGame?idUser=` + usuario).then(resultado => {
        const estats = resultado.data.playerstats.stats
        setEstatisticas(estats)
        setCalculoKD((estats[0].value / estats[1].value).toFixed(2))
        setTaxaHS(((estats[25].value / estats[0].value) * 100).toFixed(2))
        setHorasJogadas((estats[2].value / 3600).toFixed(2))
        setTaxaAcerto(((estats[46].value / estats[47].value) * 100).toFixed(2))
      })

    })

  }, []);

  const countryFormatted = AccountCountry.trim().replace(/"/g, '');

  function removerAspas(string) {
    return string.replace(/"/g, '');
  }

  console.log(Estatisticas)
  console.log(CalculoKD)
  console.log(TaxaHS)
  console.log(HorasJogadas)
  console.log(TaxaAcerto)
  console.log(AccountCountry)

  return (
    <>
      <ScrollView>

        <View style={StatsPlayerStyle.container_usuario}>
          <View>
            <Image style={StatsPlayerStyle.imagem_usuario} source={{ uri: AccountIcon }} />
          </View>

          <View style={StatsPlayerStyle.info_usuario}>
            <Text style={StatsPlayerStyle.nome_usuario}>{AccountName}</Text>
            <Image style={StatsPlayerStyle.pais_usuario} source={{ uri: `https://flagsapi.com/${countryFormatted}/shiny/32.png` }} />
          </View>
        </View>

        <View>
          <Text>Calculo KD: {removerAspas(JSON.stringify(CalculoKD))}</Text>
        </View>
      </ScrollView >
    </>
  )
}

export default StatsPlayer