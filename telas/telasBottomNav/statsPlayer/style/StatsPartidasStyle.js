import { StyleSheet } from "react-native";

const StatsPartidasStyle = StyleSheet.create({
    kill_death_linha: {
        borderLeftWidth: 1, // Espessura da linha
        borderLeftColor: 'black', // Cor da linha (preto neste exemplo, pode alterar para a cor desejada)
        height: 50, // Altura da linha (ajuste conforme necessário)
    },
    view_vitorias_mvp: {
        marginTop: '10%'
    },
    view_vitorias: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5%'
    },
    view_defuse_plant: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    imagem_mapa_mais_jogado: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
    },
    view_mapa_mais_jogado: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5%',
        marginTop: '5%'
    },
    view_mvp: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5%',
        marginTop: '4%'
    }

})

export default StatsPartidasStyle