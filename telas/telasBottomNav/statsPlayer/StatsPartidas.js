import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import SteamAPI from '../../../services/SteamAPI';
import { Image, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StatsPartidasStyle from './style/StatsPartidasStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryPie } from 'victory-native';

const StatsPartidas = ({ navigation }) => {

    const [Estatisticas, setEstatisticas] = useState([]);
    const [BombasPlantadas, setBombasPlantadas] = useState({})
    const [BombasDefusadas, setBombasDefusadas] = useState({})
    const [MapaMaisVitorias, setMapaMaisVitorias] = useState({})
    const [TotalVitorias, setTotalVitorias] = useState({})
    const [TotalMVP, setTotalMVP] = useState({})
    const [TotalMoney, setTotalMoney] = useState({})
    const [PistolRound, setPistolRound] = useState({})
    const [TotalRounds, setTotalRounds] = useState({})
    const [ContributionScore, setContriburionScore] = useState({})
    const [VitoriaPorMapa, setVitoriaPorMapa] = useState([])
    const [TotalRoundsCalculado, setTotalRoundsCalculado] = useState({})
    const [TaxaVitorias, setTaxaVitorias] = useState({})

    useEffect(() => {

        AsyncStorage.getItem('usuario').then(usuario => {

            SteamAPI.get(`/GetUserStatsForGame?idUser=` + usuario).then(resultado => {
                const estats = resultado.data.playerstats.stats
                setEstatisticas(estats)
                setTotalVitorias(estats[5].value)
                setBombasPlantadas(estats[3].value)
                setBombasDefusadas(estats[4].value)
                setTotalMVP(estats[102].value)
                setTotalMoney(estats[7].value)
                setPistolRound(estats[27].value)
                setTotalRounds(estats[48].value)
                setContriburionScore(estats[133].value)
                setTotalRoundsCalculado(estats[48].value - estats[5].value)
                setTaxaVitorias(((estats[5].value / estats[48].value) * 100).toFixed(2))


                // Este bloco filtra os registros para apenas os 'total_wins_(nome do mapa)' sejam armazenados na constante
                const mapaComMaisVitorias = estats.filter(stat => stat.name.includes('total_wins_map_')
                    && stat.name !== 'total_wins_pistolround'
                ).map(stat => ({
                    name: stat.name.replace('total_wins_map_', '').toUpperCase(),
                    value: stat.value
                }));
                setVitoriaPorMapa(mapaComMaisVitorias)

                // Esse encontra a arma com mais kills
                if (mapaComMaisVitorias.length > 0) {
                    const mapasOrdenados = [...mapaComMaisVitorias].sort((a, b) => b.value - a.value);
                    setMapaMaisVitorias(mapasOrdenados[0]);
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

    // Formata em dolares pois dolar é o padrão no jogo
    function formatarDinheiro(valor) {
        return Number(valor).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    }

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

    //GRAFICO DE DISPAROS/ACERTOS
    const data_rounds_vitorias = [
        { x: "Vitorias", y: TotalVitorias },
        { x: "Derrotas", y: TotalRoundsCalculado }
    ]

    //GRAFICO DE VITORIAS POR MAPA
    const data_vitorias = VitoriaPorMapa
    // Ordenar os dados de total_wins de forma crescente
    data_vitorias.sort((a, b) => a.value - b.value);

    return (
        <>
            <ScrollView>
                <View>

                    <View style={StatsPartidasStyle.view_vitorias_mvp}>
                        <View style={StatsPartidasStyle.view_vitorias}>
                            <Text style={{ fontSize: 25 }}>Rounds Ganhos</Text>
                            <Text style={{ fontSize: 35 }}>{formataNumero(JSON.stringify(TotalVitorias))}</Text>
                        </View>

                        <View style={StatsPartidasStyle.view_defuse_plant}>
                            <View>
                                <Text style={{ fontSize: 40, color: '#1e3747', textAlign: 'center' }}>{formataNumero(JSON.stringify(BombasDefusadas))}</Text>
                                <Text style={{ textAlign: 'center', fontSize: 18 }}>Bombas Defusadas</Text>
                            </View>

                            <View style={StatsPartidasStyle.kill_death_linha}></View>

                            <View>
                                <Text style={{ fontSize: 40, color: '#b0a06a', textAlign: 'center' }}>{formataNumero(JSON.stringify(BombasPlantadas))}</Text>
                                <Text style={{ textAlign: 'center', fontSize: 18 }}>Bombas Armadas</Text>
                            </View>
                        </View>

                        <View style={StatsPartidasStyle.view_mvp}>
                            <Text style={{ fontSize: 25 }}>{formataNumero(JSON.stringify(TotalMVP))}</Text>
                            <Text style={{ fontSize: 20 }}><MaterialCommunityIcons name="star" size={20} color="black" /> Vezes que foi MVP <MaterialCommunityIcons name="star" size={20} color="black" /></Text>
                        </View>

                        <View style={StatsPartidasStyle.view_mvp}>
                            <Text style={{ fontSize: 25, color: 'green' }}>{formatarDinheiro(JSON.stringify(TotalMoney))}</Text>
                            <Text style={{ fontSize: 20 }}>Total de dinheiro ganho em todas partidas</Text>
                        </View>

                        <View style={StatsPartidasStyle.view_mvp}>
                            <Text style={{ fontSize: 25 }}>{formataNumero(JSON.stringify(ContributionScore))}</Text>
                            <Text style={{ fontSize: 20 }}>Total de pontos de contribuição</Text>
                        </View>

                        <View style={StatsPartidasStyle.view_mvp}>
                            <Text style={{ fontSize: 25 }}>{formataNumero(JSON.stringify(PistolRound))}</Text>
                            <Text style={{ fontSize: 20 }}>Pistol rounds ganhos</Text>
                            <MaterialCommunityIcons name='pistol' size={30} color={'gray'} />
                        </View>
                    </View>

                    <View style={StatsPartidasStyle.view_mapa_mais_jogado}>
                        <Text style={{ fontSize: 26, textAlign: 'center', fontWeight: 'bold' }}>Seu melhor mapa</Text>

                        {/* A atrocidade cometida abaixo serve para não dar problema quando o dado chegar dps do carregamento */}
                        {MapaMaisVitorias.name && imagensMapas[MapaMaisVitorias.name] ? (
                            <Image
                                source={imagensMapas[MapaMaisVitorias.name]}
                                style={StatsPartidasStyle.imagem_mapa_mais_jogado}
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

                    <View style={StatsPartidasStyle.view_grafico}>
                        <Text style={{ fontSize: 26, textAlign: 'center', fontWeight: 'bold' }}>Derrotas / Vitorias</Text>
                        <VictoryPie
                            data={data_rounds_vitorias}
                            colorScale={['green', 'red']} // Escolha as cores para cada fatia do gráfico
                            labels={({ datum }) => `${datum.x}: ${formataNumero(datum.y)}`} // Exibe o valor de cada fatia
                            radius={100} // Define o raio do gráfico de pizza
                            innerRadius={50} // Define o raio interno do gráfico de pizza
                            labelRadius={110}
                            style={{ labels: { fontSize: 14, fontWeight: 'bold' } }} // Estilo dos rótulos
                        />
                        <Text style={{ fontSize: 25 }}><Text style={{ fontWeight: 'bold' }}>{formataNumero(JSON.stringify(TotalRounds))}</Text> Rounds</Text>
                        <Text style={{ fontSize: 20, marginTop: '5%' }}><Text style={{ fontWeight: 'bold' }}>{removerAspas(JSON.stringify(TaxaVitorias))}%</Text> de vitorias</Text>
                    </View>



                    <View>
                        <Text style={{ fontSize: 26, textAlign: 'center', fontWeight: 'bold' }}>Partidas Finalizadas por Mapa</Text>

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
                                data={data_vitorias}
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

                    <View style={StatsPartidasStyle.view_imagem_final_tela}>
                        <Image
                            source={require('../../../imagens/tr-team.png')}
                            style={StatsPartidasStyle.imagem_final_tela}
                        />
                    </View>
                </View>
            </ScrollView >
        </>
    )
}

export default StatsPartidas