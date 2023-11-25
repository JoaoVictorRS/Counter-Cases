import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import SteamAPI from '../../../services/SteamAPI';
import { Image, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StatsPartidasStyle from './style/StatsPartidasStyle';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
    const [TaxaVitoriaRound, setTaxaVitoriaRound] = useState({})

    //Lembrar de fazer o grafico de taxa de vitorias so pegar rounds e vitorias e fazer o grafico
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
                setTaxaVitoriaRound((estats[5].value / estats[27].value))


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

            })

        })

    }, []);

    function removerAspas(string) {
        return string.replace(/"/g, '');
    }

    function formataNumero(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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

    console.log(Estatisticas)

    return (
        <>
            <ScrollView>
                <View>

                    <View style={StatsPartidasStyle.view_vitorias_mvp}>
                        <View style={StatsPartidasStyle.view_vitorias}>
                            <Text style={{ fontSize: 25 }}>Total de Vitorias</Text>
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

                </View>
            </ScrollView >
        </>
    )
}

export default StatsPartidas