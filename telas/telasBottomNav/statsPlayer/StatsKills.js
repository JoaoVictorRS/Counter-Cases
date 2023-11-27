import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import SteamAPI from '../../../services/SteamAPI';
import { Image, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryPie } from "victory-native";
import StatsKillsStyle from './style/StatsKillsStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StatsKills = () => {

  const [Estatisticas, setEstatisticas] = useState([]);
  const [Kills, setKills] = useState({})
  const [Deaths, setDeaths] = useState({})
  const [CalculoKD, setCalculoKD] = useState({})
  const [TaxaHS, setTaxaHS] = useState({})
  const [TaxaAcerto, setTaxaAcerto] = useState({})
  const [Disparos, setDisparos] = useState({})
  const [Acertos, setAcertos] = useState({})
  const [KillsArmas, setKillsArmas] = useState([])
  const [ArmaMaisUsada, setArmaMaisUsada] = useState({})
  const [DisparosArmas, setDisparosArmas] = useState({})
  const [ArmaMaisDisparada, setArmaMaisDisparada] = useState({})
  const [DanoTotal, setDanoTotal] = useState({})
  const [DisparosAcertosCalculado, setDisparosAcertosCalculado] = useState({})

  useEffect(() => {

    AsyncStorage.getItem('usuario').then(usuario => {

      SteamAPI.get(`/GetUserStatsForGame?idUser=` + usuario).then(resultado => {
        const estats = resultado.data.playerstats.stats
        setEstatisticas(estats)
        setKills(estats[0].value)
        setDeaths(estats[1].value)
        setDisparos(estats[47].value)
        setAcertos(estats[46].value)
        setDisparosAcertosCalculado(estats[47].value - estats[46].value)
        setCalculoKD((estats[0].value / estats[1].value).toFixed(2))
        setTaxaHS(((estats[25].value / estats[0].value) * 100).toFixed(2))
        setTaxaAcerto(((estats[46].value / estats[47].value) * 100).toFixed(2))
        setDanoTotal(estats[6].value)

        // Este bloco filtra os registros para apenas os 'total_kills_(nome da arma_)' sejam armazenados na constante
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


        // Filtra as os disparos similar ao codigo de cima
        const DisparosPorArma = estats.filter(stat => stat.name.includes('total_shots_')
          && stat.name !== 'total_shots_hit'
          && stat.name !== 'total_shots_fired'
        ).map(stat => ({
          name: stat.name.replace('total_shots_', '').toUpperCase(),
          value: stat.value
        }));
        setDisparosArmas(DisparosPorArma);

        // Encontra a arma com mais disparos
        if (DisparosPorArma.length > 0) {
          const disparosOrdenados = [...DisparosPorArma].sort((a, b) => b.value - a.value);
          setArmaMaisDisparada(disparosOrdenados[0]);
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

  //Sessão dos graficos

  //GRAFICO DE DISPAROS/ACERTOS
  const data_disparos_acertos = [
    { x: "Erros", y: DisparosAcertosCalculado },
    { x: "Acertos", y: Acertos }
  ]

  //GRAFICO DE VITMAS POR ARMA
  const data_kills = KillsArmas
  // Ordenar os dados de total_kills de forma crescente
  data_kills.sort((a, b) => a.value - b.value);


  return (
    <>
      <ScrollView>

        <View style={StatsKillsStyle.principal_container}>

          <View>
            <View style={StatsKillsStyle.kill_death_container}>
              <View>
                <Text style={{ fontSize: 40, color: 'green' }}>{formataNumero(removerAspas(JSON.stringify(Kills)))}</Text>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Vitmas</Text>
              </View>

              <View style={StatsKillsStyle.kill_death_linha}></View>

              <View>
                <Text style={{ fontSize: 40, color: 'red' }}>{formataNumero(removerAspas(JSON.stringify(Deaths)))}</Text>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Mortes</Text>
              </View>
            </View>

            <View style={StatsKillsStyle.proporcao_kd_container}>
              <Text style={{ fontSize: 30, color: CalculoKD > 1 ? 'green' : 'red' }}>{formataNumero(removerAspas(JSON.stringify(CalculoKD)))}</Text>
              <Text style={{ fontSize: 18 }}>Proporção KD</Text>
            </View>

            <View style={StatsKillsStyle.proporcao_kd_container}>
              <Text style={{ fontSize: 30 }}><Icon name="plus-thick" size={25} color="#FF5733" />{formataNumero(JSON.stringify(DanoTotal))}</Text>
              <Text style={{ fontSize: 18 }}>Total de dano causado</Text>
            </View>

            <View style={StatsKillsStyle.proporcao_kd_container}>
              <Text style={{ fontSize: 30 }}>{formataNumero(removerAspas(JSON.stringify(TaxaHS)))}%</Text>
              <Text style={{ fontSize: 18 }}>Das vitmas são Headshot!</Text>
            </View>
          </View>

          <Image
            source={require('../../../imagens/csgo-headshot.png')}
            style={{ width: 100, height: 100, marginLeft: 30, alignSelf: 'center', marginTop: '5%' }}
          />


          <View style={StatsKillsStyle.view_arma_mais_usada}>
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



          <View>
            <Text style={{ fontSize: 26, textAlign: 'center', fontWeight: 'bold', marginTop: '10%' }}>Vitmas por Arma</Text>

            <VictoryChart domainPadding={{ x: 10 }} height={800}>
              <VictoryAxis
                dependentAxis
                tickFormat={(tick) => formataNumero(tick)} // Formatando os ticks do eixo y
              />
              <VictoryAxis
                tickFormat={(tick) => tick}
                style={{
                  tickLabels: { fontSize: 12, textAnchor: 'end' }, // Estilizando as labels do eixo x
                }}
              />
              <VictoryBar
                data={data_kills}
                x="name"
                y="value"
                horizontal
                labels={({ datum }) => formataNumero(datum.value)} // Exibindo o valor de cada barra
                labelComponent={<VictoryLabel dx={22} textAnchor="middle" />} // Ajustando a posição dos rótulos
                style={{
                  data: { fill: '#008080' } // Cor das barras
                }}
              />
            </VictoryChart>
          </View>



          <View style={StatsKillsStyle.view_arma_mais_disparada}>
            <Text style={{ fontSize: 26, textAlign: 'center', fontWeight: 'bold' }}>Arma mais disparada</Text>

            {/* A atrocidade cometida abaixo serve para não dar problema quando o dado chegar dps do carregamento */}
            {ArmaMaisDisparada.name && imagensArmas[ArmaMaisDisparada.name] ? (
              <Image
                source={imagensArmas[ArmaMaisDisparada.name]}
                style={StatsKillsStyle.imagem_arma_mais_usada}
              />
            ) : (
              <Text>Nenhuma imagem disponível para esta arma</Text>
            )
            }

            {ArmaMaisDisparada.name && imagensArmas[ArmaMaisDisparada.name] ? (
              <Text style={{ fontSize: 18 }}>Ja foram realizados
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}> {formataNumero(JSON.stringify(ArmaMaisDisparada.value))}</Text> disparos com a <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{removerAspas(JSON.stringify(ArmaMaisDisparada.name))}</Text>
              </Text>
            ) : (
              <></>
            )
            }
            {/* Meu deus que horror */}
          </View>

          <View style={StatsKillsStyle.view_grafico}>
            <Text style={{ fontSize: 26, textAlign: 'center', fontWeight: 'bold', marginBottom: '10%' }}>Acertos / Erros</Text>
            <VictoryPie
              data={data_disparos_acertos}
              colorScale={['red', 'green']} // Escolha as cores para cada fatia do gráfico
              labels={({ datum }) => `${datum.x}: ${formataNumero(datum.y)}`} // Exibe o valor de cada fatia
              radius={100} // Define o raio do gráfico de pizza
              innerRadius={50} // Define o raio interno do gráfico de pizza
              width={300}
              height={300}
              style={{ labels: { fontSize: 14, fontWeight: 'bold' } }} // Estilo dos rótulos
              labelRadius={120}
            />
              <Text style={{ fontSize: 25 }}><Text style={{ fontWeight: 'bold' }}>{formataNumero(JSON.stringify(Disparos))}</Text> Disparos</Text>
              <Text style={{ fontSize: 20, marginTop: '5%' }}><Text style={{ fontWeight: 'bold' }}>{removerAspas(JSON.stringify(TaxaAcerto))}%</Text> de Precisão</Text>
          </View>

          <View style={StatsKillsStyle.view_imagem_final_tela}>
            <Image
              source={require('../../../imagens/ct-team.png')}
              style={StatsKillsStyle.imagem_final_tela}
            />
          </View>

        </View>
      </ScrollView >
    </>
  )
}

export default StatsKills