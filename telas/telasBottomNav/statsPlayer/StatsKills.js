import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import SteamAPI from '../../../services/SteamAPI';
import { Image, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryPie } from "victory-native";
import StatsKillsStyle from './style/StatsKillsStyle';

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

  useEffect(() => {

    AsyncStorage.getItem('usuario').then(usuario => {

      SteamAPI.get(`/GetUserStatsForGame?idUser=` + usuario).then(resultado => {
        const estats = resultado.data.playerstats.stats
        setEstatisticas(estats)
        setKills(estats[0].value)
        setDeaths(estats[1].value)
        setDisparos(estats[47].value)
        setAcertos(estats[46].value)
        setCalculoKD((estats[0].value / estats[1].value).toFixed(2))
        setTaxaHS(((estats[25].value / estats[0].value) * 100).toFixed(2))
        setTaxaAcerto(((estats[46].value / estats[47].value) * 100).toFixed(2))

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

      })

    })

  }, []);

  function removerAspas(string) {
    return string.replace(/"/g, '');
  }

  function formataNumero(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }


  //Sessão dos graficos

  //GRAFICO DE DISPAROS/ACERTOS
  const data_disparos_acertos = [
    { x: "Disparos", y: Disparos },
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
                <Text style={{ fontSize: 40, color: '#44CD28' }}>{formataNumero(removerAspas(JSON.stringify(Kills)))}</Text>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Vitmas</Text>
              </View>

              <View style={StatsKillsStyle.kill_death_linha}></View>

              <View>
                <Text style={{ fontSize: 40, color: '#C82C2C' }}>{formataNumero(removerAspas(JSON.stringify(Deaths)))}</Text>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Mortes</Text>
              </View>
            </View>

            <View style={StatsKillsStyle.proporcao_kd_container}>
              <Text style={{ fontSize: 30, color: CalculoKD > 1 ? 'green' : 'red' }}>{formataNumero(removerAspas(JSON.stringify(CalculoKD)))}</Text>
              <Text style={{ fontSize: 18 }}>Proporção KD</Text>
            </View>

            <View style={StatsKillsStyle.proporcao_kd_container}>
              <Text style={{ fontSize: 30 }}>{formataNumero(removerAspas(JSON.stringify(TaxaHS)))}%</Text>
              <Text style={{ fontSize: 18 }}>Das vitmas são Headshot!</Text>
            </View>
          </View>

          <Image
            source={require('../../../imagens/csgo-headshot.png')}
            style={{ width: 100, height: 100, marginLeft: 30, alignSelf: 'center' }}
          />

          <View style={StatsKillsStyle.view_grafico}>
            <View style={StatsKillsStyle.grafico_acerto_disparo}>
              <Text style={{ fontSize: 26, textAlign: 'center', fontWeight: 'bold', marginBottom: '10%' }}>Acertos/Disparos</Text>
              <VictoryPie
                colorScale={["#FF5555", "#3EFF50"]}
                data={data_disparos_acertos}
                labels={({ datum }) => `${datum.x}: ${formataNumero(datum.y)}`}
                labelComponent={<VictoryLabel style={{ fontSize: 26 }} />}
              />
              <Text style={{ fontSize: 18, textAlign: 'center', marginTop: '2%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{removerAspas(JSON.stringify(TaxaAcerto))}%</Text> de Acertos
              </Text>
            </View>
          </View>

          <View>
            <Text style={{ fontSize: 26, textAlign: 'center', fontWeight: 'bold', marginTop: '20%' }}>Arma mais usada</Text>
            <Text>{JSON.stringify(ArmaMaisUsada)}</Text>
          </View>

          <View>
            <Text style={{ fontSize: 26, textAlign: 'center', fontWeight: 'bold', marginTop: '20%' }}>Vitmas por Arma</Text>

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


          <Image
            source={require('../../../imagens/ct-team.png')}
            style={{ width: 200, height: 200, resizeMode: 'contain' }}
          />

        </View>
      </ScrollView >
    </>
  )
}

export default StatsKills