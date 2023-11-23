import React, { useEffect, useState } from 'react'
import { Button, Text } from 'react-native-paper'
import SteamAPI from '../../../services/SteamAPI';
import { Image, Linking, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StatsPlayerStyle from './style/StatsPlayerStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const StatsPlayer = ({ navigation }) => {

  const [Estatisticas, setEstatisticas] = useState([]);
  const [Kills, setKills] = useState({})
  const [Deaths, setDeaths] = useState({})
  const [CalculoKD, setCalculoKD] = useState({})
  const [TaxaHS, setTaxaHS] = useState({})
  const [HorasJogadas, setHorasJogadas] = useState({})
  const [Disparos, setDisparos] = useState({})
  const [KillsArmas, setKillsArmas] = useState([])

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
        setCalculoKD((estats[0].value / estats[1].value).toFixed(2))
        setTaxaHS(((estats[25].value / estats[0].value) * 100).toFixed(2))
        setHorasJogadas((estats[2].value / 3600).toFixed(2))
        setKillsArmas(estats.filter(stat => stat.name.includes('total_kills_')
          && stat.name !== 'total_kills_headshot'
          && stat.name !== 'total_kills_enemy_weapon'
          && stat.name !== 'total_kills_enemy_blinded'
          && stat.name !== 'total_kills_knife_fight'
          && stat.name !== 'total_kills_against_zoomed_sniper')
          .map(stat => ({
            name: stat.name.replace('total_kills_', '').toUpperCase(),
            value: stat.value
          })))
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
              <Text style={{ fontSize: 18 }}>Horas de Jogo</Text>
              <Text style={{ fontSize: 30 }}>{formataNumero(removerAspas(JSON.stringify(HorasJogadas)))}</Text>
            </View>
          </View>

          <View>
            <View style={StatsPlayerStyle.kill_death_container}>
              <View>
                <Text style={{ fontSize: 40, color: '#44CD28' }}>{formataNumero(removerAspas(JSON.stringify(Kills)))}</Text>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Vitmas</Text>
              </View>

              <View style={StatsPlayerStyle.kill_death_linha}></View>

              <View>
                <Text style={{ fontSize: 40, color: '#C82C2C' }}>{formataNumero(removerAspas(JSON.stringify(Deaths)))}</Text>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Mortes</Text>
              </View>
            </View>

            <View style={StatsPlayerStyle.proporcao_kd_container}>
              <Text style={{ fontSize: 30, color: CalculoKD > 1 ? 'green' : 'red' }}>{formataNumero(removerAspas(JSON.stringify(CalculoKD)))}</Text>
              <Text style={{ fontSize: 18 }}>Proporção KD</Text>
            </View>

            <View style={StatsPlayerStyle.proporcao_kd_container}>
              <Text style={{ fontSize: 30 }}>{formataNumero(removerAspas(JSON.stringify(TaxaHS)))}%</Text>
              <Text style={{ fontSize: 18 }}>Das vitmas são Headshot!</Text>
            </View>
          </View>

          <Image
            source={require('../../../imagens/csgo-headshot.png')}
            style={StatsPlayerStyle.imagem_headshot}
          />
          <View style={StatsPlayerStyle.botao_kills}>
            <Button mode='contained' onPress={() => navigation.push('stats-kills')}>Detalhamento de Combate</Button>
          </View>
        </View>
      </ScrollView >
    </>
  )
}

export default StatsPlayer