import React, { useEffect, useState } from 'react'
import { Button, Divider, Text } from 'react-native-paper'
import SteamAPI from '../../../services/SteamAPI';
import { Image, Linking, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StatsPlayerStyle from './style/StatsPlayerStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StatsKillsStyle from './style/StatsKillsStyle';

const StatsPlayer = ({ navigation }) => {

  const [Estatisticas, setEstatisticas] = useState([]);
  const [Kills, setKills] = useState({})
  const [Deaths, setDeaths] = useState({})
  const [CalculoKD, setCalculoKD] = useState({})
  const [HorasJogadas, setHorasJogadas] = useState({})
  const [KillsArmas, setKillsArmas] = useState([])
  const [ArmaMaisUsada, setArmaMaisUsada] = useState({})
  const [TotalVitorias, setTotalVitorias] = useState({})
  const [MapaMaisVitorias, setMapaMaisVitorias] = useState({})
  const [TotalMVP, setTotalMVP] = useState({})

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
        setCalculoKD((estats[0].value / estats[1].value).toFixed(2))
        setHorasJogadas((estats[2].value / 3600).toFixed(2))
        setTotalVitorias(estats[5].value)
        setTotalMVP(estats[102].value)

        // Este bloco filtra os registros para apenas os 'total_wins_(nome do mapa)' sejam armazenados na constante
        const mapaComMaisVitorias = estats.filter(stat => stat.name.includes('total_wins_map_')
          && stat.name !== 'total_wins_pistolround'
        ).map(stat => ({
          name: stat.name.replace('total_wins_map_', '').toUpperCase(),
          value: stat.value
        }));

        // Esse encontra a arma com mais kills
        if (mapaComMaisVitorias.length > 0) {
          const mapasOrdenados = [...mapaComMaisVitorias].sort((a, b) => b.value - a.value);
          setMapaMaisVitorias(mapasOrdenados[0]);
        }


        // Este bloco filtra os registros para apenas os 'total_kills_(nome da arma)' sejam armazenados na constante
        const killsPorArma = estats.filter(stat => stat.name.includes('total_kills_')
          && stat.name !== 'total_kills_headshot'
          && stat.name !== 'total_kills_enemy_weapon'
          && stat.name !== 'total_kills_enemy_blinded'
          && stat.name !== 'total_kills_knife_fight'
          && stat.name !== 'total_kills_against_zoomed_sniper'
        ).map(stat => ({
          name: stat.name.replace('total_kills_', '').toUpperCase(),
          value: stat.value
        }));
        setKillsArmas(killsPorArma);

        // Esse encontra a arma com mais kills
        if (killsPorArma.length > 0) {
          const killsOrdenadas = [...killsPorArma].sort((a, b) => b.value - a.value);
          setArmaMaisUsada(killsOrdenadas[0]);
        }


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

  //Imagens das armas com base no nome
  const imagensArmas = {
    AK47: require('../../../imagens/rifles/CS2_AK-47_Inventory.webp'),
    AWP: require('../../../imagens/sniper/CS2_AWP_Inventory.webp'),
    M4A1: require('../../../imagens/rifles/CS2_M4A4_Inventory.webp'),
    HKP2000: require('../../../imagens/pistols/CS2_USP-S_Inventory.webp'),
    DEAGLE: require('../../../imagens/pistols/CS2_Desert_Eagle_Inventory.webp'),
    UMP45: require('../../../imagens/smg/CS2_UMP-45_Inventory.webp'),
    GLOCK: require('../../../imagens/pistols/CS2_Glock-18_Inventory.webp'),
    MP9: require('../../../imagens/smg/CS2_MP9_Inventory.webp'),
    SSG08: require('../../../imagens/sniper/CS2_SSG_08_Inventory.webp'),
    NOVA: require('../../../imagens/shotguns/CS2_Nova_Inventory.webp'),
    P25: require('../../../imagens/pistols/CS2_P250_Inventory.webp'),
    P90: require('../../../imagens/smg/CS2_P90_Inventory.webp'),
    MAC10: require('../../../imagens/smg/CS2_MAC-10_Inventory.webp'),
    FAMAS: require('../../../imagens/rifles/CS2_FAMAS_Inventory.webp'),
    MP7: require('../../../imagens/smg/CS2_MP7_Inventory.webp'),
    KNIFE: require('../../../imagens/CS2_CT_knife.webp'),
    FIVESEVEN: require('../../../imagens/pistols/CS2_Five-SeveN_Inventory.webp'),
    TEC9: require('../../../imagens/pistols/CS2_Tec-9_Inventory.webp'),
    AUG: require('../../../imagens/rifles/CS2_AUG_Inventory.webp'),
    GALILAR: require('../../../imagens/rifles/CS2_Galil_AR_Inventory.webp'),
    XM1014: require('../../../imagens/shotguns/CS2_XM1014_Inventory.webp'),
    BIZON: require('../../../imagens/smg/CS2_PP-Bizon_Inventory.webp'),
    SG556: require('../../../imagens/rifles/CS2_SG_553_Inventory.webp'),
    NEGEV: require('../../../imagens/machine_gun/CS2_Negev_Inventory.webp'),
    M249: require('../../../imagens/machine_gun/CS2_M249_Inventory.webp'),
    MAG7: require('../../../imagens/shotguns/CS2_MAG-7_Inventory.webp'),
    SAWEDOFF: require('../../../imagens/shotguns/CS2_Sawed-Off_Inventory.webp'),
    ELITE: require('../../../imagens/pistols/CS2_Dual_Berettas_Inventory.webp'),
    G3SG1: require('../../../imagens/sniper/CS2_G3SG1_Inventory.webp'),
    SCAR20: require('../../../imagens/sniper/CS2_SCAR-20_Inventory.webp'),
    HEGRANADE: require('../../../imagens/Hegrenadehud_csgo.webp'),
    MOLOTOV: require('../../../imagens/Molotovhud.webp'),
    TASER: require('../../../imagens/CS2Taserhud.webp'),
  };

  //Imagens dos mapas com base no nome
  const imagensMapas = {
    CS_ASSAULT: require('../../../imagens/maps/Cs_assault_go.webp'),
    CS_ITALY: require('../../../imagens/maps/Cs2_italy.webp'),
    CS_OFFICE: require('../../../imagens/maps/Cs2_office.webp'),
    DE_CBBLE: require('../../../imagens/maps/De_cbble_s2.webp'),
    DE_DUST2: require('../../../imagens/maps/Cs2_dust2.webp'),
    DE_DUST: require('../../../imagens/maps/Csgo-de-dust.webp'),
    DE_INFERNO: require('../../../imagens/maps/Cs2_inferno_remake.webp'),
    DE_NUKE: require('../../../imagens/maps/De_nuke_cs2.webp'),
    DE_TRAIN: require('../../../imagens/maps/De_train_cs2.webp'),
    DE_BANK: require('../../../imagens/maps/Csgo-de-bank.webp'),
    DE_VERTIGO: require('../../../imagens/maps/De_vertigo_cs2.webp'),
    DE_LAKE: require('../../../imagens/maps/De_lake_cs2.webp'),
    DE_SAFEHOUSE: require('../../../imagens/maps/Csgo-de-safehouse.webp'),
    DE_SHORTTRAIN: require('../../../imagens/maps/De_train_cs2.webp')
  }

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
                <Text style={{ fontSize: 40, color: 'green' }}>{formataNumero(removerAspas(JSON.stringify(Kills)))}</Text>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Vitmas</Text>
              </View>

              <View style={StatsPlayerStyle.kill_death_linha}></View>

              <View>
                <Text style={{ fontSize: 40, color: 'red' }}>{formataNumero(removerAspas(JSON.stringify(Deaths)))}</Text>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Mortes</Text>
              </View>
            </View>

            <View style={StatsPlayerStyle.proporcao_kd_container}>
              <Text style={{ fontSize: 30, color: CalculoKD > 1 ? 'green' : 'red' }}>{formataNumero(removerAspas(JSON.stringify(CalculoKD)))}</Text>
              <Text style={{ fontSize: 18 }}>Proporção KD</Text>
            </View>
          </View>



          <View style={StatsPlayerStyle.view_arma_mais_usada}>
            <Text style={{ fontSize: 26, textAlign: 'center', fontWeight: 'bold' }}>Arma mais usada</Text>

            {/* A atrocidade cometida abaixo serve para não dar problema quando o dado chegar dps do carregamento */}
            {ArmaMaisUsada.name && imagensArmas[ArmaMaisUsada.name] ? (
              <Image
                source={imagensArmas[ArmaMaisUsada.name]}
                style={StatsKillsStyle.imagem_arma_mais_usada}
              />
            ) : (
              <Text>Nenhuma imagem disponível para esta arma</Text>
            )
            }

            {ArmaMaisUsada.name && imagensArmas[ArmaMaisUsada.name] ? (
              <Text style={{ fontSize: 18 }}>Sua arma favorita é a
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}> {removerAspas(JSON.stringify(ArmaMaisUsada.name))}</Text> com <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{formataNumero(JSON.stringify(ArmaMaisUsada.value))}</Text> kills
              </Text>
            ) : (
              <></>
            )
            }
            {/* Meu deus que horror */}
          </View>
          <View style={StatsPlayerStyle.botao_kills}>
            <Button mode='contained' onPress={() => navigation.push('stats-kills')}>Detalhes de Combate</Button>
          </View>



          <Divider style={{ marginHorizontal: '5%' }} />



          <View style={StatsPlayerStyle.view_vitorias_mvp}>
            <View style={StatsPlayerStyle.view_vitorias}>
              <Text style={{ fontSize: 25 }}>Rounds Ganhos</Text>
              <Text style={{ fontSize: 35 }}>{formataNumero(JSON.stringify(TotalVitorias))}</Text>
            </View>

            <Divider style={{ marginHorizontal: '30%' }} />

            <View style={StatsPlayerStyle.view_mvp}>
              <Text style={{ fontSize: 25 }}>{formataNumero(JSON.stringify(TotalMVP))}</Text>
              <Text style={{ fontSize: 20 }}><MaterialCommunityIcons name="star" size={20} color="black" /> Vezes que foi MVP <MaterialCommunityIcons name="star" size={20} color="black" /></Text>
            </View>
          </View>

          <View style={StatsPlayerStyle.view_mapa_mais_jogado}>
            <Text style={{ fontSize: 26, textAlign: 'center', fontWeight: 'bold' }}>Seu melhor mapa</Text>

            {/* A atrocidade cometida abaixo serve para não dar problema quando o dado chegar dps do carregamento */}
            {MapaMaisVitorias.name && imagensMapas[MapaMaisVitorias.name] ? (
              <Image
                source={imagensMapas[MapaMaisVitorias.name]}
                style={StatsPlayerStyle.imagem_mapa_mais_jogado}
              />
            ) : (
              <Text>Nenhuma imagem disponível para esta arma</Text>
            )
            }

            {MapaMaisVitorias.name && imagensMapas[MapaMaisVitorias.name] ? (
              <Text style={{ fontSize: 18 }}>Seu mapa com mais vitorias é
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}> {removerAspas(JSON.stringify(MapaMaisVitorias.name))}</Text>
              </Text>
            ) : (
              <></>
            )
            }
            {/* Meu deus que horror */}
          </View>

          <View style={StatsPlayerStyle.botao_kills}>
            <Button mode='contained' onPress={() => navigation.push('stats-partidas')}>Detalhes das Partidas</Button>
          </View>

        </View>
      </ScrollView >
    </>
  )
}

export default StatsPlayer