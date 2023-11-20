import React, { useEffect, useState } from 'react'
import { Button, Text } from 'react-native-paper'
import SteamAPI from '../../../services/SteamAPI';
import { Image, Linking, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StatsPlayerStyle from './style/StatsPlayerStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';

const StatsPlayer = () => {

  const [Estatisticas, setEstatisticas] = useState([]);
  const [Kills, setKills] = useState({})
  const [Deaths, setDeaths] = useState({})
  const [CalculoKD, setCalculoKD] = useState({})
  const [TaxaHS, setTaxaHS] = useState({})
  const [HorasJogadas, setHorasJogadas] = useState({})
  const [TaxaAcerto, setTaxaAcerto] = useState({})
  const [Disparos, setDisparos] = useState({})
  const [Acertos, setAcertos] = useState({})

  //Usuario steam
  const [AccountIcon, setAccountIcon] = useState([])
  const [AccountName, setAccountName] = useState('')
  const [AccountCountry, setAccountCountry] = useState('')
  const [AccountURL, setAccountURL] = useState('')

  useEffect(() => {

    AsyncStorage.getItem('usuario').then(usuario => {

      SteamAPI.get(`/GetPlayerSummaries?idUser=` + usuario).then(resultado => {
        const resposta = resultado.data.response.players
        setAccountIcon(resposta[0].avatarfull)
        setAccountName(resposta[0].personaname)
        setAccountCountry(resposta[0].loccountrycode)
        setAccountURL(resposta[0].profileurl)
      })

      SteamAPI.get(`/GetUserStatsForGame?idUser=` + usuario).then(resultado => {
        const estats = resultado.data.playerstats.stats
        setEstatisticas(estats)
        setKills(estats[0].value)
        setDeaths(estats[1].value)
        setDisparos(estats[47].value)
        setAcertos(estats[46].value)
        setCalculoKD((estats[0].value / estats[1].value).toFixed(2))
        setTaxaHS(((estats[25].value / estats[0].value) * 100).toFixed(2))
        setHorasJogadas((estats[2].value / 3600).toFixed(2))
        setTaxaAcerto(((estats[46].value / estats[47].value) * 100).toFixed(2))
      })

    })

  }, []);

  function removerAspas(string) {
    return string.replace(/"/g, '');
  }

  function formataNumero(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  //Função para abrir o link do perfil da pessoa
  const handleOpenURL = () => {
    Linking.openURL(AccountURL);
  };

  console.log(Estatisticas)
  console.log(TaxaHS)
  console.log(TaxaAcerto)

  return (
    <>
      <ScrollView>

        <View style={StatsPlayerStyle.container_usuario}>
          <View>
            <Image style={StatsPlayerStyle.imagem_usuario} source={{ uri: AccountIcon }} />
          </View>

          <View style={StatsPlayerStyle.info_usuario}>
            <Text style={StatsPlayerStyle.nome_usuario}>{AccountName}</Text>
            <Image style={StatsPlayerStyle.pais_usuario} source={{ uri: `https://flagsapi.com/${removerAspas(AccountCountry)}/shiny/32.png` }} />
          </View>

          <View style={StatsPlayerStyle.botao_usuario}>
            <Button mode='contained' buttonColor='#184153' onPress={handleOpenURL}>
              <View style={StatsPlayerStyle.botao_conteudo}>
                <Text style={StatsPlayerStyle.botao_text}> Perfil</Text>
                <MaterialCommunityIcons name="steam" size={16} color="white" />
              </View>
            </Button>

          </View>
        </View>



        <View style={StatsPlayerStyle.principal_container}>

          <View>
            <View style={StatsPlayerStyle.horas_container}>
              <Text style={{ fontSize: 30 }}>{formataNumero(removerAspas(JSON.stringify(HorasJogadas)))}</Text>
              <Text style={{ fontSize: 18 }}>Horas de Jogo</Text>
            </View>
          </View>

          <View>
            <View style={StatsPlayerStyle.kill_death_container}>
              <View>
                <Text style={{ fontSize: 40 }}>{formataNumero(removerAspas(JSON.stringify(Kills)))}</Text>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Vitmas</Text>
              </View>

              <View style={StatsPlayerStyle.kill_death_linha}></View>

              <View>
                <Text style={{ fontSize: 40 }}>{formataNumero(removerAspas(JSON.stringify(Deaths)))}</Text>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Mortes</Text>
              </View>
            </View>

            <View style={StatsPlayerStyle.proporcao_kd_container}>
              <Text style={{ fontSize: 30 }}>{formataNumero(removerAspas(JSON.stringify(CalculoKD)))}</Text>
              <Text style={{ fontSize: 18 }}>Proporção KD</Text>
            </View>
          </View>

          

        </View>
      </ScrollView >
    </>
  )
}

export default StatsPlayer