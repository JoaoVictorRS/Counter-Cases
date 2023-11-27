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
        marginBottom: '15%',
    },
    view_mvp: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5%',
        marginTop: '4%'
    },
    view_grafico: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
        marginBottom: '40%'
    },
    grafico_rounds_vitorias: {
        width: 300,
        height: 300,
    },
    imagem_final_tela: {
        width: 450,
        height: 200,
        resizeMode: 'cover',
    },
    view_imagem_final_tela: {
        alignItems: 'center', 
        justifyContent: 'flex-end', // Ajuste adicional para alinhamento
        flex: 1, // Faz a View preencher todo o espaço disponível
    },

})

export default StatsPartidasStyle